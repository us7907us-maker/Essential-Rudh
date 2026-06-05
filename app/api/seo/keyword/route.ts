import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const projectId = req.nextUrl.searchParams.get('projectId');
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '50');

  if (!projectId) return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });

  try {
    const keywords = await prisma.keyword.findMany({
      where: { projectId },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { searchVolume: 'desc' }
    });

    const total = await prisma.keyword.count({ where: { projectId } });

    return NextResponse.json({ keywords, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { projectId, term, cluster, intent, searchVolume, difficulty, cpc } = body;

    const keyword = await prisma.keyword.create({
      data: {
        projectId,
        term,
        cluster,
        intent,
        searchVolume: searchVolume || 0,
        difficulty: difficulty || 0,
        cpc: cpc || 0.0
      }
    });

    return NextResponse.json(keyword, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}