import { NextRequest, NextResponse } from 'next/server';

// This would be imported from the main properties route in a real app
// For now, we'll use the same in-memory storage
let properties: any[] = [
  {
    id: 'jacob-schorerlaan-201',
    title: 'Jacob Schorerlaan 201',
    location: 'Den Haag, Groente- en Fruitmarkt',
    price: '€465.000 k.k.',
    originalPrice: '€475.000',
    size: '107m²',
    bedrooms: 4,
    bathrooms: 1,
    area: 107,
    energyLabel: 'A',
    features: ['Tuin', 'Serre', 'Moderne Keuken', 'Parkeren'],
    mainImage: '/images/properties/living-room-1.jpg',
    images: [
      '/images/properties/living-room-1.jpg',
      '/images/properties/kitchen-1.jpg',
      '/images/properties/bedroom-1.jpg',
    ],
    rating: 5,
    status: 'new',
    description: 'Prachtig gerenoveerd appartement met moderne afwerking, ruime woonkamer en volledig uitgeruste keuken. Gelegen in een levendige buurt met alle voorzieningen binnen handbereik.',
    neighborhood: 'Groente- en Fruitmarkt',
    yearBuilt: 1920,
    plotSize: 0,
    heating: 'Centrale verwarming',
    parking: 'Parkeerplaats',
    garden: 'Achtertuin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'groenewegje-76',
    title: 'Groenewegje 76',
    location: 'Den Haag, Centrum',
    price: '€695.000 k.k.',
    size: '120m²',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    energyLabel: 'B',
    features: ['Grachtzicht', 'Historisch', 'Centrale Ligging'],
    mainImage: '/images/properties/living-room-2.jpg',
    images: [
      '/images/properties/living-room-2.jpg',
      '/images/properties/bedroom-1.jpg',
      '/images/properties/kitchen-1.jpg',
    ],
    rating: 5,
    status: 'under_offer',
    description: 'Karakteristiek appartement in het historische centrum van Den Haag met uitzicht op de gracht. Hoge plafonds, originele details en moderne voorzieningen maken dit een unieke woonkans.',
    neighborhood: 'Centrum',
    yearBuilt: 1890,
    plotSize: 0,
    heating: 'Centrale verwarming',
    parking: 'Geen',
    garden: 'Geen',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'westeinde-11-d',
    title: 'Westeinde 11-D',
    location: 'Den Haag, Centrum',
    price: '€525.000 k.k.',
    size: '95m²',
    bedrooms: 2,
    bathrooms: 1,
    area: 95,
    energyLabel: 'C',
    features: ['Stadscentrum', 'Gerenoveerd', 'Balkon'],
    mainImage: '/images/properties/living-room-3.jpg',
    images: [
      '/images/properties/living-room-3.jpg',
      '/images/properties/bedroom-2.jpg',
      '/images/properties/kitchen-1.jpg',
    ],
    rating: 4,
    status: 'available',
    description: 'Modern appartement in het bruisende centrum van Den Haag. Volledig gerenoveerd met hoogwaardige materialen en voorzien van een ruim balkon met uitzicht over de stad.',
    neighborhood: 'Centrum',
    yearBuilt: 1960,
    plotSize: 0,
    heating: 'Centrale verwarming',
    parking: 'Geen',
    garden: 'Balkon',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// GET /api/properties/[id] - Get specific property
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const property = properties.find(p => p.id === params.id);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
}

// PUT /api/properties/[id] - Update property
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const propertyIndex = properties.findIndex(p => p.id === params.id);
    
    if (propertyIndex === -1) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Update property
    properties[propertyIndex] = {
      ...properties[propertyIndex],
      ...data,
      updated_at: new Date().toISOString()
    };

    return NextResponse.json(properties[propertyIndex]);
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { error: 'Failed to update property' },
      { status: 500 }
    );
  }
}

// DELETE /api/properties/[id] - Delete property
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyIndex = properties.findIndex(p => p.id === params.id);
    
    if (propertyIndex === -1) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Remove property
    properties.splice(propertyIndex, 1);

    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { error: 'Failed to delete property' },
      { status: 500 }
    );
  }
}

