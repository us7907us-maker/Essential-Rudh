"use client";

import { useState } from "react";
import { Sparkles, Save, ShieldAlert, CheckCircle } from "lucide-react";

export function OnPageEditor({ page }: { page: any }) {
  const [formData, setFormData] = useState({
    metaTitle: page?.metaTitle || '',
    metaDescription: page?.metaDescription || '',
    slug: page?.urlSlug || '',
    canonicalUrl: page?.canonicalUrl || '',
    isNoindex: page?.isNoindex || false
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/seo/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'meta',
          target: formData.slug,
          context: 'Generate high-converting SEO metadata for this page based on the slug.',
        })
      });
      const json = await res.json();
      if (json.success) {
        setFormData({
          ...formData,
          metaTitle: json.data.metaTitle,
          metaDescription: json.data.metaDescription
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const titleLength = formData.metaTitle.length;
  const descLength = formData.metaDescription.length;

  return (
    <div className="bg-card border rounded-[24px] shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <h3 className="text-xl font-bold uppercase tracking-widest font-mono">On-Page Optimization</h3>
          <p className="text-sm text-muted-foreground mt-1">Configure metadata, canonicals, and indexing directives.</p>
        </div>
        <button 
          onClick={handleAiGenerate} 
          disabled={isGenerating}
          className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 px-4 py-2 rounded-xl text-xs font-bold uppercase flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {isGenerating ? <Sparkles size={16} className="animate-spin" /> : <Sparkles size={16} />}
          AI Auto-Fill
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Meta Title</label>
            <span className={`text-[10px] font-mono ${titleLength >= 30 && titleLength <= 60 ? 'text-green-500' : 'text-red-500'}`}>
              {titleLength} / 60
            </span>
          </div>
          <input 
            value={formData.metaTitle}
            onChange={e => setFormData({...formData, metaTitle: e.target.value})}
            className="w-full bg-background border p-3 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
            placeholder="Optimal title tag..."
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Meta Description</label>
            <span className={`text-[10px] font-mono ${descLength >= 120 && descLength <= 160 ? 'text-green-500' : 'text-red-500'}`}>
              {descLength} / 160
            </span>
          </div>
          <textarea 
            value={formData.metaDescription}
            onChange={e => setFormData({...formData, metaDescription: e.target.value})}
            rows={3}
            className="w-full bg-background border p-3 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
            placeholder="Compelling SERP description..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block">URL Slug</label>
            <input 
              value={formData.slug}
              onChange={e => setFormData({...formData, slug: e.target.value})}
              className="w-full bg-background border p-3 rounded-lg text-sm font-mono text-blue-500 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block">Canonical URL</label>
            <input 
              value={formData.canonicalUrl}
              onChange={e => setFormData({...formData, canonicalUrl: e.target.value})}
              className="w-full bg-background border p-3 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary outline-none"
              placeholder="Leave blank for self-referencing"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border mt-4">
          <div>
            <p className="text-sm font-bold text-red-500">Noindex Directive</p>
            <p className="text-xs text-muted-foreground">Hide this page from search engine crawlers entirely.</p>
          </div>
          <input 
            type="checkbox" 
            checked={formData.isNoindex}
            onChange={e => setFormData({...formData, isNoindex: e.target.checked})}
            className="w-5 h-5 accent-red-500 cursor-pointer"
          />
        </div>
      </div>

      <div className="pt-4 border-t flex justify-end">
        <button className="bg-foreground text-background px-8 py-3 rounded-xl text-sm font-bold tracking-widest uppercase hover:bg-primary transition-colors flex items-center gap-2">
          <Save size={16} /> Save On-Page Config
        </button>
      </div>
    </div>
  );
}