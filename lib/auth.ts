import { jwtVerify, SignJWT, JWTPayload } from "jose";
import { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

if (!secret) {
  throw new Error("NEXTAUTH_SECRET is not defined");
}

const JWT_SECRET = new TextEncoder().encode(secret);

export interface AuthPayload extends JWTPayload {
  id?: string;
  email?: string;
  role?: string;
}

export async function verifyAuth(
  req: NextRequest
): Promise<AuthPayload | null> {
  try {
    const token =
      req.cookies.get("next-auth.session-token")?.value ||
      req.cookies.get("__Secure-next-auth.session-token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    return payload as AuthPayload;
  } catch (error) {
    console.error("Auth verification failed:", error);
    return null;
  }
}

export async function generateToken(
  payload: AuthPayload
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}