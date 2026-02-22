'use client'
import React from 'react'
import { Nfc } from 'lucide-react'

export default function Terminal() {
    return (
        <div className="relative">
            <div className="w-64 h-112 bg-white dark:bg-zinc-800 rounded-[2.5rem] border-[6px] border-slate-100 dark:border-zinc-700 shadow-2xl overflow-hidden flex flex-col items-center py-12">
                <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-10 border border-slate-100 dark:border-zinc-700">
                    <Nfc className="text-slate-400 size-8" />
                </div>

                <div className="text-center space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total</p>
                    <h3 className="text-5xl font-black text-slate-900 dark:text-white">$173.88</h3>
                </div>

                <p className="mt-auto text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                    Tap, insert, or swipe to pay
                </p>
            </div>

            <div className="absolute -top-6 -right-24 w-56 h-36 bg-linear-to-br from-emerald-600 to-green-500 rounded-xl shadow-2xl p-6 rotate-[-35deg] z-20 border border-white/10 transition-transform hover:rotate-[-25deg]">
                <div className="w-10 h-8 bg-yellow-200/40 rounded-md mb-4 border border-yellow-100/20" />

                <div className="h-4 w-3/4 bg-white/20 rounded-full mb-2" />
                <div className="h-4 w-1/2 bg-white/20 rounded-full" />

                <div className="absolute inset-0 bg-white/5 rounded-xl pointer-events-none" />
            </div>
        </div>
    )
}