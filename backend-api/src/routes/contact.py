import os
import requests
from flask import Blueprint, request, jsonify
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

contact_bp = Blueprint('contact', __name__)

def get_db_connection():
    """Get database connection"""
    try:
        conn = psycopg2.connect(
            os.getenv('NEON_DATABASE_URL'),
            cursor_factory=RealDictCursor
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

def send_email_via_mailtrap(contact_data):
    """Send email notification via Mailtrap API with professional template"""
    try:
        url = "https://send.api.mailtrap.io/api/send"
        
        headers = {
            "Authorization": f"Bearer {os.getenv('MAILTRAP_API_TOKEN')}",
            "Content-Type": "application/json"
        }
        
        # Professional HTML email template matching the design
        email_body = f"""
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nieuwe Contactaanvraag - Glodinas Makelaardij</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }}
        .email-container {{
            background-color: #ffffff;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }}
        .header {{
            text-align: center;
            margin-bottom: 40px;
        }}
        .header h1 {{
            color: #22c55e;
            font-size: 32px;
            font-weight: 600;
            margin: 0 0 10px 0;
        }}
        .header .underline {{
            width: 60px;
            height: 4px;
            background-color: #22c55e;
            margin: 0 auto 15px auto;
        }}
        .header p {{
            color: #6b7280;
            font-size: 16px;
            margin: 0;
        }}
        .contact-details {{
            background-color: #dcfce7;
            border-left: 4px solid #22c55e;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
        }}
        .contact-details h2 {{
            color: #22c55e;
            font-size: 20px;
            margin: 0 0 20px 0;
            display: flex;
            align-items: center;
        }}
        .contact-details h2::before {{
            content: "📋";
            margin-right: 10px;
            font-size: 18px;
        }}
        .detail-row {{
            margin-bottom: 12px;
            display: flex;
            flex-wrap: wrap;
        }}
        .detail-label {{
            font-weight: 600;
            color: #374151;
            min-width: 120px;
            margin-right: 10px;
        }}
        .detail-value {{
            color: #6b7280;
            flex: 1;
        }}
        .contact-info {{
            background-color: #f3f4f6;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }}
        .contact-info h3 {{
            color: #1f2937;
            font-size: 18px;
            margin: 0 0 15px 0;
            display: flex;
            align-items: center;
        }}
        .contact-info h3::before {{
            content: "📞";
            margin-right: 10px;
        }}
        .contact-info p {{
            margin: 8px 0;
            color: #6b7280;
        }}
        .contact-info a {{
            color: #22c55e;
            text-decoration: none;
        }}
        .next-steps {{
            background-color: #fef3c7;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }}
        .next-steps h3 {{
            color: #d97706;
            font-size: 18px;
            margin: 0 0 15px 0;
            display: flex;
            align-items: center;
        }}
        .next-steps h3::before {{
            content: "📋";
            margin-right: 10px;
        }}
        .next-steps ul {{
            margin: 0;
            padding-left: 20px;
            color: #92400e;
        }}
        .next-steps li {{
            margin-bottom: 8px;
        }}
        .footer {{
            text-align: center;
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid #e5e7eb;
        }}
        .footer p {{
            color: #9ca3af;
            font-size: 14px;
            margin: 5px 0;
        }}
        .footer .brand {{
            color: #22c55e;
            font-weight: 600;
        }}
        .timestamp {{
            color: #9ca3af;
            font-size: 12px;
            text-align: right;
            margin-top: 20px;
        }}
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Nieuwe Contactaanvraag</h1>
            <div class="underline"></div>
            <p>Er is een nieuwe aanvraag binnengekomen via de website</p>
        </div>

        <div class="contact-details">
            <h2>Contactgegevens</h2>
            <div class="detail-row">
                <span class="detail-label">Naam:</span>
                <span class="detail-value">{contact_data['name']}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">E-mail:</span>
                <span class="detail-value">{contact_data['email']}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Telefoon:</span>
                <span class="detail-value">{contact_data.get('phone', 'Niet opgegeven')}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Onderwerp:</span>
                <span class="detail-value">{contact_data.get('inquiryType', 'Niet opgegeven')}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Woningtype:</span>
                <span class="detail-value">{contact_data.get('propertyType', 'Niet opgegeven')}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Budget:</span>
                <span class="detail-value">{contact_data.get('budgetRange', 'Niet opgegeven')}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Contact voorkeur:</span>
                <span class="detail-value">{contact_data.get('preferredContact', 'E-mail')}</span>
            </div>
        </div>

        <div class="contact-info">
            <h3>Bericht</h3>
            <p style="color: #374151; font-style: italic; background-color: #ffffff; padding: 15px; border-radius: 6px; border-left: 3px solid #22c55e;">
                "{contact_data['message']}"
            </p>
        </div>

        <div class="next-steps">
            <h3>Vervolgstappen</h3>
            <ul>
                <li>Neem binnen 24 uur contact op met de klant</li>
                <li>Beantwoord alle vragen en geef gepersonaliseerd advies</li>
                <li>Plan indien gewenst een afspraak voor een persoonlijke consultatie</li>
                <li>Voeg de contactgegevens toe aan het CRM-systeem</li>
                <li>Stuur een follow-up e-mail met relevante woningaanbiedingen</li>
            </ul>
        </div>

        <div class="footer">
            <p class="brand">Glodinas Makelaardij</p>
            <p>Uw vertrouwde vastgoedpartner in Den Haag</p>
            <p>📞 (6) 81 34 85 51 | ✉️ cihatkaya@glodinas.nl</p>
            <div class="timestamp">
                Verzonden op: {datetime.now().strftime('%d-%m-%Y om %H:%M')}
            </div>
        </div>
    </div>
</body>
</html>
        """
        
        payload = {
            "from": {
                "email": os.getenv('MAILTRAP_FROM_EMAIL'),
                "name": "Glodinas Makelaardij Website"
            },
            "to": [
                {
                    "email": os.getenv('MAILTRAP_TO_EMAIL'),
                    "name": "Cihat Kaya - Glodinas Makelaardij"
                }
            ],
            "subject": f"🏠 Nieuwe contactaanvraag van {contact_data['name']} - {contact_data.get('inquiryType', 'Algemeen')}",
            "html": email_body,
            "category": "Contact Form Submission"
        }
        
        response = requests.post(url, json=payload, headers=headers)
        
        if response.status_code == 200:
            print("Professional email sent successfully via Mailtrap API")
            return True
        else:
            print(f"Mailtrap API error: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        print(f"Email sending error: {e}")
        return False

@contact_bp.route('/', methods=['POST'])
def submit_contact():
    """Handle contact form submission"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Field {field} is required'}), 400
        
        # Save to Neon database
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        try:
            cur = conn.cursor()
            cur.execute('''
                INSERT INTO contacts (name, email, phone, inquiry_type, property_type, 
                                    budget_range, preferred_contact, message)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            ''', (
                data['name'],
                data['email'],
                data.get('phone'),
                data.get('inquiryType'),
                data.get('propertyType'),
                data.get('budgetRange'),
                data.get('preferredContact', 'email'),
                data['message']
            ))
            
            contact_id = cur.fetchone()['id']
            conn.commit()
            
            print(f"Contact saved to Neon database with ID: {contact_id}")
            
        except Exception as e:
            print(f"Database save error: {e}")
            conn.rollback()
            return jsonify({'error': 'Failed to save contact'}), 500
        finally:
            cur.close()
            conn.close()
        
        # Send email notification via Mailtrap
        email_sent = send_email_via_mailtrap(data)
        
        return jsonify({
            'success': True,
            'message': 'Contact form submitted successfully',
            'contact_id': contact_id,
            'email_sent': email_sent,
            'database': 'Neon.tech',
            'email_service': 'Mailtrap.io'
        }), 200
        
    except Exception as e:
        print(f"Contact submission error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@contact_bp.route('/test', methods=['GET'])
def test_contact():
    """Test endpoint for contact functionality"""
    db_connected = get_db_connection() is not None
    return jsonify({
        'message': 'Contact API is working',
        'database': 'Neon.tech PostgreSQL - Connected' if db_connected else 'Neon.tech PostgreSQL - Not connected',
        'email': 'Mailtrap.io API configured',
        'api_token_configured': bool(os.getenv('MAILTRAP_API_TOKEN'))
    })

@contact_bp.route('/list', methods=['GET'])
def list_contacts():
    """List all contacts (for admin purposes)"""
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cur = conn.cursor()
        cur.execute('SELECT * FROM contacts ORDER BY created_at DESC LIMIT 50')
        contacts = cur.fetchall()
        
        return jsonify({
            'contacts': [dict(contact) for contact in contacts],
            'total': len(contacts),
            'database': 'Neon.tech PostgreSQL'
        })
        
    except Exception as e:
        print(f"Error fetching contacts: {e}")
        return jsonify({'error': 'Failed to fetch contacts'}), 500
    finally:
        cur.close()
        conn.close()

@contact_bp.route('/test-email', methods=['POST'])
def test_email():
    """Test email sending functionality"""
    test_data = {
        'name': 'Test User',
        'email': 'test@example.com',
        'phone': '+31 6 1234 5678',
        'inquiryType': 'buying',
        'propertyType': 'apartment',
        'budgetRange': '400k-600k',
        'preferredContact': 'email',
        'message': 'This is a test message to verify email functionality.'
    }
    
    email_sent = send_email_via_mailtrap(test_data)
    
    return jsonify({
        'test_email_sent': email_sent,
        'message': 'Test email sent successfully' if email_sent else 'Failed to send test email',
        'service': 'Mailtrap.io API'
    })

