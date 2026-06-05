"use client";

import { useState, useEffect } from "react";
import { Search, Plus, TrendingUp, TrendingDown, Minus, Sparkles } from "lucide-react";

export function KeywordManager({ projectId }: { projectId: string }) {
  const [keywords, setKeywords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/seo/keywords?projectId=${projectId}`)
      .then(res => res.json())
      .then(data => {
        setKeywords(data.keywords || []);
        setLoading(false);
      });
  }, [projectId]);

  return (
    <div className="bg-card border rounded-[24px] shadow-sm overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center bg-muted/30">
        <h3 className="text-xl font-bold font-mono uppercase tracking-widest flex items-center gap-2">
          Target Keywords
        </h3>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              placeholder="Search keywords..." 
              className="pl-10 pr-4 py-2 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            <Plus size={16} /> Track New
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground font-mono uppercase tracking-widest text-[10px]">
            <tr>
              <th className="p-4">Keyword</th>
              <th className="p-4 text-center">Intent</th>
              <th className="p-4 text-right">Volume</th>
              <th className="p-4 text-center">KD</th>
              <th className="p-4 text-center">Current Rank</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y font-medium">
            {loading ? (
              <tr><td colSpan={6} className="p-8 text-center animate-pulse">Loading intelligence...</td></tr>
            ) : keywords.map(kw => (
              <tr key={kw.id} className="hover:bg-muted/50 transition-colors">
                <td className="p-4 flex flex-col">
                  <span>{kw.term}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">{kw.cluster || 'Unclustered'}</span>
                </td>
                <td className="p-4 text-center">
                  <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-[10px] uppercase">{kw.intent}</span>
                </td>
                <td className="p-4 text-right font-mono">{kw.searchVolume.toLocaleString()}</td>
                <td className="p-4 text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${kw.difficulty > 70 ? 'bg-red-100 text-red-600' : kw.difficulty > 40 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                    {kw.difficulty}
                  </div>
                </td>
                <td className="p-4 text-center flex justify-center items-center gap-2">
                  <span className="font-mono text-lg">{kw.currentRank || '-'}</span>
                  {kw.currentRank && kw.previousRank ? (
                    kw.currentRank < kw.previousRank ? <TrendingUp size={16} className="text-green-500"/> :
                    kw.currentRank > kw.previousRank ? <TrendingDown size={16} className="text-red-500"/> :
                    <Minus size={16} className="text-gray-400" />
                  ) : null}
                </td>
                <td className="p-4 text-center">
                  <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors" title="AI Content Gap Analysis">
                    <Sparkles size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}