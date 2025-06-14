import { NextResponse } from 'next/server';
import { hashPassword, prisma, sendEmail, generateRandomToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, phone, username } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    const verificationToken = generateRandomToken();

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: firstName || username || null,
        lastName: lastName || null,
        phone: phone || null,
        emailVerifyToken: verificationToken,
      },
    });

    // Send verification email
    const verificationUrl = `${process.env.NEXT_PUBLIC_API_URL || 'https://www.glodinasmakelaardij.nl'}/verify-email?token=${verificationToken}`;
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welkom bij Glodinas Makelaardij!</h2>
        <p>Bedankt voor uw registratie. Klik op de onderstaande link om uw e-mailadres te verifiëren:</p>
        <a href="${verificationUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0;">
          E-mail Verifiëren
        </a>
        <p>Als de knop niet werkt, kopieer en plak deze link in uw browser:</p>
        <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
        <p>Met vriendelijke groet,<br>Het Glodinas Makelaardij Team</p>
      </div>
    `;

    await sendEmail(email, 'Verifieer uw e-mailadres - Glodinas Makelaardij', emailHtml);

    return NextResponse.json({ message: 'User registered successfully', userId: user.id }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

