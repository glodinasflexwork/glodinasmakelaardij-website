# Glodinas Makelaardij Database Schema

## Database Type
- PostgreSQL (Neon.tech)

## Tables

### users
- id (PK) - Serial
- username - VARCHAR(80), unique
- email - VARCHAR(120), unique
- password_hash - VARCHAR(256)
- first_name - VARCHAR(50)
- last_name - VARCHAR(50)
- phone - VARCHAR(20)
- profile_image - VARCHAR(255)
- created_at - TIMESTAMP
- updated_at - TIMESTAMP
- last_login - TIMESTAMP
- is_active - BOOLEAN
- is_verified - BOOLEAN
- verification_token - VARCHAR(100)
- reset_token - VARCHAR(100)
- reset_token_expiry - TIMESTAMP
- notification_preferences - JSONB

### properties
- id (PK) - Serial
- title - VARCHAR(255)
- description - TEXT
- price - DECIMAL(12,2)
- location - VARCHAR(255)
- bedrooms - INTEGER
- bathrooms - INTEGER
- area - DECIMAL(10,2)
- property_type - VARCHAR(100)
- status - VARCHAR(50)
- images - TEXT[]
- features - TEXT[]
- created_at - TIMESTAMP
- updated_at - TIMESTAMP

### saved_properties
- id (PK) - Serial
- user_id (FK) - INTEGER, references users(id)
- property_id (FK) - INTEGER, references properties(id)
- created_at - TIMESTAMP
- notes - TEXT

### saved_searches
- id (PK) - Serial
- user_id (FK) - INTEGER, references users(id)
- name - VARCHAR(100)
- search_criteria - JSONB
- alert_frequency - VARCHAR(20)
- created_at - TIMESTAMP
- updated_at - TIMESTAMP
- last_alert_sent - TIMESTAMP

### property_views
- id (PK) - Serial
- user_id (FK, nullable) - INTEGER, references users(id)
- property_id (FK) - INTEGER, references properties(id)
- timestamp - TIMESTAMP
- source - VARCHAR(50)
- session_id - VARCHAR(100)

### contacts
- id (PK) - Serial
- name - VARCHAR(255)
- email - VARCHAR(255)
- phone - VARCHAR(50)
- inquiry_type - VARCHAR(100)
- property_type - VARCHAR(100)
- budget_range - VARCHAR(100)
- preferred_contact - VARCHAR(50)
- message - TEXT
- created_at - TIMESTAMP
- status - VARCHAR(50)

## Relationships
- users 1:N saved_properties
- users 1:N saved_searches
- users 1:N property_views
- properties 1:N saved_properties
- properties 1:N property_views

