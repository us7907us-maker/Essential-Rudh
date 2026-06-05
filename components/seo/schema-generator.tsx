"use client";

import { useState } from "react";
import { Code2, Sparkles, Save, CheckCircle, Copy } from "lucide-react";

export function SchemaGenerator({ pageId }: { pageId: string }) {
  const [schemaType, setSchemaType] = useState("Product");
  const [schemaJson, setSchemaJson] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAiGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/seo/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'schema',
          target: schemaType,
          context: 'Extract context from page content to generate rich snippet JSON-LD.',
        })
      });
      const json = await res.json();
      if (json.success) {
        setSchemaJson(JSON.stringify(json.data, null, 2));
      }
    } catch (e) {
      console.error("AI Generation failed", e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    const textToCopy = `<script type="application/ld+json">\n${schemaJson}\n</script>`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card border rounded-[24px] shadow-sm p-6 md:p-8 space-y-6 mt-10">
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <h3 className="text-xl font-bold uppercase tracking-widest font-mono flex items-center gap-2">
            <Code2 size={20} className="text-primary"/> Schema Builder
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Construct JSON-LD structured data for rich snippets.</p>
        </div>
        <button 
          onClick={handleAiGenerate} 
          disabled={isGenerating}
          className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 px-4 py-2 rounded-xl text-xs font-bold uppercase flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {isGenerating ? <Sparkles size={16} className="animate-spin" /> : <Sparkles size={16} />}
          AI Generate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-4">
          <label className="text-xs font-bold uppercase text-muted-foreground">Entity Type</label>
          <select 
            value={schemaType}
            onChange={(e) => setSchemaType(e.target.value)}
            className="w-full bg-background border p-3 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="Product">Product</option>
            <option value="Article">Article</option>
            <option value="FAQPage">FAQ Page</option>
            <option value="LocalBusiness">Local Business</option>
            <option value="Organization">Organization</option>
            <option value="BreadcrumbList">Breadcrumb</option>
          </select>
        </div>

        <div className="md:col-span-3 relative group">
          <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block">JSON-LD Output</label>
          <textarea 
            value={schemaJson}
            onChange={(e) => setSchemaJson(e.target.value)}
            rows={12}
            className="w-full bg-[#0a0a0a] text-green-400 font-mono border border-muted p-4 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none custom-scrollbar"
            placeholder={`{
  "@context": "https://schema.org/",
  "@type": "Product"
}`}
          />
          {schemaJson && (
            <button 
              onClick={copyToClipboard}
              className="absolute top-10 right-4 p-2 bg-background border rounded-lg text-muted-foreground hover:text-primary transition-colors"
            >
              {copied ? <CheckCircle size={16} className="text-green-500"/> : <Copy size={16}/>}
            </button>
          )}
        </div>
      </div>

      <div className="pt-4 border-t flex justify-end">
        <button className="bg-foreground text-background px-8 py-3 rounded-xl text-sm font-bold tracking-widest uppercase hover:bg-primary transition-colors flex items-center gap-2">
          <Save size={16} /> Save Schema
        </button>
      </div>
    </div>
  );
}