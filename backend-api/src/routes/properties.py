from flask import Blueprint, request, jsonify
from datetime import datetime
import json
import os

properties_bp = Blueprint('properties', __name__)

# File to store properties data
PROPERTIES_FILE = 'data/properties.json'

def load_properties():
    """Load properties from JSON file"""
    try:
        if os.path.exists(PROPERTIES_FILE):
            with open(PROPERTIES_FILE, 'r') as f:
                return json.load(f)
        return []
    except Exception as e:
        print(f"Error loading properties: {str(e)}")
        return []

def save_properties(properties):
    """Save properties to JSON file"""
    try:
        os.makedirs(os.path.dirname(PROPERTIES_FILE), exist_ok=True)
        with open(PROPERTIES_FILE, 'w') as f:
            json.dump(properties, f, indent=2)
        return True
    except Exception as e:
        print(f"Error saving properties: {str(e)}")
        return False

# Initialize with sample data if file doesn't exist
def initialize_sample_data():
    if not os.path.exists(PROPERTIES_FILE):
        sample_properties = [
            {
                'id': 'jacob-schorerlaan-201',
                'title': 'Jacob Schorerlaan 201',
                'location': 'Den Haag, Groente- en Fruitmarkt',
                'price': '€465.000 k.k.',
                'originalPrice': '€475.000',
                'size': '107m²',
                'bedrooms': 4,
                'bathrooms': 1,
                'area': 107,
                'energyLabel': 'A',
                'features': ['Tuin', 'Serre', 'Moderne Keuken', 'Parkeren'],
                'mainImage': '/images/properties/living-room-1.jpg',
                'images': [
                    '/images/properties/living-room-1.jpg',
                    '/images/properties/kitchen-1.jpg',
                    '/images/properties/bedroom-1.jpg',
                ],
                'rating': 5,
                'status': 'new',
                'description': 'Prachtig gerenoveerd appartement met moderne afwerking, ruime woonkamer en volledig uitgeruste keuken. Gelegen in een levendige buurt met alle voorzieningen binnen handbereik.',
                'neighborhood': 'Groente- en Fruitmarkt',
                'yearBuilt': 1920,
                'plotSize': 0,
                'heating': 'Centrale verwarming',
                'parking': 'Parkeerplaats',
                'garden': 'Achtertuin',
                'created_at': datetime.now().isoformat(),
                'updated_at': datetime.now().isoformat()
            },
            {
                'id': 'groenewegje-76',
                'title': 'Groenewegje 76',
                'location': 'Den Haag, Centrum',
                'price': '€695.000 k.k.',
                'size': '120m²',
                'bedrooms': 3,
                'bathrooms': 2,
                'area': 120,
                'energyLabel': 'B',
                'features': ['Grachtzicht', 'Historisch', 'Centrale Ligging'],
                'mainImage': '/images/properties/living-room-2.jpg',
                'images': [
                    '/images/properties/living-room-2.jpg',
                    '/images/properties/bedroom-1.jpg',
                    '/images/properties/kitchen-1.jpg',
                ],
                'rating': 5,
                'status': 'under_offer',
                'description': 'Karakteristiek appartement in het historische centrum van Den Haag met uitzicht op de gracht. Hoge plafonds, originele details en moderne voorzieningen maken dit een unieke woonkans.',
                'neighborhood': 'Centrum',
                'yearBuilt': 1890,
                'plotSize': 0,
                'heating': 'Centrale verwarming',
                'parking': 'Geen',
                'garden': 'Geen',
                'created_at': datetime.now().isoformat(),
                'updated_at': datetime.now().isoformat()
            },
            {
                'id': 'westeinde-11-d',
                'title': 'Westeinde 11-D',
                'location': 'Den Haag, Centrum',
                'price': '€525.000 k.k.',
                'size': '95m²',
                'bedrooms': 2,
                'bathrooms': 1,
                'area': 95,
                'energyLabel': 'C',
                'features': ['Stadscentrum', 'Gerenoveerd', 'Balkon'],
                'mainImage': '/images/properties/living-room-3.jpg',
                'images': [
                    '/images/properties/living-room-3.jpg',
                    '/images/properties/bedroom-2.jpg',
                    '/images/properties/kitchen-1.jpg',
                ],
                'rating': 4,
                'status': 'available',
                'description': 'Modern appartement in het bruisende centrum van Den Haag. Volledig gerenoveerd met hoogwaardige materialen en voorzien van een ruim balkon met uitzicht over de stad.',
                'neighborhood': 'Centrum',
                'yearBuilt': 1960,
                'plotSize': 0,
                'heating': 'Centrale verwarming',
                'parking': 'Geen',
                'garden': 'Balkon',
                'created_at': datetime.now().isoformat(),
                'updated_at': datetime.now().isoformat()
            }
        ]
        save_properties(sample_properties)

# Initialize sample data on import
initialize_sample_data()

@properties_bp.route('/properties', methods=['GET'])
def get_properties():
    """Get all properties with optional filtering"""
    try:
        properties = load_properties()
        
        # Get query parameters for filtering
        location = request.args.get('location', '').lower()
        min_price = request.args.get('min_price', type=int)
        max_price = request.args.get('max_price', type=int)
        bedrooms = request.args.get('bedrooms', type=int)
        property_type = request.args.get('property_type', '').lower()
        status = request.args.get('status', '').lower()
        sort_by = request.args.get('sort_by', 'newest')
        
        # Apply filters
        filtered_properties = properties.copy()
        
        if location:
            filtered_properties = [p for p in filtered_properties if location in p['location'].lower()]
        
        if min_price:
            filtered_properties = [p for p in filtered_properties if extract_price(p['price']) >= min_price]
        
        if max_price:
            filtered_properties = [p for p in filtered_properties if extract_price(p['price']) <= max_price]
        
        if bedrooms:
            filtered_properties = [p for p in filtered_properties if p['bedrooms'] >= bedrooms]
        
        if status:
            filtered_properties = [p for p in filtered_properties if p['status'] == status]
        
        # Apply sorting
        if sort_by == 'price_asc':
            filtered_properties.sort(key=lambda x: extract_price(x['price']))
        elif sort_by == 'price_desc':
            filtered_properties.sort(key=lambda x: extract_price(x['price']), reverse=True)
        elif sort_by == 'area_asc':
            filtered_properties.sort(key=lambda x: x['area'])
        elif sort_by == 'area_desc':
            filtered_properties.sort(key=lambda x: x['area'], reverse=True)
        elif sort_by == 'newest':
            filtered_properties.sort(key=lambda x: x.get('created_at', ''), reverse=True)
        
        return jsonify({
            'properties': filtered_properties,
            'total': len(filtered_properties),
            'filters_applied': {
                'location': location,
                'min_price': min_price,
                'max_price': max_price,
                'bedrooms': bedrooms,
                'property_type': property_type,
                'status': status,
                'sort_by': sort_by
            }
        }), 200
        
    except Exception as e:
        print(f"Error fetching properties: {str(e)}")
        return jsonify({'error': 'Failed to fetch properties'}), 500

@properties_bp.route('/properties/<property_id>', methods=['GET'])
def get_property(property_id):
    """Get a specific property by ID"""
    try:
        properties = load_properties()
        property_data = next((p for p in properties if p['id'] == property_id), None)
        
        if not property_data:
            return jsonify({'error': 'Property not found'}), 404
        
        return jsonify(property_data), 200
        
    except Exception as e:
        print(f"Error fetching property {property_id}: {str(e)}")
        return jsonify({'error': 'Failed to fetch property'}), 500

@properties_bp.route('/properties', methods=['POST'])
def create_property():
    """Create a new property"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'location', 'price', 'size', 'bedrooms', 'bathrooms', 'area', 'description']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        properties = load_properties()
        
        # Generate ID if not provided
        if not data.get('id'):
            data['id'] = generate_id(data['title'])
        
        # Check if ID already exists
        if any(p['id'] == data['id'] for p in properties):
            return jsonify({'error': 'Property with this ID already exists'}), 400
        
        # Add timestamps
        data['created_at'] = datetime.now().isoformat()
        data['updated_at'] = datetime.now().isoformat()
        
        # Set defaults
        data.setdefault('features', [])
        data.setdefault('images', [])
        data.setdefault('rating', 5)
        data.setdefault('status', 'available')
        data.setdefault('energyLabel', 'A')
        data.setdefault('yearBuilt', datetime.now().year)
        data.setdefault('plotSize', 0)
        data.setdefault('heating', '')
        data.setdefault('parking', '')
        data.setdefault('garden', '')
        data.setdefault('neighborhood', '')
        data.setdefault('mainImage', '/images/properties/default.jpg')
        
        properties.append(data)
        
        if save_properties(properties):
            return jsonify(data), 201
        else:
            return jsonify({'error': 'Failed to save property'}), 500
        
    except Exception as e:
        print(f"Error creating property: {str(e)}")
        return jsonify({'error': 'Failed to create property'}), 500

@properties_bp.route('/properties/<property_id>', methods=['PUT'])
def update_property(property_id):
    """Update an existing property"""
    try:
        data = request.get_json()
        properties = load_properties()
        
        # Find property index
        property_index = next((i for i, p in enumerate(properties) if p['id'] == property_id), None)
        
        if property_index is None:
            return jsonify({'error': 'Property not found'}), 404
        
        # Update property
        properties[property_index].update(data)
        properties[property_index]['updated_at'] = datetime.now().isoformat()
        
        if save_properties(properties):
            return jsonify(properties[property_index]), 200
        else:
            return jsonify({'error': 'Failed to update property'}), 500
        
    except Exception as e:
        print(f"Error updating property {property_id}: {str(e)}")
        return jsonify({'error': 'Failed to update property'}), 500

@properties_bp.route('/properties/<property_id>', methods=['DELETE'])
def delete_property(property_id):
    """Delete a property"""
    try:
        properties = load_properties()
        
        # Find and remove property
        properties = [p for p in properties if p['id'] != property_id]
        
        if save_properties(properties):
            return jsonify({'message': 'Property deleted successfully'}), 200
        else:
            return jsonify({'error': 'Failed to delete property'}), 500
        
    except Exception as e:
        print(f"Error deleting property {property_id}: {str(e)}")
        return jsonify({'error': 'Failed to delete property'}), 500

@properties_bp.route('/properties/search', methods=['POST'])
def search_properties():
    """Advanced property search with multiple criteria"""
    try:
        data = request.get_json()
        properties = load_properties()
        
        # Extract search criteria
        query = data.get('query', '').lower()
        filters = data.get('filters', {})
        
        # Start with all properties
        results = properties.copy()
        
        # Apply text search
        if query:
            results = [p for p in results if 
                      query in p['title'].lower() or 
                      query in p['location'].lower() or 
                      query in p['description'].lower() or
                      any(query in feature.lower() for feature in p['features'])]
        
        # Apply filters
        if filters.get('location'):
            results = [p for p in results if filters['location'].lower() in p['location'].lower()]
        
        if filters.get('min_price'):
            results = [p for p in results if extract_price(p['price']) >= filters['min_price']]
        
        if filters.get('max_price'):
            results = [p for p in results if extract_price(p['price']) <= filters['max_price']]
        
        if filters.get('bedrooms'):
            results = [p for p in results if p['bedrooms'] >= filters['bedrooms']]
        
        if filters.get('bathrooms'):
            results = [p for p in results if p['bathrooms'] >= filters['bathrooms']]
        
        if filters.get('energy_label'):
            results = [p for p in results if p['energyLabel'] == filters['energy_label']]
        
        if filters.get('status'):
            results = [p for p in results if p['status'] == filters['status']]
        
        return jsonify({
            'results': results,
            'total': len(results),
            'query': query,
            'filters': filters
        }), 200
        
    except Exception as e:
        print(f"Error searching properties: {str(e)}")
        return jsonify({'error': 'Failed to search properties'}), 500

def extract_price(price_string):
    """Extract numeric price from price string like '€465.000 k.k.'"""
    try:
        # Remove € symbol, dots, and text, then convert to int
        price_clean = price_string.replace('€', '').replace('.', '').replace(' k.k.', '').replace(' v.o.n.', '')
        return int(price_clean)
    except:
        return 0

def generate_id(title):
    """Generate a URL-friendly ID from title"""
    return title.lower().replace(' ', '-').replace(',', '').replace('.', '').replace('/', '-')

