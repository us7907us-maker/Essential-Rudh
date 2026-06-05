import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Return mock data for now (database integration later)
    return NextResponse.json({
      success: true,
      data: {
        totalKeywords: 0,
        rankings: [],
        traffic: 0,
        topPages: []
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch SEO data' }, { status: 500 });
  }
}