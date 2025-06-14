import { NextResponse } from 'next/server';
import { prisma, sendEmail, generateRandomToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({ 
      where: { email } 
    });

    if (!user) {
      return NextResponse.json({ message: 'No account found with this email address' }, { status: 404 });
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json({ message: 'Email is already verified' }, { status: 400 });
    }

    // Generate new verification token
    const verificationToken = generateRandomToken();

    // Update user with new token
    await prisma.user.update({
      where: { email },
      data: {
        emailVerifyToken: verificationToken,
      },
    });

    // Send new verification email
    const verificationUrl = `https://www.glodinasmakelaardij.nl/api/verify-email?token=${verificationToken}`;
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin-bottom: 10px;">Nieuwe Verificatie - Glodinas Makelaardij</h1>
          <p style="color: #666; font-size: 16px;">U heeft een nieuwe verificatie-e-mail aangevraagd. Klik op de onderstaande link om uw e-mailadres te verifiëren:</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            E-mail Verifiëren
          </a>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">Als de knop niet werkt, kopieer en plak deze link in uw browser:</p>
          <p style="color: #2563eb; word-break: break-all; font-size: 14px;">
            <a href="${verificationUrl}" style="color: #2563eb;">${verificationUrl}</a>
          </p>
        </div>
        
        <div style="margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
          <p>Met vriendelijke groet,<br>Het Glodinas Makelaardij Team</p>
        </div>
      </div>
    `;

    await sendEmail(email, 'Nieuwe Verificatie-e-mail - Glodinas Makelaardij', emailHtml);

    return NextResponse.json({ 
      message: 'New verification email sent successfully',
      email: email 
    }, { status: 200 });

  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

