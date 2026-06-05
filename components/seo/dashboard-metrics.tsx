"use client";

import React from 'react';
import { Activity, AlertTriangle, ArrowUpRight, CheckCircle, Globe, Zap } from 'lucide-react';
// 🚀 FIXED: Import both shared types, removed local declarations to fix ts(2440)
import { SeoMetrics } from '@/types/seo';

interface DashboardMetricsProps {
  metrics: SeoMetrics;
}

export function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Health Score</p>
          <Activity className={metrics.healthScore > 80 ? "text-green-500" : "text-yellow-500"} size={20} />
        </div>
        <h3 className="text-4xl font-bold font-mono">{metrics.healthScore}/100</h3>
      </div>
      
      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Organic Traffic</p>
          <Globe className="text-blue-500" size={20} />
        </div>
        <h3 className="text-4xl font-bold font-mono">{metrics.organicTraffic.toLocaleString()}</h3>
        <p className="text-xs text-green-500 flex items-center mt-2 font-medium">
          <ArrowUpRight size={14} className="mr-1" /> +12.5% MoM
        </p>
      </div>

      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Crawl Errors</p>
          <AlertTriangle className={metrics.crawlErrors > 0 ? "text-red-500" : "text-green-500"} size={20} />
        </div>
        <h3 className="text-4xl font-bold font-mono">{metrics.crawlErrors}</h3>
      </div>

      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Core Web Vitals</p>
          <Zap className="text-yellow-500" size={20} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">LCP</span>
            <span className={metrics.coreVitalsLcp < 2.5 ? "text-green-500" : "text-red-500 font-bold"}>{metrics.coreVitalsLcp}s</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">CLS</span>
            <span className={metrics.coreVitalsCls < 0.1 ? "text-green-500" : "text-red-500 font-bold"}>{metrics.coreVitalsCls}</span>
          </div>
        </div>
      </div>
    </div>
  );
}