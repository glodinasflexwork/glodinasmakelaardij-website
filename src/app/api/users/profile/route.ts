import { NextResponse } from 'next/server';
import { verifyToken, prisma } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization token missing or invalid' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = verifyToken(token);
    } catch (error) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
      select: { 
        id: true, 
        email: true, 
        firstName: true, 
        lastName: true, 
        phone: true, 
        emailVerified: true, 
        createdAt: true, 
        updatedAt: true 
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization token missing or invalid' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = verifyToken(token);
    } catch (error) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }

    const { firstName, lastName, phone } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: decodedToken.userId },
      data: {
        firstName: firstName || null,
        lastName: lastName || null,
        phone: phone || null,
      },
      select: { 
        id: true, 
        email: true, 
        firstName: true, 
        lastName: true, 
        phone: true, 
        emailVerified: true, 
        createdAt: true, 
        updatedAt: true 
      },
    });

    return NextResponse.json({ 
      message: 'Profile updated successfully',
      user: updatedUser 
    }, { status: 200 });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

