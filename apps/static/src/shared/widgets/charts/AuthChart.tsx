"use client";
import React from 'react';
import { motion } from 'framer-motion';

const data = [
    { name: 'J', a: 45, b: 30, c: 25 },
    { name: 'F', nameFull: 'Feb', a: 50, b: 35, c: 15 },
    { name: 'M', nameFull: 'Mar', a: 40, b: 40, c: 20 },
    { name: 'A', nameFull: 'Apr', a: 55, b: 25, c: 20 },
    { name: 'M', nameFull: 'May', a: 60, b: 20, c: 20 },
    { name: 'J', nameFull: 'Jun', a: 50, b: 30, c: 20 },
];

export default function AuthChart({ className }: { className?: string }) {
    return (
        <div className={`w-full pointer-events-none select-none max-w-[320px] bg-white dark:bg-zinc-950 rounded-4xl p-6 border border-slate-100 dark:border-white/5 shadow-xl ${className}`}>
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tighter">Authorization</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Monthly volume</p>
                </div>
                <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-500/20">+1.2%</span>
            </div>

            <div className="h-32 w-full relative flex items-end justify-between gap-2">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                    {[...Array(4)].map((_, i) => (<div key={i} className="w-full border-t border-slate-100 dark:border-white/5" />))}
                </div>

                {data.map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center group h-full justify-end relative z-10">
                        <div className="w-full max-w-4.5 flex flex-col justify-end h-full">
                            <motion.div initial={{ height: 0 }} animate={{ height: `${item.c}%` }} transition={{ delay: i * 0.05 }} className="w-full bg-emerald-200 dark:bg-emerald-200/50 rounded-t-sm" />
                            <motion.div initial={{ height: 0 }} animate={{ height: `${item.b}%` }} transition={{ delay: i * 0.05 + 0.1 }} className="w-full bg-emerald-500 border-y border-white dark:border-zinc-950" />
                            <motion.div initial={{ height: 0 }} animate={{ height: `${item.a}%` }} transition={{ delay: i * 0.05 + 0.2 }} className="w-full bg-emerald-900 dark:bg-emerald-400 rounded-b-sm" />
                        </div>
                        <span className="mt-3 text-[9px] font-bold text-slate-400">{item.name}</span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-50 dark:border-white/5">
                <LegendItem color="bg-emerald-900 dark:bg-emerald-400" label="Adaptive" />
                <LegendItem color="bg-emerald-500" label="Tokens" />
                <LegendItem color="bg-emerald-200" label="Updater" />
            </div>
        </div>
    );
}

function LegendItem({ color, label }: { color: string, label: string }) {
    return (
        <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
            <span className="text-xs font-black text-slate-300 tracking-tighter">{label}</span>
        </div>
    );
}