from flask import Blueprint, request, jsonify
from datetime import datetime

properties_bp = Blueprint('properties', __name__)

# Sample property data - in production this would come from a database
SAMPLE_PROPERTIES = [
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
        'garden': 'Achtertuin'
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
        'garden': 'Geen'
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
        'garden': 'Balkon'
    },
    {
        'id': 'rijslag-27',
        'title': 'Rijslag 27',
        'location': 'Den Haag, Benoordenhout',
        'price': '€1.250.000 k.k.',
        'size': '180m²',
        'bedrooms': 5,
        'bathrooms': 3,
        'area': 180,
        'energyLabel': 'A',
        'features': ['Zwembad', 'Grote Tuin', 'Moderne Villa'],
        'mainImage': '/images/properties/living-room-1.jpg',
        'images': [
            '/images/properties/living-room-1.jpg',
            '/images/properties/bedroom-2.jpg',
            '/images/properties/kitchen-1.jpg',
        ],
        'rating': 5,
        'status': 'under_offer',
        'description': 'Luxe villa in de prestigieuze wijk Benoordenhout. Deze ruime woning biedt alle comfort met een privé zwembad, grote tuin en hoogwaardige afwerking in alle ruimtes.',
        'neighborhood': 'Benoordenhout',
        'yearBuilt': 2010,
        'plotSize': 500,
        'heating': 'Vloerverwarming',
        'parking': 'Garage',
        'garden': 'Grote tuin met zwembad'
    }
]

@properties_bp.route('/properties', methods=['GET'])
def get_properties():
    """Get all properties with optional filtering"""
    try:
        # Get query parameters for filtering
        location = request.args.get('location', '').lower()
        min_price = request.args.get('min_price', type=int)
        max_price = request.args.get('max_price', type=int)
        bedrooms = request.args.get('bedrooms', type=int)
        property_type = request.args.get('property_type', '').lower()
        status = request.args.get('status', '').lower()
        sort_by = request.args.get('sort_by', 'newest')
        
        # Start with all properties
        filtered_properties = SAMPLE_PROPERTIES.copy()
        
        # Apply filters
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
        # Default is newest first (current order)
        
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
        property_data = next((p for p in SAMPLE_PROPERTIES if p['id'] == property_id), None)
        
        if not property_data:
            return jsonify({'error': 'Property not found'}), 404
        
        return jsonify(property_data), 200
        
    except Exception as e:
        print(f"Error fetching property {property_id}: {str(e)}")
        return jsonify({'error': 'Failed to fetch property'}), 500

@properties_bp.route('/properties/search', methods=['POST'])
def search_properties():
    """Advanced property search with multiple criteria"""
    try:
        data = request.get_json()
        
        # Extract search criteria
        query = data.get('query', '').lower()
        filters = data.get('filters', {})
        
        # Start with all properties
        results = SAMPLE_PROPERTIES.copy()
        
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

@properties_bp.route('/properties/test', methods=['GET'])
def test_properties():
    """Test endpoint to verify properties API is working"""
    return jsonify({
        'message': 'Properties API is working',
        'total_properties': len(SAMPLE_PROPERTIES),
        'timestamp': datetime.now().isoformat()
    }), 200

def extract_price(price_string):
    """Extract numeric price from price string like '€465.000 k.k.'"""
    try:
        # Remove € symbol, dots, and text, then convert to int
        price_clean = price_string.replace('€', '').replace('.', '').replace(' k.k.', '').replace(' v.o.n.', '')
        return int(price_clean)
    except:
        return 0

