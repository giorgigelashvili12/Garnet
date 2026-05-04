"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Leaf, ArrowRight, Bell } from "lucide-react";
import { useDict } from "@/shared/hooks/useDict";

export function SmartKit() {
  const dict = useDict();
  const t = dict?.charts?.SmartKit;

  return (
    <div className="flex bg-gray-50 dark:bg-zinc-900/98 flex-col gap-6 max-w-md mx-auto p-6 font-sans transition-colors duration-300">
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-emerald-500/20 rounded-2xl shadow-xl overflow-hidden p-5 space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg">
              <Leaf size={18} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="font-bold text-slate-900 dark:text-zinc-50 tracking-tight">{t.title}</span>
          </div>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">$449.00</span>
        </div>

        <div className="grid grid-cols-2 gap-px bg-slate-100 dark:bg-emerald-500/20 border border-slate-100 dark:border-emerald-500/20 rounded-xl overflow-hidden">
          <div className="bg-white dark:bg-zinc-900 p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
              {t.text1} <ArrowRight size={12} />
            </div>
            <div className="text-lg font-black text-slate-900 dark:text-zinc-50">Jun 12</div>
            <div className="text-xs font-medium text-slate-500 dark:text-zinc-400">2:00 PM EST</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
              {t.text2} <ArrowRight size={12} />
            </div>
            <div className="text-lg font-black text-slate-900 dark:text-zinc-50">Jun 15</div>
            <div className="text-xs font-medium text-slate-500 dark:text-zinc-400">11:00 AM EST</div>
          </div>
        </div>

        <button className="w-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 py-4 rounded-xl flex items-center justify-center gap-3 text-sm font-black hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
          <ShoppingCart size={18} />
          {t.text3}
        </button>
      </div>

      <div className="flex justify-end">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-600 dark:bg-emerald-500 text-white px-6 py-4 rounded-3xl rounded-tr-none text-sm font-bold shadow-lg max-w-[85%]"
        >
          {t.prompt1}
        </motion.div>
      </div>

      <div className="flex justify-start">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 px-6 py-4 rounded-3xl rounded-tl-none text-sm font-bold shadow-sm flex items-center gap-3"
        >
          {t.prompt2}
        </motion.div>
      </div>
    </div>
  );
}