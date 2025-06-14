import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Initialize Prisma Client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Password hashing functions
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// JWT token functions
export function generateToken(userId: string): string {
  const secret = process.env.JWT_SECRET || 'fallback_secret_change_in_production';
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
}

export function generateRefreshToken(userId: string): string {
  const secret = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_change_in_production';
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    const secret = process.env.JWT_SECRET || 'fallback_secret_change_in_production';
    const decoded = jwt.verify(token, secret) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(token: string): { userId: string } | null {
  try {
    const secret = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_change_in_production';
    const decoded = jwt.verify(token, secret) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

// Email sending function with Mailtrap API integration
export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  try {
    const apiToken = process.env.MAILTRAP_API_TOKEN;
    const fromEmail = process.env.MAILTRAP_FROM_EMAIL || 'noreply@glodinasmakelaardij.nl';
    
    if (!apiToken) {
      console.error('MAILTRAP_API_TOKEN is not set');
      return false;
    }

    const emailData = {
      from: {
        email: fromEmail,
        name: 'Glodinas Makelaardij'
      },
      to: [
        {
          email: to
        }
      ],
      subject: subject,
      html: html
    };

    const response = await fetch('https://send.api.mailtrap.io/api/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Email sent successfully via Mailtrap API:', result);
      return true;
    } else {
      const error = await response.text();
      console.error('Mailtrap API error:', response.status, error);
      return false;
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

// Generate random token for password reset
export function generateRandomToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

