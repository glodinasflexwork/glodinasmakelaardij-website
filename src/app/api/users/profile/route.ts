import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // For mock implementation, extract user ID from token
    // In real implementation, verify JWT token
    const tokenParts = token.split('_');
    if (tokenParts.length < 4 || tokenParts[0] !== 'mock' || tokenParts[1] !== 'access' || tokenParts[2] !== 'token') {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const userId = parseInt(tokenParts[3]);

    // Mock user data - replace with real database lookup
    const mockUsers = [
      {
        id: 1,
        email: 'admin@glodinasmakelaardij.nl',
        username: 'admin',
        first_name: 'Admin',
        last_name: 'User',
        phone: null,
        profile_image: null,
        is_verified: true,
        created_at: '2024-01-01T00:00:00.000Z',
        notification_preferences: {
          email_alerts: true,
          property_updates: true,
          saved_search_alerts: true,
          marketing: false
        }
      },
      {
        id: 2,
        email: 'test@example.com',
        username: 'testuser',
        first_name: 'Test',
        last_name: 'User',
        phone: null,
        profile_image: null,
        is_verified: true,
        created_at: '2024-01-01T00:00:00.000Z',
        notification_preferences: {
          email_alerts: true,
          property_updates: true,
          saved_search_alerts: true,
          marketing: false
        }
      }
    ];

    // Find user by ID
    const user = mockUsers.find(u => u.id === userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: user
    });

  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

