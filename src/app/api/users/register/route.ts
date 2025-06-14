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
    const verificationUrl = `https://www.glodinasmakelaardij.nl/api/verify-email?token=${verificationToken}`;
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin-bottom: 10px;">Welkom bij Glodinas Makelaardij!</h1>
          <p style="color: #666; font-size: 16px;">Bedankt voor uw registratie. Klik op de onderstaande link om uw e-mailadres te verifiëren:</p>
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

    await sendEmail(email, 'Verifieer uw e-mailadres - Glodinas Makelaardij', emailHtml);

    return NextResponse.json({ message: 'User registered successfully', userId: user.id }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

