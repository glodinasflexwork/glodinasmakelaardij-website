import os
import sys
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# DON'T CHANGE THIS LINE - it's required for the app to work
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, jsonify
from flask_cors import CORS
from routes.contact import contact_bp
from routes.properties import properties_bp

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'fallback-secret-key')

# Enable CORS for all routes
CORS(app, origins=['http://localhost:3000', 'http://localhost:3001'])

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

@app.route('/')
def home():
    return jsonify({
        'message': 'Glodinas Makelaardij API Server',
        'version': '2.0',
        'endpoints': {
            'contact': '/api/contact',
            'properties': '/api/properties'
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

