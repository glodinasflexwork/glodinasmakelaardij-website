import { NextResponse } from 'next/server';
import { prisma, sendEmail } from '@/lib/auth';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetPasswordExpires,
      },
    });

    const resetUrl = `${request.headers.get('origin')}/reset-password?token=${resetToken}`;

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wachtwoord Reset - Glodinas Makelaardij</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Glodinas Makelaardij</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Wachtwoord Reset Aanvraag</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Wachtwoord Wijzigen</h2>
            
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
              U ontvangt deze e-mail omdat u (of iemand anders) een wachtwoord reset heeft aangevraagd voor uw account.
            </p>
            
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 30px 0; font-size: 16px;">
              Klik op de onderstaande knop om uw wachtwoord te wijzigen:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 6px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
                Wachtwoord Wijzigen
              </a>
            </div>
            
            <p style="color: #6b7280; line-height: 1.6; margin: 30px 0 0 0; font-size: 14px;">
              Als de knop niet werkt, kopieer en plak deze link in uw browser:<br>
              <a href="${resetUrl}" style="color: #3b82f6; word-break: break-all;">${resetUrl}</a>
            </p>
            
            <div style="border-top: 1px solid #e5e7eb; margin: 30px 0; padding-top: 20px;">
              <p style="color: #9ca3af; line-height: 1.6; margin: 0; font-size: 14px;">
                Als u geen wachtwoord reset heeft aangevraagd, kunt u deze e-mail negeren. Uw wachtwoord blijft ongewijzigd.
              </p>
            </div>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              Met vriendelijke groet,<br>
              <strong>Het Glodinas Makelaardij Team</strong>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail(user.email, 'Wachtwoord Reset - Glodinas Makelaardij', emailContent);

    return NextResponse.json({ message: 'Password reset email sent' }, { status: 200 });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

