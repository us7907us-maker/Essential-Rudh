"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    trend: string;
    color?: string; // Optional now, since we hardcode dark theme
}

export default function StatCard({ title, value, icon, trend }: StatCardProps) {
    return (
        <div className="bg-[#111] border border-white/10 hover:border-[#00F0FF]/50 p-6 md:p-8 rounded-[20px] md:rounded-[30px] relative overflow-hidden group transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]">
            <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700 text-white">
                {icon}
            </div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400">{title}</p>
                    <span className="flex items-center gap-1 text-[8px] font-bold bg-green-500/10 px-2 py-1 rounded border border-green-500/20 text-green-400 tracking-wider">
                        <ArrowUpRight size={10} /> {trend}
                    </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-mono font-bold tracking-tight text-white">{value}</h3>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/0 via-[#00F0FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>
    );
}