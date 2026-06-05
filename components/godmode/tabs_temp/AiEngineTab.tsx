"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Terminal, Fingerprint, Cpu, Radar } from 'lucide-react';
import { useChat } from 'ai/react';

interface AiEngineProps {
  pricingRules: any;
  setPricingRules: (rules: any) => void;
  handleSaveAIRules: () => void;
}

export default function AiEngine({
  pricingRules,
  setPricingRules,
  handleSaveAIRules,
}: AiEngineProps) {
  
  // 🚀 J.A.R.V.I.S AI HOOK INITIALIZATION FOR THIS TAB
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/godmode-chat', // Correct endpoint for your JARVIS backend
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: 'AI Core Online. Algorithmic Valuation System active. What parameters should we adjust today, Boss?',
      },
    ],
  });
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll AI Terminal
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} key="ai" className="grid grid-cols-1 xl:grid-cols-12 gap-8 w-full">
        
       {/* ============================================== */}
       {/* LEFT PANEL: ALGORITHMIC VALUATION & SETTINGS */}
       {/* ============================================== */}
       <div className="xl:col-span-5 space-y-8">
           <div className="text-center md:text-left mb-6">
               <BrainCircuit size={40} className="w-12 h-12 text-[#00F0FF] mx-auto md:mx-0 mb-4"/>
               <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Algorithmic Valuation</h2>
               <p className="text-gray-400 text-xs md:text-sm">Dynamic fluctuation based on market velocity.</p>
           </div>

           <div className="bg-[#111] p-6 md:p-8 rounded-[20px] md:rounded-[30px] border border-[#00F0FF]/30 space-y-6 md:space-y-8 shadow-[0_0_50px_rgba(0,240,255,0.05)] w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-4 md:pb-6 gap-4">
                 <div>
                    <h4 className="text-base md:text-lg font-bold text-white">Enable Deep Learning</h4>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-1">Permit automatic price recalibration for limited stock assets.</p>
                 </div>
                 <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${pricingRules.isAiPricingActive ? 'text-[#00F0FF]' : 'text-gray-600'}`}>{pricingRules.isAiPricingActive ? 'ONLINE' : 'OFFLINE'}</span>
                    <button onClick={() => setPricingRules({...pricingRules, isAiPricingActive: !pricingRules.isAiPricingActive})} className={`w-16 min-h-[32px] md:h-8 rounded-full p-1 transition-colors ${pricingRules.isAiPricingActive ? 'bg-[#00F0FF]' : 'bg-gray-800'}`}>
                        <div className={`w-6 h-6 bg-white rounded-full transition-transform ${pricingRules.isAiPricingActive ? 'translate-x-8' : 'translate-x-0'}`}></div>
                    </button>
                 </div>
              </div>

              <div>
                 <div className="flex justify-between items-end mb-4">
                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">Absolute Price Ceiling</label>
                    <span className="text-xl md:text-2xl font-mono text-[#00F0FF]">{pricingRules.maxMarkupPercent}%</span>
                 </div>
                 <input type="range" min="0" max="50" value={pricingRules.maxMarkupPercent} onChange={(e) => setPricingRules({...pricingRules, maxMarkupPercent: Number(e.target.value)})} className="w-full h-2 min-h-[44px] md:min-h-auto bg-transparent md:bg-gray-800 rounded-full appearance-none cursor-pointer" style={{accentColor: '#00F0FF'}} />
                 <p className="text-[10px] md:text-xs text-gray-600 mt-0 md:mt-4">Restricts the maximum allowable deviation from the base coordinate.</p>
              </div>

              <button onClick={handleSaveAIRules} className="w-full min-h-[44px] py-4 md:py-5 bg-[#00F0FF] text-black font-bold uppercase tracking-widest rounded-xl text-[10px] md:text-sm hover:bg-white transition-all mt-6 shadow-[0_0_30px_rgba(0,240,255,0.2)] flex justify-center items-center gap-2">
                 <BrainCircuit size={16} /> Compile Algorithm
              </button>
           </div>
       </div>

       {/* ============================================== */}
       {/* RIGHT PANEL: J.A.R.V.I.S. TERMINAL (INTEGRATED) */}
       {/* ============================================== */}
       <div className="xl:col-span-7 w-full h-[600px] md:h-[700px] bg-[#0a0a0a] border border-[#00F0FF]/30 rounded-[20px] md:rounded-[30px] flex flex-col shadow-[0_0_30px_rgba(0,240,255,0.05)] overflow-hidden font-mono">
            {/* Terminal Header */}
            <div className="bg-[#00F0FF]/10 p-4 border-b border-[#00F0FF]/30 flex items-center justify-between">
              <span className="text-[10px] md:text-xs tracking-widest text-[#00F0FF] font-bold flex items-center gap-2"><Terminal size={16} /> CORE TERMINAL: J.A.R.V.I.S</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
              </span>
            </div>

            {/* Chat Area */}
            <div ref={chatRef} className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 custom-scrollbar bg-black/50">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] md:max-w-[85%] p-4 rounded-xl text-xs md:text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-[#00F0FF]/20 border border-[#00F0FF]/50 text-white' 
                      : 'bg-[#111] border border-[#00F0FF]/30 text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.05)]'
                  }`}>
                    <span className="text-[9px] md:text-[10px] tracking-widest uppercase opacity-50 block mb-2 font-bold flex items-center gap-2">
                      {m.role === 'user' ? <Fingerprint size={12}/> : <Cpu size={12}/>}
                      {m.role === 'user' ? 'Boss' : 'J.A.R.V.I.S.'}
                    </span>
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                  <div className="text-[#00F0FF] text-[10px] md:text-xs animate-pulse flex items-center gap-2">
                      <Radar size={14} className="animate-spin" /> Processing directive...
                  </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 md:p-4 border-t border-[#00F0FF]/30 bg-[#0A0A0A]">
              <div className="flex gap-2 md:gap-3 items-center bg-[#111] border border-white/10 rounded-xl p-2 focus-within:border-[#00F0FF] transition-colors">
                <span className="text-[#00F0FF] font-bold pl-2 hidden md:inline">{'>'}</span>
                <input
                  className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-600 text-xs md:text-sm px-2 py-2"
                  value={input}
                  placeholder="Ask J.A.R.V.I.S to update prices or scan inventory..."
                  onChange={handleInputChange}
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input}
                  className="px-4 py-2 bg-[#00F0FF]/20 hover:bg-[#00F0FF] transition-colors rounded-lg text-[#00F0FF] hover:text-black font-bold text-[10px] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  EXECUTE
                </button>
              </div>
            </form>
       </div>

    </motion.div>
  );
}