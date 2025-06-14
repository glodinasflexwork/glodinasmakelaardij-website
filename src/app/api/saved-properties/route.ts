import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const { property_id, title, location, price, bedrooms, bathrooms, area, images, notes } = await req.json();

    const savedProperty = await prisma.savedProperty.create({
      data: {
        userId,
        property_id,
        title,
        location,
        price,
        bedrooms,
        bathrooms,
        area,
        images,
        notes,
      },
    });

    return NextResponse.json(savedProperty, { status: 201 });
  } catch (error: any) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    console.error('Error saving property:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const savedProperties = await prisma.savedProperty.findMany({
      where: { userId },
    });

    return NextResponse.json({ saved_properties: savedProperties }, { status: 200 });
  } catch (error: any) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    console.error('Error fetching saved properties:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}




export async function DELETE(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const url = new URL(req.url);
    const propertyId = url.pathname.split("/").pop();

    if (!propertyId) {
      return NextResponse.json({ message: "Property ID is required" }, { status: 400 });
    }

    await prisma.savedProperty.delete({
      where: {
        id: propertyId,
        userId: userId,
      },
    });

    return NextResponse.json({ message: "Property removed successfully" }, { status: 200 });
  } catch (error: any) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    console.error("Error removing property:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


