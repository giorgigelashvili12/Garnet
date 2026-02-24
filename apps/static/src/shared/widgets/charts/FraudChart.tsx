"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, Info } from 'lucide-react';

interface ChartSettings { width?: string | number; height?: string | number; barWidth?: number; gap?: string; }
interface FraudChartProps { settings?: ChartSettings; className?: string; }

const data = [{ m: 'J', d: 65, w: 25 }, { m: 'F', d: 45, w: 15 }, { m: 'M', d: 55, w: 30 }, { m: 'A', d: 40, w: 20 }, { m: 'M', d: 50, w: 25 }, { m: 'J', d: 30, w: 40 }, { m: 'J', d: 45, w: 20 }, { m: 'A', d: 70, w: 25 }, { m: 'S', d: 50, w: 20 }, { m: 'O', d: 60, w: 15 }];

export default function FraudChart({ settings, className }: FraudChartProps) {
    const chartHeight = settings?.height ?? 180;

    return (
        <div className={`bg-white pointer-events-none select-none dark:bg-zinc-950 rounded-[2.5rem] p-6 border border-slate-200 dark:border-white/5 shadow-xl w-full ${className}`}>
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold tracking-tighter text-slate-900 dark:text-white">Fraud Analytics</h2>
                    <h2 className="text-xs tracking-tighter text-slate-900 dark:text-white/70">Real-time analytics</h2>
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors text-slate-400"><MoreHorizontal size={18} /></button>
            </div>

            <div className="flex gap-6 mb-8">
                <div>
                    <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[9px] font-bold text-slate-400 tracking-tighter">Disputes</span>
                    </div>
                    <span className="text-2xl font-semibold text-slate-900 dark:text-white tabular-nums">0.08%</span>
                </div>
                <div>
                    <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-200 dark:bg-emerald-500/30" />
                        <span className="text-[9px] font-bold text-slate-400 tracking-tighter">Warnings</span>
                    </div>
                    <span className="text-2xl font-semibold text-slate-900 dark:text-white tabular-nums">0.01%</span>
                </div>
            </div>

            <div className="relative w-full" style={{ height: chartHeight }}>
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[...Array(4)].map((_, i) => (<div key={i} className="w-full border-t border-slate-100 dark:border-white/5" />))}
                </div>
                <div className="relative z-10 flex items-end justify-between h-full gap-1 md:gap-2">
                    {data.map((item, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center group h-full justify-end">
                            <div className="w-full flex flex-col justify-end items-center h-full max-w-[12px] md:max-w-[20px]">
                                <motion.div initial={{ height: 0 }} animate={{ height: `${item.w}%` }} transition={{ delay: i * 0.02, duration: 0.5 }} className="w-full bg-emerald-200 dark:bg-emerald-500/20 rounded-t-sm mb-0.5" />
                                <motion.div initial={{ height: 0 }} animate={{ height: `${item.d}%` }} transition={{ delay: i * 0.02, duration: 0.5 }} className="w-full bg-emerald-500 rounded-sm" />
                            </div>
                            <span className="mt-2 text-[8px] font-bold text-slate-400 uppercase">{item.m}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}