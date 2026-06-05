import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { imageUrl } = await req.json();

    // Mock AI alt text generation
    return NextResponse.json({
      success: true,
      altText: 'Generated alt text for image'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate alt text' }, { status: 500 });
  }
}