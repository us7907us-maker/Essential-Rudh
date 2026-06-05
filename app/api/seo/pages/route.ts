import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

const SeoPageSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  title: String,
  description: String,
  keywords: [String],
  h1: String,
  contentLength: { type: Number, default: 0 },
  mobileScore: Number,
  desktopScore: Number,
  status: { type: Number, default: 200 },
  lastCrawled: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const SeoPage = mongoose.models.SeoPage || mongoose.model('SeoPage', SeoPageSchema);

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();

    const pages = await SeoPage.find({}).sort({ createdAt: -1 }).limit(100);

    return NextResponse.json({
      success: true,
      data: pages
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const newPage = await SeoPage.create(body);

    return NextResponse.json({
      success: true,
      data: newPage
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}