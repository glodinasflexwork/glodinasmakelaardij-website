from flask import Blueprint, jsonify, request, current_app
from werkzeug.security import generate_password_hash, check_password_hash
import psycopg2
from psycopg2.extras import RealDictCursor
import os
import datetime
import uuid
from flask_jwt_extended import (
    create_access_token, create_refresh_token, 
    jwt_required, get_jwt_identity, get_jwt
)
import json
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Load environment variables
load_dotenv()

user_bp = Blueprint('user', __name__)

# Database connection
def get_db_connection():
    """Get database connection to Neon.tech PostgreSQL"""
    try:
        conn = psycopg2.connect(
            os.getenv('NEON_DATABASE_URL'),
            cursor_factory=RealDictCursor
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

# Helper function to send emails
def send_email(to_email, subject, html_content):
    try:
        # Mailtrap configuration
        smtp_server = "sandbox.smtp.mailtrap.io"
        smtp_port = 2525
        smtp_username = os.getenv('MAILTRAP_API_TOKEN').split(':')[0]
        smtp_password = os.getenv('MAILTRAP_API_TOKEN').split(':')[1]
        from_email = os.getenv('MAILTRAP_FROM_EMAIL')
        
        # Create message
        message = MIMEMultipart('alternative')
        message['Subject'] = subject
        message['From'] = from_email
        message['To'] = to_email
        
        # Add HTML content
        html_part = MIMEText(html_content, 'html')
        message.attach(html_part)
        
        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.login(smtp_username, smtp_password)
            server.sendmail(from_email, to_email, message.as_string())
            
        return True
    except Exception as e:
        print(f"Email sending error: {e}")
        return False

# User registration
@user_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    
    # Validate required fields
    required_fields = ['username', 'email', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Check if username or email already exists
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Check username
        cur.execute("SELECT id FROM users WHERE username = %s", (data['username'],))
        if cur.fetchone():
            return jsonify({'error': 'Username already exists'}), 409
        
        # Check email
        cur.execute("SELECT id FROM users WHERE email = %s", (data['email'],))
        if cur.fetchone():
            return jsonify({'error': 'Email already exists'}), 409
        
        # Generate verification token
        verification_token = str(uuid.uuid4())
        
        # Create user
        cur.execute("""
            INSERT INTO users (
                username, email, password_hash, first_name, last_name, 
                phone, verification_token, created_at, updated_at
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id, username, email, created_at
        """, (
            data['username'],
            data['email'],
            generate_password_hash(data['password']),
            data.get('first_name'),
            data.get('last_name'),
            data.get('phone'),
            verification_token,
            datetime.datetime.utcnow(),
            datetime.datetime.utcnow()
        ))
        
        user = cur.fetchone()
        conn.commit()
        
        # Send verification email
        verification_url = f"http://localhost:3000/verify-email?token={verification_token}"
        email_html = f"""
        <h2>Welcome to Glodinas Makelaardij!</h2>
        <p>Thank you for registering. Please verify your email address by clicking the link below:</p>
        <p><a href="{verification_url}">Verify Email Address</a></p>
        <p>If you did not create this account, please ignore this email.</p>
        """
        
        send_email(data['email'], "Verify Your Email Address", email_html)
        
        return jsonify({
            'message': 'User registered successfully. Please check your email to verify your account.',
            'user': user
        }), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Email verification
@user_bp.route('/verify-email', methods=['POST'])
def verify_email():
    data = request.json
    
    if 'token' not in data:
        return jsonify({'error': 'Verification token is required'}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Find user by verification token
        cur.execute("SELECT id FROM users WHERE verification_token = %s", (data['token'],))
        user = cur.fetchone()
        
        if not user:
            return jsonify({'error': 'Invalid verification token'}), 404
        
        # Update user as verified
        cur.execute("""
            UPDATE users 
            SET is_verified = TRUE, verification_token = NULL, updated_at = %s
            WHERE id = %s
            RETURNING id, username, email, is_verified
        """, (datetime.datetime.utcnow(), user['id']))
        
        verified_user = cur.fetchone()
        conn.commit()
        
        return jsonify({
            'message': 'Email verified successfully',
            'user': verified_user
        }), 200
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# User login
@user_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    
    # Validate required fields
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email and password are required'}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Find user by email
        cur.execute("""
            SELECT id, username, email, password_hash, is_verified, is_active
            FROM users WHERE email = %s
        """, (data['email'],))
        
        user = cur.fetchone()
        
        # Check if user exists and password is correct
        if not user or not check_password_hash(user['password_hash'], data['password']):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Check if user is verified
        if not user['is_verified']:
            return jsonify({'error': 'Please verify your email before logging in'}), 403
        
        # Check if user is active
        if not user['is_active']:
            return jsonify({'error': 'Your account has been deactivated'}), 403
        
        # Update last login timestamp
        cur.execute("""
            UPDATE users SET last_login = %s WHERE id = %s
        """, (datetime.datetime.utcnow(), user['id']))
        
        conn.commit()
        
        # Create access and refresh tokens
        access_token = create_access_token(identity=user['id'])
        refresh_token = create_refresh_token(identity=user['id'])
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Refresh token
@user_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    access_token = create_access_token(identity=current_user_id)
    
    return jsonify({
        'access_token': access_token
    }), 200

# Get current user profile
@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Get user profile
        cur.execute("""
            SELECT id, username, email, first_name, last_name, phone, 
                   profile_image, created_at, is_verified, notification_preferences
            FROM users WHERE id = %s
        """, (current_user_id,))
        
        user = cur.fetchone()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Convert notification_preferences from string to dict if needed
        if isinstance(user['notification_preferences'], str):
            user['notification_preferences'] = json.loads(user['notification_preferences'])
        
        # Format datetime
        if user['created_at']:
            user['created_at'] = user['created_at'].isoformat()
        
        return jsonify({
            'user': user
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Update user profile
@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    data = request.json
    
    # Fields that can be updated
    allowed_fields = ['first_name', 'last_name', 'phone', 'profile_image', 'notification_preferences']
    update_data = {k: v for k, v in data.items() if k in allowed_fields}
    
    if not update_data:
        return jsonify({'error': 'No valid fields to update'}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Build the SQL query dynamically
        set_clause = ", ".join([f"{field} = %s" for field in update_data.keys()])
        set_clause += ", updated_at = %s"
        
        values = list(update_data.values())
        values.append(datetime.datetime.utcnow())
        values.append(current_user_id)
        
        # Update user profile
        cur.execute(f"""
            UPDATE users 
            SET {set_clause}
            WHERE id = %s
            RETURNING id, username, email, first_name, last_name, phone, 
                      profile_image, created_at, is_verified, notification_preferences
        """, values)
        
        updated_user = cur.fetchone()
        conn.commit()
        
        # Convert notification_preferences from string to dict if needed
        if isinstance(updated_user['notification_preferences'], str):
            updated_user['notification_preferences'] = json.loads(updated_user['notification_preferences'])
        
        # Format datetime
        if updated_user['created_at']:
            updated_user['created_at'] = updated_user['created_at'].isoformat()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'user': updated_user
        }), 200
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Change password
@user_bp.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    current_user_id = get_jwt_identity()
    data = request.json
    
    # Validate required fields
    if not data or 'current_password' not in data or 'new_password' not in data:
        return jsonify({'error': 'Current password and new password are required'}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Get current password hash
        cur.execute("SELECT password_hash FROM users WHERE id = %s", (current_user_id,))
        user = cur.fetchone()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Verify current password
        if not check_password_hash(user['password_hash'], data['current_password']):
            return jsonify({'error': 'Current password is incorrect'}), 401
        
        # Update password
        cur.execute("""
            UPDATE users 
            SET password_hash = %s, updated_at = %s
            WHERE id = %s
        """, (
            generate_password_hash(data['new_password']),
            datetime.datetime.utcnow(),
            current_user_id
        ))
        
        conn.commit()
        
        return jsonify({
            'message': 'Password changed successfully'
        }), 200
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Request password reset
@user_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json
    
    if 'email' not in data:
        return jsonify({'error': 'Email is required'}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Find user by email
        cur.execute("SELECT id, email FROM users WHERE email = %s", (data['email'],))
        user = cur.fetchone()
        
        if not user:
            # Don't reveal that the email doesn't exist
            return jsonify({'message': 'If your email is registered, you will receive a password reset link'}), 200
        
        # Generate reset token and expiry
        reset_token = str(uuid.uuid4())
        reset_token_expiry = datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        
        # Update user with reset token
        cur.execute("""
            UPDATE users 
            SET reset_token = %s, reset_token_expiry = %s, updated_at = %s
            WHERE id = %s
        """, (
            reset_token,
            reset_token_expiry,
            datetime.datetime.utcnow(),
            user['id']
        ))
        
        conn.commit()
        
        # Send password reset email
        reset_url = f"http://localhost:3000/reset-password?token={reset_token}"
        email_html = f"""
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your Glodinas Makelaardij account. Click the link below to reset your password:</p>
        <p><a href="{reset_url}">Reset Password</a></p>
        <p>This link will expire in 24 hours.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        """
        
        send_email(user['email'], "Reset Your Password", email_html)
        
        return jsonify({
            'message': 'If your email is registered, you will receive a password reset link'
        }), 200
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Reset password with token
@user_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    
    if 'token' not in data or 'new_password' not in data:
        return jsonify({'error': 'Token and new password are required'}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Find user by reset token
        cur.execute("""
            SELECT id FROM users 
            WHERE reset_token = %s AND reset_token_expiry > %s
        """, (data['token'], datetime.datetime.utcnow()))
        
        user = cur.fetchone()
        
        if not user:
            return jsonify({'error': 'Invalid or expired reset token'}), 400
        
        # Update password and clear reset token
        cur.execute("""
            UPDATE users 
            SET password_hash = %s, reset_token = NULL, reset_token_expiry = NULL, updated_at = %s
            WHERE id = %s
        """, (
            generate_password_hash(data['new_password']),
            datetime.datetime.utcnow(),
            user['id']
        ))
        
        conn.commit()
        
        return jsonify({
            'message': 'Password has been reset successfully'
        }), 200
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Get saved properties for current user
@user_bp.route('/saved-properties', methods=['GET'])
@jwt_required()
def get_saved_properties():
    current_user_id = get_jwt_identity()
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Get saved properties with property details
        cur.execute("""
            SELECT sp.id, sp.property_id, sp.created_at, sp.notes,
                   p.title, p.location, p.price, p.bedrooms, p.bathrooms, p.area,
                   p.property_type, p.status, p.images
            FROM saved_properties sp
            JOIN properties p ON sp.property_id = p.id
            WHERE sp.user_id = %s
            ORDER BY sp.created_at DESC
        """, (current_user_id,))
        
        saved_properties = cur.fetchall()
        
        # Format datetime
        for prop in saved_properties:
            if prop['created_at']:
                prop['created_at'] = prop['created_at'].isoformat()
        
        return jsonify({
            'saved_properties': saved_properties
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Save a property
@user_bp.route('/saved-properties', methods=['POST'])
@jwt_required()
def save_property():
    current_user_id = get_jwt_identity()
    data = request.json
    
    if 'property_id' not in data:
        return jsonify({'error': 'Property ID is required'}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Check if property exists
        cur.execute("SELECT id FROM properties WHERE id = %s", (data['property_id'],))
        property_exists = cur.fetchone()
        
        if not property_exists:
            return jsonify({'error': 'Property not found'}), 404
        
        # Check if already saved
        cur.execute("""
            SELECT id FROM saved_properties 
            WHERE user_id = %s AND property_id = %s
        """, (current_user_id, data['property_id']))
        
        already_saved = cur.fetchone()
        
        if already_saved:
            return jsonify({'error': 'Property already saved', 'saved_property_id': already_saved['id']}), 409
        
        # Save property
        cur.execute("""
            INSERT INTO saved_properties (user_id, property_id, notes, created_at)
            VALUES (%s, %s, %s, %s)
            RETURNING id, property_id, created_at, notes
        """, (
            current_user_id,
            data['property_id'],
            data.get('notes'),
            datetime.datetime.utcnow()
        ))
        
        saved_property = cur.fetchone()
        conn.commit()
        
        # Format datetime
        if saved_property['created_at']:
            saved_property['created_at'] = saved_property['created_at'].isoformat()
        
        return jsonify({
            'message': 'Property saved successfully',
            'saved_property': saved_property
        }), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Remove a saved property
@user_bp.route('/saved-properties/<int:property_id>', methods=['DELETE'])
@jwt_required()
def remove_saved_property(property_id):
    current_user_id = get_jwt_identity()
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Delete saved property
        cur.execute("""
            DELETE FROM saved_properties 
            WHERE user_id = %s AND property_id = %s
            RETURNING id
        """, (current_user_id, property_id))
        
        deleted = cur.fetchone()
        conn.commit()
        
        if not deleted:
            return jsonify({'error': 'Saved property not found'}), 404
        
        return jsonify({
            'message': 'Property removed from saved properties'
        }), 200
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Get saved searches for current user
@user_bp.route('/saved-searches', methods=['GET'])
@jwt_required()
def get_saved_searches():
    current_user_id = get_jwt_identity()
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Get saved searches
        cur.execute("""
            SELECT id, name, search_criteria, alert_frequency, 
                   created_at, updated_at, last_alert_sent
            FROM saved_searches
            WHERE user_id = %s
            ORDER BY created_at DESC
        """, (current_user_id,))
        
        saved_searches = cur.fetchall()
        
        # Format datetime and parse JSON
        for search in saved_searches:
            if search['created_at']:
                search['created_at'] = search['created_at'].isoformat()
            if search['updated_at']:
                search['updated_at'] = search['updated_at'].isoformat()
            if search['last_alert_sent']:
                search['last_alert_sent'] = search['last_alert_sent'].isoformat()
            
            # Parse search_criteria if it's a string
            if isinstance(search['search_criteria'], str):
                search['search_criteria'] = json.loads(search['search_criteria'])
        
        return jsonify({
            'saved_searches': saved_searches
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Save a search
@user_bp.route('/saved-searches', methods=['POST'])
@jwt_required()
def save_search():
    current_user_id = get_jwt_identity()
    data = request.json
    
    # Validate required fields
    if 'name' not in data or 'search_criteria' not in data:
        return jsonify({'error': 'Name and search criteria are required'}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Save search
        cur.execute("""
            INSERT INTO saved_searches (
                user_id, name, search_criteria, alert_frequency, 
                created_at, updated_at
            )
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id, name, search_criteria, alert_frequency, 
                      created_at, updated_at
        """, (
            current_user_id,
            data['name'],
            json.dumps(data['search_criteria']),
            data.get('alert_frequency', 'daily'),
            datetime.datetime.utcnow(),
            datetime.datetime.utcnow()
        ))
        
        saved_search = cur.fetchone()
        conn.commit()
        
        # Format datetime and parse JSON
        if saved_search['created_at']:
            saved_search['created_at'] = saved_search['created_at'].isoformat()
        if saved_search['updated_at']:
            saved_search['updated_at'] = saved_search['updated_at'].isoformat()
        
        # Parse search_criteria if it's a string
        if isinstance(saved_search['search_criteria'], str):
            saved_search['search_criteria'] = json.loads(saved_search['search_criteria'])
        
        return jsonify({
            'message': 'Search saved successfully',
            'saved_search': saved_search
        }), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Update a saved search
@user_bp.route('/saved-searches/<int:search_id>', methods=['PUT'])
@jwt_required()
def update_saved_search(search_id):
    current_user_id = get_jwt_identity()
    data = request.json
    
    # Fields that can be updated
    allowed_fields = ['name', 'search_criteria', 'alert_frequency']
    update_data = {k: v for k, v in data.items() if k in allowed_fields}
    
    if not update_data:
        return jsonify({'error': 'No valid fields to update'}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Check if saved search exists and belongs to user
        cur.execute("""
            SELECT id FROM saved_searches 
            WHERE id = %s AND user_id = %s
        """, (search_id, current_user_id))
        
        saved_search = cur.fetchone()
        
        if not saved_search:
            return jsonify({'error': 'Saved search not found'}), 404
        
        # Handle special case for search_criteria (convert to JSON string)
        if 'search_criteria' in update_data:
            update_data['search_criteria'] = json.dumps(update_data['search_criteria'])
        
        # Build the SQL query dynamically
        set_clause = ", ".join([f"{field} = %s" for field in update_data.keys()])
        set_clause += ", updated_at = %s"
        
        values = list(update_data.values())
        values.append(datetime.datetime.utcnow())
        values.append(search_id)
        values.append(current_user_id)
        
        # Update saved search
        cur.execute(f"""
            UPDATE saved_searches 
            SET {set_clause}
            WHERE id = %s AND user_id = %s
            RETURNING id, name, search_criteria, alert_frequency, 
                      created_at, updated_at, last_alert_sent
        """, values)
        
        updated_search = cur.fetchone()
        conn.commit()
        
        # Format datetime and parse JSON
        if updated_search['created_at']:
            updated_search['created_at'] = updated_search['created_at'].isoformat()
        if updated_search['updated_at']:
            updated_search['updated_at'] = updated_search['updated_at'].isoformat()
        if updated_search['last_alert_sent']:
            updated_search['last_alert_sent'] = updated_search['last_alert_sent'].isoformat()
        
        # Parse search_criteria if it's a string
        if isinstance(updated_search['search_criteria'], str):
            updated_search['search_criteria'] = json.loads(updated_search['search_criteria'])
        
        return jsonify({
            'message': 'Saved search updated successfully',
            'saved_search': updated_search
        }), 200
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Delete a saved search
@user_bp.route('/saved-searches/<int:search_id>', methods=['DELETE'])
@jwt_required()
def delete_saved_search(search_id):
    current_user_id = get_jwt_identity()
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Delete saved search
        cur.execute("""
            DELETE FROM saved_searches 
            WHERE id = %s AND user_id = %s
            RETURNING id
        """, (search_id, current_user_id))
        
        deleted = cur.fetchone()
        conn.commit()
        
        if not deleted:
            return jsonify({'error': 'Saved search not found'}), 404
        
        return jsonify({
            'message': 'Saved search deleted successfully'
        }), 200
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Track property view
@user_bp.route('/property-view', methods=['POST'])
def track_property_view():
    data = request.json
    
    # Validate required fields
    if 'property_id' not in data:
        return jsonify({'error': 'Property ID is required'}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Check if property exists
        cur.execute("SELECT id FROM properties WHERE id = %s", (data['property_id'],))
        property_exists = cur.fetchone()
        
        if not property_exists:
            return jsonify({'error': 'Property not found'}), 404
        
        # Get user_id from JWT if available
        user_id = None
        try:
            user_id = get_jwt_identity()
        except:
            pass
        
        # Track view
        cur.execute("""
            INSERT INTO property_views (
                user_id, property_id, timestamp, source, session_id
            )
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
        """, (
            user_id,
            data['property_id'],
            datetime.datetime.utcnow(),
            data.get('source'),
            data.get('session_id')
        ))
        
        view_id = cur.fetchone()['id']
        conn.commit()
        
        return jsonify({
            'message': 'Property view tracked',
            'view_id': view_id
        }), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Get property view statistics (admin only)
@user_bp.route('/analytics/property-views', methods=['GET'])
@jwt_required()
def get_property_view_stats():
    # TODO: Add admin check
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection error'}), 500
    
    try:
        cur = conn.cursor()
        
        # Get property view statistics
        cur.execute("""
            SELECT 
                p.id, p.title, 
                COUNT(pv.id) as view_count,
                COUNT(DISTINCT pv.user_id) as unique_user_views,
                COUNT(DISTINCT pv.session_id) as unique_session_views
            FROM properties p
            LEFT JOIN property_views pv ON p.id = pv.property_id
            GROUP BY p.id, p.title
            ORDER BY view_count DESC
        """)
        
        stats = cur.fetchall()
        
        return jsonify({
            'property_view_stats': stats
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Logout (client-side only, just for completeness)
@user_bp.route('/logout', methods=['POST'])
def logout():
    # JWT tokens are stateless, so logout is handled client-side
    # by removing the tokens from storage
    return jsonify({
        'message': 'Logged out successfully'
    }), 200

