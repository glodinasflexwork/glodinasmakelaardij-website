import os
import sys
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
import datetime
import json

# Load environment variables
load_dotenv()

# DON'T CHANGE THIS LINE - it's required for the app to work
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes.contact import contact_bp
from routes.properties import properties_bp
from routes.user import user_bp

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'fallback-secret-key')

# Configure JWT
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY', 'fallback-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(hours=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = datetime.timedelta(days=30)
jwt = JWTManager(app)

# Enable CORS for all routes - Updated for production
CORS(app, origins=[
    'http://localhost:3000', 
    'http://localhost:3001',
    'https://glodinasmakelaardij.nl',
    'https://www.glodinasmakelaardij.nl',
    'https://api.glodinasmakelaardij.nl'
], supports_credentials=True)

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

# Custom JSON encoder for datetime objects
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.isoformat()
        return super().default(obj)

app.json_encoder = CustomJSONEncoder

# Initialize database tables
def init_db():
    """Initialize database tables if they don't exist"""
    conn = get_db_connection()
    if not conn:
        print("Could not connect to database for initialization")
        return
    
    try:
        cur = conn.cursor()
        
        # Create contacts table
        cur.execute('''
            CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                inquiry_type VARCHAR(100),
                property_type VARCHAR(100),
                budget_range VARCHAR(100),
                preferred_contact VARCHAR(50),
                message TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(50) DEFAULT 'new'
            )
        ''')
        
        # Create properties table
        cur.execute('''
            CREATE TABLE IF NOT EXISTS properties (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(12,2),
                location VARCHAR(255),
                bedrooms INTEGER,
                bathrooms INTEGER,
                area DECIMAL(10,2),
                property_type VARCHAR(100),
                status VARCHAR(50) DEFAULT 'available',
                images TEXT[], -- Array of image URLs
                features TEXT[], -- Array of features
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create users table
        cur.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(80) UNIQUE NOT NULL,
                email VARCHAR(120) UNIQUE NOT NULL,
                password_hash VARCHAR(256) NOT NULL,
                first_name VARCHAR(50),
                last_name VARCHAR(50),
                phone VARCHAR(20),
                profile_image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE,
                is_verified BOOLEAN DEFAULT FALSE,
                verification_token VARCHAR(100),
                reset_token VARCHAR(100),
                reset_token_expiry TIMESTAMP,
                notification_preferences JSONB DEFAULT '{"email_alerts": true, "property_updates": true, "saved_search_alerts": true, "marketing": false}'
            )
        ''')
        
        # Create saved_properties table
        cur.execute('''
            CREATE TABLE IF NOT EXISTS saved_properties (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                notes TEXT,
                UNIQUE(user_id, property_id)
            )
        ''')
        
        # Create saved_searches table
        cur.execute('''
            CREATE TABLE IF NOT EXISTS saved_searches (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                name VARCHAR(100) NOT NULL,
                search_criteria JSONB NOT NULL,
                alert_frequency VARCHAR(20) DEFAULT 'daily',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_alert_sent TIMESTAMP
            )
        ''')
        
        # Create property_views table
        cur.execute('''
            CREATE TABLE IF NOT EXISTS property_views (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
                property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                source VARCHAR(50),
                session_id VARCHAR(100)
            )
        ''')
        
        conn.commit()
        print("Database tables initialized successfully")
        
    except Exception as e:
        print(f"Database initialization error: {e}")
        conn.rollback()
    finally:
        cur.close()
        conn.close()

# Register blueprints
app.register_blueprint(contact_bp, url_prefix='/api/contact')
app.register_blueprint(properties_bp, url_prefix='/api/properties')
app.register_blueprint(user_bp, url_prefix='/api/users')

@app.route('/')
def home():
    return jsonify({
        'message': 'Glodinas Makelaardij API Server',
        'version': '3.0',
        'endpoints': {
            'contact': '/api/contact',
            'properties': '/api/properties',
            'users': '/api/users'
        },
        'database': 'Neon.tech PostgreSQL',
        'email': 'Mailtrap.io'
    })

@app.route('/health')
def health_check():
    """Health check endpoint"""
    db_status = "connected" if get_db_connection() else "disconnected"
    return jsonify({
        'status': 'healthy',
        'database': db_status,
        'timestamp': str(os.popen('date').read().strip())
    })

if __name__ == '__main__':
    # Initialize database on startup
    init_db()
    
    # Run the app
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )

