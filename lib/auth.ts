import { jwtVerify, SignJWT } from 'jose';
import { NextRequest } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'super-secret-key');

export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get('next-auth.session-token')?.value || 
                req.cookies.get('__Secure-next-auth.session-token')?.value || 
                req.headers.get('authorization')?.split(' ')[1];
  
  if (!token) return null;

  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload;
  } catch (err) {
    return null;
  }
}