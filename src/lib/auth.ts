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

// Email sending function (placeholder - implement with your email service)
export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  try {
    // TODO: Implement email sending with Mailtrap or your preferred service
    console.log(`Email would be sent to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML: ${html}`);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

// Generate random token for password reset
export function generateRandomToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

