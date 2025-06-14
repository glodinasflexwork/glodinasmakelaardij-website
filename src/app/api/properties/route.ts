import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for properties (in production, this would be a database)
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

function generateId(title: string): string {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// GET /api/properties - Get all properties
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location')?.toLowerCase() || '';
    const status = searchParams.get('status')?.toLowerCase() || '';
    const minPrice = searchParams.get('min_price');
    const maxPrice = searchParams.get('max_price');
    const bedrooms = searchParams.get('bedrooms');
    const sortBy = searchParams.get('sort_by') || 'newest';

    let filteredProperties = [...properties];

    // Apply filters
    if (location) {
      filteredProperties = filteredProperties.filter(p => 
        p.location.toLowerCase().includes(location)
      );
    }

    if (status) {
      filteredProperties = filteredProperties.filter(p => p.status === status);
    }

    if (minPrice) {
      const min = parseInt(minPrice);
      filteredProperties = filteredProperties.filter(p => {
        const price = extractPrice(p.price);
        return price >= min;
      });
    }

    if (maxPrice) {
      const max = parseInt(maxPrice);
      filteredProperties = filteredProperties.filter(p => {
        const price = extractPrice(p.price);
        return price <= max;
      });
    }

    if (bedrooms) {
      const beds = parseInt(bedrooms);
      filteredProperties = filteredProperties.filter(p => p.bedrooms >= beds);
    }

    // Apply sorting
    if (sortBy === 'price_asc') {
      filteredProperties.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
    } else if (sortBy === 'price_desc') {
      filteredProperties.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
    } else if (sortBy === 'area_asc') {
      filteredProperties.sort((a, b) => a.area - b.area);
    } else if (sortBy === 'area_desc') {
      filteredProperties.sort((a, b) => b.area - a.area);
    } else if (sortBy === 'newest') {
      filteredProperties.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    return NextResponse.json({
      properties: filteredProperties,
      total: filteredProperties.length
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

// POST /api/properties - Create new property
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'location', 'price', 'size', 'bedrooms', 'bathrooms', 'area', 'description'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Generate ID if not provided
    if (!data.id) {
      data.id = generateId(data.title);
    }

    // Check if ID already exists
    if (properties.find(p => p.id === data.id)) {
      return NextResponse.json(
        { error: 'Property with this ID already exists' },
        { status: 400 }
      );
    }

    // Add timestamps and defaults
    const newProperty = {
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      features: data.features || [],
      images: data.images || [],
      rating: data.rating || 5,
      status: data.status || 'available',
      energyLabel: data.energyLabel || 'A',
      yearBuilt: data.yearBuilt || new Date().getFullYear(),
      plotSize: data.plotSize || 0,
      heating: data.heating || '',
      parking: data.parking || '',
      garden: data.garden || '',
      neighborhood: data.neighborhood || '',
      mainImage: data.mainImage || '/images/properties/default.jpg'
    };

    properties.push(newProperty);

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}

function extractPrice(priceString: string): number {
  try {
    // Remove € symbol, dots, and text, then convert to int
    const priceClean = priceString.replace('€', '').replace(/\./g, '').replace(' k.k.', '').replace(' v.o.n.', '');
    return parseInt(priceClean) || 0;
  } catch {
    return 0;
  }
}

