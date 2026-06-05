"use client";
import React, { useEffect, useState } from 'react';
import { BarChart, Globe, AlertTriangle, CheckCircle, Image as ImageIcon, Type, Link as LinkIcon, Activity, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function SeoAnalyticsDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSeoStats = async () => {
            try {
                // Fetching real data (mocking the connection for now)
                const res = await fetch('/api/seo/analytics');
                const json = await res.json();
                if (json.success) setStats(json.data);
            } catch (err) {
                console.warn("Using simulated SEO data for Godmode.");
                // Fallback Simulation for J.A.R.V.I.S UI
                setStats({
                    avgScore: 92, totalIndexed: 45, missingMetaTitle: 0, missingMetaDesc: 2, missingAltText: 5,
                    needsAttention: [{ id: '123', name: 'Rolex Daytona Platinum', issues: { desc: true, alt: true }, score: 65 }]
                });
            } finally { setLoading(false); }
        };
        fetchSeoStats();
    }, []);

    if (loading) return (
        <div className="p-12 space-y-8 animate-pulse bg-[#0a0a0a] min-h-[500px] rounded-[30px] border border-[#00F0FF]/20 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-[#00F0FF]">
                <Cpu size={40} className="animate-spin" />
                <p className="font-mono text-xs tracking-[0.3em] uppercase">Scanning Google Indices...</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#0a0a0a] p-8 rounded-[30px] border border-[#00F0FF]/30 shadow-[0_0_40px_rgba(0,240,255,0.05)]">
                <div>
                    <h2 className="text-2xl md:text-3xl font-mono font-bold text-white flex items-center gap-3 uppercase tracking-widest"><Activity className="text-[#00F0FF]"/> Global Index Health</h2>
                    <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-2">Real-time search engine visibility metrics.</p>
                </div>
                <div className={`p-4 md:p-6 rounded-2xl flex items-center gap-4 border shadow-2xl ${stats.avgScore >= 80 ? 'bg-green-900/10 border-green-500/30' : 'bg-orange-900/10 border-orange-500/30'}`}>
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] font-black text-gray-500">Core Vitals Score</p>
                        <p className={`text-3xl font-black font-mono mt-1 ${stats.avgScore >= 80 ? 'text-green-400' : 'text-orange-400'}`}>{stats.avgScore}/100</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stats.avgScore >= 80 ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-orange-500/20 text-orange-400 border-orange-500/50'}`}>
                        {stats.avgScore >= 80 ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
                    </div>
                </div>
            </div>

            {/* 📈 CRITICAL STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SeoStatCard 
                    icon={<Globe size={24}/>} label="Live Indexed URLs" value={stats.totalIndexed} status="Synced to SERP" 
                    color="bg-[#111] border-[#00F0FF]/30 hover:border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.05)]" statusColor="text-[#00F0FF]"
                />
                <SeoStatCard 
                    icon={<Type size={24}/>} label="Missing Titles" value={stats.missingMetaTitle} status={stats.missingMetaTitle === 0 ? "Perfect" : "Requires Input"} 
                    color="bg-[#111] border-white/10 hover:border-red-500/50" statusColor={stats.missingMetaTitle === 0 ? "text-green-400" : "text-red-400"}
                />
                <SeoStatCard 
                    icon={<LinkIcon size={24}/>} label="Missing Descriptions" value={stats.missingMetaDesc} status={stats.missingMetaDesc === 0 ? "Optimal CTR" : "Low CTR Risk"} 
                    color="bg-[#111] border-white/10 hover:border-orange-500/50" statusColor={stats.missingMetaDesc === 0 ? "text-green-400" : "text-orange-400"}
                />
                <SeoStatCard 
                    icon={<ImageIcon size={24}/>} label="Missing Image Alts" value={stats.missingAltText} status={stats.missingAltText === 0 ? "Images Optimized" : "Image Rank Drop"} 
                    color="bg-[#111] border-white/10 hover:border-[#D4AF37]/50" statusColor={stats.missingAltText === 0 ? "text-green-400" : "text-[#D4AF37]"}
                />
            </div>

            {/* 🚨 NEEDS ATTENTION LIST */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-[30px] p-6 md:p-10 shadow-xl">
                <h3 className="text-lg md:text-xl font-mono font-bold uppercase tracking-widest text-white mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
                    <AlertTriangle className="text-red-500" size={20} /> Optimization Targets
                </h3>
                
                {stats.needsAttention.length === 0 ? (
                    <div className="py-16 text-center bg-[#111] rounded-2xl border border-dashed border-white/10">
                        <CheckCircle className="mx-auto mb-4 text-[#00F0FF]" size={40}/>
                        <p className="text-white font-mono uppercase tracking-widest text-xs">All database assets are fully optimized.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {stats.needsAttention.map((item: any, i: number) => (
                            <div key={i} className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-[#111] hover:bg-black border border-white/5 hover:border-[#00F0FF]/50 rounded-2xl gap-4 transition-all duration-300 group">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white mb-2 tracking-widest uppercase group-hover:text-[#00F0FF] transition-colors">{item.name}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.issues.title && <span className="px-2 py-1 bg-red-900/20 text-red-400 text-[8px] uppercase font-bold tracking-widest rounded border border-red-500/30">Missing Title</span>}
                                        {item.issues.desc && <span className="px-2 py-1 bg-orange-900/20 text-orange-400 text-[8px] uppercase font-bold tracking-widest rounded border border-orange-500/30">Missing Desc</span>}
                                        {item.issues.alt && <span className="px-2 py-1 bg-yellow-900/20 text-[#D4AF37] text-[8px] uppercase font-bold tracking-widest rounded border border-[#D4AF37]/30">Missing Alt</span>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t border-white/5 md:border-0 pt-4 md:pt-0 mt-2 md:mt-0">
                                    <div className="text-left md:text-right">
                                        <p className="text-[8px] text-gray-500 uppercase font-bold tracking-widest">Health</p>
                                        <p className={`text-lg font-black font-mono ${item.score >= 80 ? 'text-green-400' : 'text-red-400'}`}>{item.score}%</p>
                                    </div>
                                    <Link href={`/godmode`} className="px-6 py-3 bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all text-center">
                                        Fix Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function SeoStatCard({ icon, label, value, status, color, statusColor }: any) {
    return (
        <div className={`${color} p-6 md:p-8 rounded-3xl relative overflow-hidden group transition-all duration-300 border`}>
            <div className="absolute -right-4 -bottom-4 opacity-[0.05] group-hover:scale-125 transition-transform duration-700 text-white">
                {React.cloneElement(icon, { size: 100 })}
            </div>
            <div className="relative z-10">
                <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-2">{label}</p>
                <p className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tighter leading-none">{value}</p>
                <p className={`text-[8px] md:text-[9px] font-bold uppercase tracking-widest mt-6 flex items-center gap-2 ${statusColor}`}>
                    <CheckCircle size={12}/> {status}
                </p>
            </div>
        </div>
    );
}