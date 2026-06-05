import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

const RobotsSchema = new mongoose.Schema({
  userAgent: { type: String, default: '*' },
  disallow: [String],
  allow: [String],
  crawlDelay: Number,
  requestRate: String,
  sitemaps: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Robots = mongoose.models.Robots || mongoose.model('Robots', RobotsSchema);

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();

    const robots = await Robots.findOne({}) || {
      userAgent: '*',
      disallow: ['/admin', '/api', '/private'],
      allow: ['/api/public'],
      sitemaps: ['https://yourdomain.com/sitemap.xml'],
      crawlDelay: 1
    };

    return NextResponse.json({
      success: true,
      data: robots
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
    
    const updated = await Robots.findOneAndUpdate(
      {},
      {
        ...body,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Robots.txt updated',
      data: updated
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Generate actual robots.txt file
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const robots = await Robots.findOne({});

    // Generate robots.txt content
    let content = `User-agent: ${robots?.userAgent || '*'}\n`;
    
    if (robots?.disallow && robots.disallow.length > 0) {
      robots.disallow.forEach((path: string) => {
        content += `Disallow: ${path}\n`;
      });
    }
    
    if (robots?.allow && robots.allow.length > 0) {
      robots.allow.forEach((path: string) => {
        content += `Allow: ${path}\n`;
      });
    }
    
    if (robots?.crawlDelay) {
      content += `Crawl-delay: ${robots.crawlDelay}\n`;
    }
    
    if (robots?.sitemaps && robots.sitemaps.length > 0) {
      robots.sitemaps.forEach((sitemap: string) => {
        content += `Sitemap: ${sitemap}\n`;
      });
    }

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename="robots.txt"'
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}