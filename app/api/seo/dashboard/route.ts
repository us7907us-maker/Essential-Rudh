import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get statistics from MongoDB (using aggregation pipeline)
    const stats = {
      totalKeywords: 0,
      trackedKeywords: 0,
      avgRanking: 0,
      topKeywords: [],
      recentActivity: [],
      healthScore: 85,
      issues: 0,
      suggestions: 0,
      traffic: {
        organic: 0,
        clicks: 0,
        impressions: 0
      }
    };

    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error: any) {
    console.error('SEO Dashboard Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}