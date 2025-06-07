from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import uuid

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    profile_image = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    is_verified = db.Column(db.Boolean, default=False)
    verification_token = db.Column(db.String(100), nullable=True)
    reset_token = db.Column(db.String(100), nullable=True)
    reset_token_expiry = db.Column(db.DateTime, nullable=True)
    notification_preferences = db.Column(db.JSON, default={
        "email_alerts": True,
        "property_updates": True,
        "saved_search_alerts": True,
        "marketing": False
    })

    # Relationships
    saved_properties = db.relationship('SavedProperty', backref='user', lazy=True, cascade="all, delete-orphan")
    saved_searches = db.relationship('SavedSearch', backref='user', lazy=True, cascade="all, delete-orphan")
    property_views = db.relationship('PropertyView', backref='user', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<User {self.username}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_verification_token(self):
        self.verification_token = str(uuid.uuid4())
        return self.verification_token

    def generate_reset_token(self):
        self.reset_token = str(uuid.uuid4())
        self.reset_token_expiry = datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        return self.reset_token

    def verify_reset_token(self, token):
        if self.reset_token != token:
            return False
        if self.reset_token_expiry < datetime.datetime.utcnow():
            return False
        return True

    def to_dict(self, include_private=False):
        data = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_image': self.profile_image,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'is_verified': self.is_verified,
            'notification_preferences': self.notification_preferences
        }
        
        if include_private:
            data.update({
                'phone': self.phone,
                'last_login': self.last_login.isoformat() if self.last_login else None,
                'is_active': self.is_active
            })
            
        return data


class SavedProperty(db.Model):
    __tablename__ = 'saved_properties'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    notes = db.Column(db.Text, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'property_id': self.property_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'notes': self.notes
        }


class SavedSearch(db.Model):
    __tablename__ = 'saved_searches'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    search_criteria = db.Column(db.JSON, nullable=False)
    alert_frequency = db.Column(db.String(20), default='daily')  # daily, weekly, never
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    last_alert_sent = db.Column(db.DateTime, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'search_criteria': self.search_criteria,
            'alert_frequency': self.alert_frequency,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'last_alert_sent': self.last_alert_sent.isoformat() if self.last_alert_sent else None
        }


class PropertyView(db.Model):
    __tablename__ = 'property_views'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)  # Can be null for anonymous views
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    source = db.Column(db.String(50), nullable=True)  # Where the user came from
    session_id = db.Column(db.String(100), nullable=True)  # For tracking anonymous users
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'property_id': self.property_id,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'source': self.source,
            'session_id': self.session_id
        }

