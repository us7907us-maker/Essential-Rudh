import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const projectId = req.nextUrl.searchParams.get('projectId');
    if (!projectId) return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });

    const project = await prisma.seoProject.findUnique({
      where: { id: projectId },
      include: {
        _count: {
          select: { pages: true, keywords: true, redirects: true, tasks: true }
        }
      }
    });

    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    const pendingTasks = await prisma.seoTask.findMany({
      where: { projectId, status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    return NextResponse.json({
      metrics: {
        healthScore: project.healthScore,
        totalIndexed: project.totalIndexed,
        crawlErrors: project.crawlErrors,
        organicTraffic: project.organicTraffic,
        authorityScore: project.authorityScore,
        coreVitalsLcp: project.coreVitalsLcp,
        coreVitalsFid: project.coreVitalsFid,
        coreVitalsCls: project.coreVitalsCls,
      },
      counts: project._count,
      pendingTasks
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}