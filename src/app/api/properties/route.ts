import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function extractPrice(priceString: string): number {
  try {
    // Remove € symbol, dots, and text, then convert to int
    const priceClean = priceString.replace('€', '').replace(/\./g, '').replace(' k.k.', '').replace(' v.o.n.', '');
    return parseInt(priceClean) || 0;
  } catch {
    return 0;
  }
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

    // Build where clause for filtering
    const where: any = {};

    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive'
      };
    }

    if (status) {
      where.status = status;
    }

    if (bedrooms) {
      where.bedrooms = {
        gte: parseInt(bedrooms)
      };
    }

    // Build orderBy clause for sorting
    let orderBy: any = { createdAt: 'desc' }; // default newest first

    if (sortBy === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (sortBy === 'price_desc') {
      orderBy = { price: 'desc' };
    } else if (sortBy === 'area_asc') {
      orderBy = { area: 'asc' };
    } else if (sortBy === 'area_desc') {
      orderBy = { area: 'desc' };
    }

    const properties = await prisma.property.findMany({
      where,
      orderBy
    });

    // Apply price filtering (since we can't easily filter by extracted price in DB)
    let filteredProperties = properties;

    if (minPrice || maxPrice) {
      filteredProperties = properties.filter(property => {
        const price = extractPrice(property.price);
        if (minPrice && price < parseInt(minPrice)) return false;
        if (maxPrice && price > parseInt(maxPrice)) return false;
        return true;
      });
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

    // Create property in database
    const newProperty = await prisma.property.create({
      data: {
        title: data.title,
        location: data.location,
        price: data.price,
        originalPrice: data.originalPrice || null,
        size: data.size,
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseInt(data.bathrooms),
        area: parseInt(data.area),
        energyLabel: data.energyLabel || 'A',
        features: data.features || [],
        mainImage: data.mainImage || '/images/properties/default.jpg',
        images: data.images || [],
        rating: parseInt(data.rating) || 5,
        status: data.status || 'available',
        description: data.description,
        neighborhood: data.neighborhood || null,
        yearBuilt: data.yearBuilt ? parseInt(data.yearBuilt) : null,
        plotSize: parseInt(data.plotSize) || 0,
        heating: data.heating || null,
        parking: data.parking || null,
        garden: data.garden || null
      }
    });

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}

