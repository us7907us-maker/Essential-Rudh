import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// ✅ NextAuth Type Extensions for Custom Session Properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      phone?: string;
      myReferral?: string;
      walletBalance: number;
      loyaltyTier: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    phone?: string;
    myReferral?: string;
    walletBalance: number;
    loyaltyTier: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    phone?: string;
    myReferral?: string;
    walletBalance: number;
    loyaltyTier: string;
  }
}