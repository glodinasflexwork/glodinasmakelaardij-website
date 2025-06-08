import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Mock user data for testing - replace with real database lookup later
    const mockUsers = [
      {
        id: 1,
        email: 'admin@glodinasmakelaardij.nl',
        password: 'admin123', // In real implementation, this would be hashed
        username: 'admin',
        is_verified: true,
        is_active: true
      },
      {
        id: 2,
        email: 'test@example.com',
        password: 'testpassword',
        username: 'testuser',
        is_verified: true,
        is_active: true
      }
    ];

    // Find user by email
    const user = mockUsers.find(u => u.email === email);

    // Check if user exists and password is correct
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is verified
    if (!user.is_verified) {
      return NextResponse.json(
        { error: 'Please verify your email before logging in' },
        { status: 403 }
      );
    }

    // Check if user is active
    if (!user.is_active) {
      return NextResponse.json(
        { error: 'Your account has been deactivated' },
        { status: 403 }
      );
    }

    // Create mock tokens (in real implementation, use proper JWT)
    const accessToken = `mock_access_token_${user.id}_${Date.now()}`;
    const refreshToken = `mock_refresh_token_${user.id}_${Date.now()}`;

    return NextResponse.json({
      message: 'Login successful',
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        is_verified: user.is_verified
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

