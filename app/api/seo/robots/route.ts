import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

// In a real SaaS, this would save to the DB and be served dynamically.
// For this standalone setup, we mock reading/writing to the public folder.
const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    let content = "User-agent: *\nAllow: /\nSitemap: https://essentialrush.com/sitemap.xml";
    if (fs.existsSync(robotsPath)) {
      content = fs.readFileSync(robotsPath, 'utf8');
    }
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { content } = await req.json();
    fs.writeFileSync(robotsPath, content, 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}