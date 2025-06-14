import { NextResponse } from 'next/server';
import { prisma } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/verify-email?status=error&message=Missing verification token', req.url));
    }

    // Find user with this verification token
    const user = await prisma.user.findFirst({
      where: {
        emailVerifyToken: token,
        emailVerified: false
      }
    });

    if (!user) {
      return NextResponse.redirect(new URL('/verify-email?status=error&message=Invalid or expired verification token', req.url));
    }

    // Update user as verified and clear the token
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        emailVerified: true,
        emailVerifyToken: null,
        emailVerifiedAt: new Date()
      }
    });

    console.log(`Email verified successfully for user: ${user.email}`);

    // Redirect to success page
    return NextResponse.redirect(new URL('/verify-email?status=success', req.url));

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.redirect(new URL('/verify-email?status=error&message=Verification failed', req.url));
  }
}

