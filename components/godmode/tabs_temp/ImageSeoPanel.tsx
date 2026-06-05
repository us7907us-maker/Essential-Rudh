"use client";
import React, { useState } from 'react';
import { Image as ImageIcon, CheckCircle, Zap, ShieldCheck } from 'lucide-react';

export default function ImageSeoPanel({ entityData, setEntityData }: any) {
  const allImages = [entityData.imageUrl, ...(entityData.images || [])].filter(Boolean);
  const seo = entityData.seo || {};
  const altTexts = seo.imageAltTexts || {};
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);

  const handleAltChange = (url: string, newAlt: string) => {
    const updatedAltTexts = { ...altTexts, [url]: newAlt };
    setEntityData({
      ...entityData,
      seo: { ...seo, imageAltTexts: updatedAltTexts }
    });
  };

  const autoGenerateAlt = (url: string, index: number) => {
    const suffix = index === 0 ? 'Primary Masterpiece View' : `Detail Angle ${index}`;
    const generatedAlt = `Essential Rush ${entityData.brand || ''} ${entityData.name || 'Luxury Timepiece'} - ${suffix}`.trim();
    handleAltChange(url, generatedAlt);
  };

  const bulkGenerateAll = async () => {
    setIsBulkGenerating(true);
    // Simulating JARVIS bulk processing
    await new Promise(resolve => setTimeout(resolve, 800));
    allImages.forEach((url, i) => autoGenerateAlt(url, i));
    setIsBulkGenerating(false);
  };

  if (allImages.length === 0) {
      return (
          <div className="bg-[#111] p-10 rounded-[30px] border border-white/10 text-center flex flex-col items-center">
              <ImageIcon className="text-gray-600 mb-4" size={40}/>
              <p className="text-xs uppercase tracking-widest font-bold text-gray-500">Visual Assets Missing. Upload in primary tab.</p>
          </div>
      );
  }

  const completeCount = allImages.filter(url => altTexts[url]).length;
  const progress = Math.round((completeCount / allImages.length) * 100);

  return (
    <div className="bg-[#0a0a0a] p-6 md:p-10 rounded-[20px] md:rounded-[30px] border border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.05)] space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#D4AF37]/20 pb-6 gap-4">
        <div>
           <h3 className="text-xl md:text-2xl font-mono text-white flex items-center gap-3 uppercase tracking-widest"><ImageIcon className="text-[#D4AF37]"/> Image SEO Matrix</h3>
           <p className="text-[10px] md:text-xs text-gray-400 mt-1 uppercase tracking-widest">Optimize visual assets for Google Images ranking</p>
        </div>
        
        <div className="flex flex-col items-end gap-2 w-full md:w-auto">
            <div className="w-full md:w-48 h-2 bg-black rounded-full overflow-hidden border border-white/10">
                <div className="h-full bg-[#D4AF37] transition-all duration-500" style={{width: `${progress}%`}}></div>
            </div>
            <p className="text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase">{progress}% Optimized</p>
        </div>
      </div>

      <div className="flex justify-end">
          <button onClick={bulkGenerateAll} disabled={isBulkGenerating || progress === 100} className="px-6 py-3 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-2 disabled:opacity-50">
             {isBulkGenerating ? <span className="animate-pulse">Processing...</span> : <><Zap size={14}/> Bulk AI Generate</>}
          </button>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
        {allImages.map((imgUrl, index) => (
          <div key={index} className={`flex flex-col md:flex-row items-start md:items-center gap-6 bg-[#111] p-4 rounded-2xl border transition-colors ${altTexts[imgUrl] ? 'border-green-500/30' : 'border-white/10'}`}>
            <div className="w-24 h-24 bg-black rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2 border border-white/5">
                <img src={imgUrl} alt="Thumbnail" className="max-w-full max-h-full object-contain" />
            </div>

            <div className="flex-1 w-full space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Asset {index + 1} Description</label>
                    {altTexts[imgUrl] && <span className="text-[9px] font-bold uppercase tracking-widest text-green-400 bg-green-500/10 px-2 py-1 rounded-md flex items-center gap-1"><ShieldCheck size={10}/> Synced</span>}
                </div>
                
                <div className="flex gap-2">
                    <input 
                        value={altTexts[imgUrl] || ''} 
                        onChange={(e) => handleAltChange(imgUrl, e.target.value)}
                        className="flex-1 bg-black border border-white/10 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37] transition-colors" 
                        placeholder="Define visual context..."
                    />
                    <button onClick={() => autoGenerateAlt(imgUrl, index)} className="p-3 bg-black border border-white/10 rounded-xl text-gray-500 hover:text-[#00F0FF] hover:border-[#00F0FF] transition-colors" title="Auto-fill">
                        <Zap size={16}/>
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}