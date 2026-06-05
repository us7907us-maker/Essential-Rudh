"use client";
import React, { useState, useEffect } from 'react';
import { Sparkles, Globe, ShieldAlert, CheckCircle, Smartphone, Monitor, Share2, Code, Zap } from 'lucide-react';

export default function SeoPanel({ entityData, setEntityData }: any) {
  const [seo, setSeo] = useState({
    metaTitle: entityData.seo?.metaTitle || '', 
    metaDescription: entityData.seo?.metaDescription || '', 
    focusKeyword: entityData.seo?.focusKeyword || '', 
    slug: entityData.seo?.slug || entityData.slug || '', 
    noindex: entityData.seo?.noindex || false,
    canonicalUrl: entityData.seo?.canonicalUrl || '',
    schemaType: entityData.seo?.schemaType || (entityData.price ? 'Product' : 'Article')
  });
  
  const [score, setScore] = useState(0);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [previewMode, setPreviewMode] = useState<'google' | 'social'>('google');

  // 🧠 DEEP LEARNING SEO SCORE ENGINE
  useEffect(() => {
    let newScore = 100;
    if (seo.metaTitle.length < 30 || seo.metaTitle.length > 60) newScore -= 15;
    if (seo.metaDescription.length < 120 || seo.metaDescription.length > 160) newScore -= 15;
    if (!seo.focusKeyword) newScore -= 20;
    if (seo.focusKeyword && !seo.metaTitle.toLowerCase().includes(seo.focusKeyword.toLowerCase())) newScore -= 10;
    if (seo.focusKeyword && !seo.metaDescription.toLowerCase().includes(seo.focusKeyword.toLowerCase())) newScore -= 10;
    setScore(Math.max(0, newScore));
    
    // Sync with parent
    setEntityData({ ...entityData, seo });
  }, [seo]);

  // 🤖 REAL AI SEO ASSISTANT API CALL
  const generateAiSeo = async () => {
    setIsGeneratingAI(true);
    try {
        const res = await fetch('/api/seo/ai-generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: entityData.name || entityData.title,
                description: entityData.description || entityData.introContent,
                brand: entityData.brand || 'Essential Rush',
                type: seo.schemaType
            })
        });

        const data = await res.json();
        
        if (data.success) {
            const newSlug = seo.slug || data.data.metaTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            setSeo({
                ...seo,
                metaTitle: data.data.metaTitle,
                metaDescription: data.data.metaDescription,
                focusKeyword: data.data.focusKeyword,
                slug: newSlug
            });
        } else {
            alert("AI Error: Check backend AI routes.");
        }
    } catch (error) {
        console.error("AI Engine Disconnected", error);
    } finally {
        setIsGeneratingAI(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] p-6 md:p-10 rounded-[20px] md:rounded-[30px] border border-[#00F0FF]/30 shadow-[0_0_30px_rgba(0,240,255,0.05)] w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#00F0FF]/20 pb-6 mb-8 gap-4">
        <h3 className="text-xl md:text-2xl font-mono text-white flex items-center gap-3 uppercase tracking-widest"><Globe className="text-[#00F0FF]"/> Search Engine Core</h3>
        <div className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-bold text-xs md:text-sm tracking-widest uppercase shadow-lg ${score >= 80 ? 'bg-green-900/30 border-green-500/50 text-green-400' : score >= 50 ? 'bg-orange-900/30 border-orange-500/50 text-orange-400' : 'bg-red-900/30 border-red-500/50 text-red-400'}`}>
           <Zap size={16} className={score >= 80 ? 'animate-pulse' : ''} /> SEO Power: {score}/100
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
        {/* --- LEFT: EDIT FIELDS --- */}
        <div className="space-y-6">
          <button onClick={generateAiSeo} disabled={isGeneratingAI} className="w-full py-4 md:py-5 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/50 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-[#00F0FF] hover:text-black transition-all flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.2)] disabled:opacity-50">
            {isGeneratingAI ? <span className="animate-pulse flex items-center gap-2"><Sparkles size={16}/> Running Algorithmic Analysis...</span> : <><Sparkles size={18}/> Auto-Generate Metadata with J.A.R.V.I.S</>}
          </button>

          <div>
            <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 flex justify-between mb-2"><span>Meta Title</span> <span className={seo.metaTitle.length > 60 ? 'text-red-500' : 'text-gray-500'}>{seo.metaTitle.length}/60</span></label>
            <input value={seo.metaTitle} onChange={e=>setSeo({...seo, metaTitle: e.target.value})} className="w-full bg-[#111] border border-white/10 p-4 rounded-xl text-xs md:text-sm text-white outline-none focus:border-[#00F0FF] transition-colors" placeholder="SEO Optimized Title"/>
          </div>

          <div>
            <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 flex justify-between mb-2"><span>Meta Description</span> <span className={seo.metaDescription.length > 160 ? 'text-red-500' : 'text-gray-500'}>{seo.metaDescription.length}/160</span></label>
            <textarea value={seo.metaDescription} onChange={e=>setSeo({...seo, metaDescription: e.target.value})} rows={3} className="w-full bg-[#111] border border-white/10 p-4 rounded-xl text-xs md:text-sm text-white outline-none focus:border-[#00F0FF] transition-colors custom-scrollbar" placeholder="Compelling description for search results..."/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Focus Keyword</label>
              <input value={seo.focusKeyword} onChange={e=>setSeo({...seo, focusKeyword: e.target.value})} className="w-full bg-[#111] border border-white/10 p-4 rounded-xl text-xs md:text-sm text-white outline-none focus:border-[#00F0FF] transition-colors" placeholder="e.g. Luxury Watches" />
            </div>
            <div>
              <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">URL Slug</label>
              <input value={seo.slug} onChange={e=>setSeo({...seo, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'-')})} className="w-full bg-[#111] border border-[#00F0FF]/30 p-4 rounded-xl text-xs md:text-sm text-[#00F0FF] outline-none focus:border-[#00F0FF] transition-colors font-mono" placeholder="product-name" />
            </div>
          </div>

          {/* ADVANCED SEO SETTINGS */}
          <div className="p-5 border border-white/10 rounded-2xl bg-[#111] space-y-4">
             <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2 mb-4"><Code size={14}/> Advanced Technical Configurations</h4>
             
             <div>
                <label className="text-[10px] uppercase text-gray-500 block mb-1">Canonical URL (Optional)</label>
                <input value={seo.canonicalUrl} onChange={e=>setSeo({...seo, canonicalUrl: e.target.value})} className="w-full bg-black border border-white/10 p-3 rounded-lg text-xs text-white outline-none focus:border-[#D4AF37] font-mono" placeholder="https://essentialrush.com/..." />
             </div>

             <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-2">
                <div className="w-full md:w-1/2">
                   <label className="text-[10px] uppercase text-gray-500 block mb-1">Schema Markup Type</label>
                   <select value={seo.schemaType} onChange={e=>setSeo({...seo, schemaType: e.target.value})} className="w-full bg-black border border-white/10 p-3 rounded-lg text-xs text-white outline-none focus:border-[#D4AF37] appearance-none">
                       <option value="Product">Product</option>
                       <option value="Article">Article / Blog</option>
                       <option value="Organization">Organization</option>
                   </select>
                </div>
                <div className="flex items-center justify-between w-full md:w-1/2 p-3 bg-red-900/10 border border-red-500/20 rounded-lg">
                   <div><p className="text-[10px] font-bold text-red-400 uppercase">Hide from Google</p></div>
                   <input type="checkbox" checked={seo.noindex} onChange={e=>setSeo({...seo, noindex: e.target.checked})} className="w-4 h-4 accent-red-500 cursor-pointer" />
                </div>
             </div>
          </div>
        </div>

        {/* --- RIGHT: LIVE PREVIEWS --- */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
             <button onClick={() => setPreviewMode('google')} className={`text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-t-lg transition-colors ${previewMode === 'google' ? 'bg-[#00F0FF]/10 text-[#00F0FF] border-b-2 border-[#00F0FF]' : 'text-gray-500 hover:text-white'}`}><Monitor size={14} className="inline mr-2"/> SERP Preview</button>
             <button onClick={() => setPreviewMode('social')} className={`text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-t-lg transition-colors ${previewMode === 'social' ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-500 hover:text-white'}`}><Share2 size={14} className="inline mr-2"/> Social Cards</button>
          </div>
          
          {/* SERP Preview */}
          {previewMode === 'google' && (
            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 shadow-2xl">
              <p className="text-[12px] text-gray-400 mb-1 flex items-center gap-2 font-sans"><span className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-[10px]">ER</span> essentialrush.com <span className="text-gray-600">›</span> {seo.slug || 'product'}</p>
              <h3 className="text-[20px] text-[#8ab4f8] font-sans mb-1 hover:underline cursor-pointer truncate">{seo.metaTitle || 'Essential Rush | Luxury Timepieces'}</h3>
              <p className="text-[14px] text-gray-300 font-sans leading-snug line-clamp-2">{seo.metaDescription || 'Experience the pinnacle of horology. Explore our curated collection of investment-grade luxury watches with global insured delivery.'}</p>
            </div>
          )}

          {/* Social Preview */}
          {previewMode === 'social' && (
            <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 shadow-2xl overflow-hidden max-w-sm mx-auto">
              <div className="h-48 bg-black border-b border-white/10 flex items-center justify-center overflow-hidden">
                 {entityData.imageUrl ? <img src={entityData.imageUrl} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" /> : <Globe size={40} className="text-gray-700"/>}
              </div>
              <div className="p-4 bg-[#222]">
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">essentialrush.com</p>
                 <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">{seo.metaTitle || 'Essential Rush Vault'}</h3>
                 <p className="text-xs text-gray-400 line-clamp-1">{seo.metaDescription || 'Explore our exclusive collection.'}</p>
              </div>
            </div>
          )}

          {/* SEO Checker Checklist */}
          <div className="bg-[#111] p-6 rounded-2xl border border-white/10 space-y-4 shadow-inner">
             <h4 className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest border-b border-white/10 pb-3 mb-4 flex items-center gap-2"><ShieldAlert size={14} className="text-[#00F0FF]"/> Optimization Checklist</h4>
             
             <div className="space-y-3">
                 <div className="flex justify-between items-center">
                    <p className={`text-[10px] md:text-xs flex items-center gap-2 font-mono uppercase ${seo.metaTitle.length >= 30 && seo.metaTitle.length <= 60 ? 'text-green-400' : 'text-gray-500'}`}>{seo.metaTitle.length >= 30 && seo.metaTitle.length <= 60 ? <CheckCircle size={14}/> : <div className="w-3.5 h-3.5 rounded-full border border-gray-600"/>} Title Length (30-60)</p>
                    <span className="text-[10px] text-gray-600">{seo.metaTitle.length}/60</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <p className={`text-[10px] md:text-xs flex items-center gap-2 font-mono uppercase ${seo.metaDescription.length >= 120 && seo.metaDescription.length <= 160 ? 'text-green-400' : 'text-gray-500'}`}>{seo.metaDescription.length >= 120 && seo.metaDescription.length <= 160 ? <CheckCircle size={14}/> : <div className="w-3.5 h-3.5 rounded-full border border-gray-600"/>} Desc Length (120-160)</p>
                    <span className="text-[10px] text-gray-600">{seo.metaDescription.length}/160</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <p className={`text-[10px] md:text-xs flex items-center gap-2 font-mono uppercase ${seo.focusKeyword && seo.metaTitle.toLowerCase().includes(seo.focusKeyword.toLowerCase()) ? 'text-green-400' : 'text-gray-500'}`}>{seo.focusKeyword && seo.metaTitle.toLowerCase().includes(seo.focusKeyword.toLowerCase()) ? <CheckCircle size={14}/> : <div className="w-3.5 h-3.5 rounded-full border border-gray-600"/>} Keyword in Title</p>
                 </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}