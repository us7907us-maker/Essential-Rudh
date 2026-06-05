import { jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "super-secret-key-change-in-production"
);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = (token as any).role || "USER";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function verifyAuth(req: NextRequest) {
  try {
    const token =
      req.cookies.get("next-auth.session-token")?.value ||
      req.cookies.get("__Secure-next-auth.session-token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) return null;

    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload;
  } catch (error) {
    console.error("Auth verification failed:", error);
    return null;
  }
}

export function getAuthSession(req: NextRequest) {
  try {
    const token =
      req.cookies.get("next-auth.session-token")?.value ||
      req.cookies.get("__Secure-next-auth.session-token")?.value;

    return token ? { authenticated: true, token } : null;
  } catch (error) {
    return null;
  }
}
