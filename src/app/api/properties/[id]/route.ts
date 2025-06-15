import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/properties/[id] - Get specific property
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id }
    });
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ property });
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
    
    // Check if property exists
    const existingProperty = await prisma.property.findUnique({
      where: { id: params.id }
    });
    
    if (!existingProperty) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Update property
    const updatedProperty = await prisma.property.update({
      where: { id: params.id },
      data: {
        title: data.title,
        location: data.location,
        price: data.price,
        originalPrice: data.originalPrice || null,
        size: data.size,
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : undefined,
        bathrooms: data.bathrooms ? parseInt(data.bathrooms) : undefined,
        area: data.area ? parseInt(data.area) : undefined,
        energyLabel: data.energyLabel,
        features: data.features || [],
        mainImage: data.mainImage,
        images: data.images || [],
        rating: data.rating ? parseInt(data.rating) : undefined,
        status: data.status,
        description: data.description,
        neighborhood: data.neighborhood || null,
        yearBuilt: data.yearBuilt ? parseInt(data.yearBuilt) : undefined,
        plotSize: data.plotSize ? parseInt(data.plotSize) : undefined,
        heating: data.heating || null,
        parking: data.parking || null,
        garden: data.garden || null,
        additionalInfo: data.additionalInfo || null,
        // New rental fields
        isRented: data.isRented !== undefined ? data.isRented : undefined,
        monthlyRent: data.monthlyRent ? parseInt(data.monthlyRent) : undefined,
        tenantStatus: data.tenantStatus || null,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(updatedProperty);
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
    // Check if property exists
    const existingProperty = await prisma.property.findUnique({
      where: { id: params.id }
    });
    
    if (!existingProperty) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Delete property
    await prisma.property.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { error: 'Failed to delete property' },
      { status: 500 }
    );
  }
}

