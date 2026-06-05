"use client";

import { useState, useEffect } from "react";
import { FileText, Save, RefreshCw } from "lucide-react";

export function RobotsManager({ projectId }: { projectId: string }) {
  const [robotsContent, setRobotsContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/seo/robots')
      .then(res => res.json())
      .then(data => {
        setRobotsContent(data.content || "User-agent: *\nAllow: /\nSitemap: https://essentialrush.com/sitemap.xml");
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/seo/robots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: robotsContent, projectId })
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-card border rounded-[24px] shadow-sm overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center bg-muted/30">
        <div>
          <h3 className="text-xl font-bold font-mono uppercase tracking-widest flex items-center gap-2">
            <FileText size={20} className="text-primary"/> Robots.txt Protocol
          </h3>
          <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">Manage crawler access directives</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving || loading}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
          Deploy
        </button>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="h-64 bg-muted animate-pulse rounded-xl w-full"></div>
        ) : (
          <textarea 
            value={robotsContent}
            onChange={e => setRobotsContent(e.target.value)}
            rows={15}
            className="w-full bg-[#0a0a0a] text-gray-300 font-mono border border-muted p-6 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none custom-scrollbar leading-relaxed"
          />
        )}
        <div className="mt-4 flex gap-2 flex-wrap">
            <span className="text-[10px] bg-muted px-2 py-1 rounded text-muted-foreground font-mono">User-agent: Googlebot</span>
            <span className="text-[10px] bg-muted px-2 py-1 rounded text-muted-foreground font-mono">Disallow: /api/</span>
            <span className="text-[10px] bg-muted px-2 py-1 rounded text-muted-foreground font-mono">Allow: /_next/static/</span>
        </div>
      </div>
    </div>
  );
}