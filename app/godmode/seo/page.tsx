import { DashboardMetrics } from "@/components/seo/dashboard-metrics";
import { KeywordManager } from "@/components/seo/keyword-manager";
import { OnPageEditor } from "@/components/seo/on-page-editor";
import { Radar, Activity, Zap, Server } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function SeoGodModePage() {
  // In a real app, projectId would come from context or route params
  const project = await prisma.seoProject.findFirst(); 

  const mockMetrics = {
    healthScore: project?.healthScore || 92,
    totalIndexed: project?.totalIndexed || 1450,
    crawlErrors: project?.crawlErrors || 0,
    organicTraffic: project?.organicTraffic || 25400,
    authorityScore: project?.authorityScore || 45,
    coreVitalsLcp: project?.coreVitalsLcp || 1.8,
    coreVitalsFid: project?.coreVitalsFid || 0.05,
    coreVitalsCls: project?.coreVitalsCls || 0.02,
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 max-w-[1600px] mx-auto space-y-10">
      
      {/* GOD MODE HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-muted/30 border p-6 rounded-[24px]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center text-primary relative">
            <Radar size={24} className="relative z-10" />
            <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse rounded-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-black font-mono tracking-tighter uppercase">SEO God Mode</h1>
            <p className="text-xs text-muted-foreground font-bold tracking-[0.2em] uppercase mt-1 flex items-center gap-2">
              <Activity size={12} className="text-green-500 animate-pulse" /> Live Analysis Protocol Active
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-background border px-4 py-2 rounded-xl text-xs font-mono font-bold">
          <Server size={14} className="text-muted-foreground"/>
          Target: {project?.domain || 'essentialrush.com'}
        </div>
      </div>

      <DashboardMetrics metrics={mockMetrics} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-10">
          <KeywordManager projectId={project?.id || ''} />
        </div>
        <div className="xl:col-span-4 space-y-10">
          <OnPageEditor page={null} />
          
          <div className="bg-card border rounded-[24px] p-6 shadow-sm">
            <h4 className="font-mono font-bold uppercase border-b pb-4 mb-4 flex items-center gap-2">
              <Zap size={16} className="text-primary"/> Automation Engine
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg text-sm">
                <span>Auto-Generate Missing ALTs</span>
                <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full" /></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg text-sm">
                <span>301 Redirect 404 Pages</span>
                <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}