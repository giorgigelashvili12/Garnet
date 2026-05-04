"use client";
import { Lock, ChevronLeft, ChevronRight, RotateCw, Plus } from "lucide-react";
import React from "react";

interface BrowserProps {
  url: string;
  children: React.ReactNode;
}

export default function Browser({ url, children }: BrowserProps) {
  return (
    <div className="w-full h-full max-w-5xl mx-auto overflow-hidden rounded-2xl border border-black/5 dark:border-white/20 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl shadow-2xl transition-colors duration-300">
      <div className="flex items-center gap-4 px-4 py-3 bg-white/60 dark:bg-black/20 border-b border-black/5 dark:border-white/10">
        
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-orange-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>

        <div className="flex items-center gap-2 text-zinc-400 dark:text-white/30">
          <ChevronLeft size={18} />
          <ChevronRight size={18} />
          <RotateCw size={16} />
        </div>

        <div className="flex-1 flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-lg px-3 py-1.5 border border-black/5 dark:border-white/5">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-white/60 text-sm font-medium">
            <Lock size={12} className="opacity-40" />
            <span className="tracking-tight">{url}</span>
          </div>
        </div>

        <Plus size={18} className="text-zinc-400 dark:text-white/30" />
      </div>

      <div className="bg-transparent min-h-125 overflow-auto">
        {children}
      </div>
    </div>
  );
}