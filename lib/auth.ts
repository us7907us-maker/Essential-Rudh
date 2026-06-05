import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'super-secret-key-change-in-production'
);

export async function verifyAuth(req: NextRequest) {
  try {
    // Get token from multiple sources
    const token = 
      req.cookies.get('next-auth.session-token')?.value ||
      req.cookies.get('__Secure-next-auth.session-token')?.value ||
      req.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return null;
    }

    // Verify the JWT token
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload;
  } catch (error) {
    console.error('Auth verification failed:', error);
    return null;
  }
}

export function getAuthSession(req: NextRequest) {
  try {
    const token = 
      req.cookies.get('next-auth.session-token')?.value ||
      req.cookies.get('__Secure-next-auth.session-token')?.value;

    return token ? { authenticated: true, token } : null;
  } catch (error) {
    return null;
  }
}