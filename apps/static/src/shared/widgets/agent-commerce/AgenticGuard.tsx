"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Ban, UserCheck, AlertCircle } from "lucide-react";
import { useDict } from "@/shared/hooks/useDict";

export function AgenticGuard() {
  const dict = useDict();
  const t = dict?.charts?.AgenticGuard;

  const constraints = [
    { id: 1, type: t.type1, value: t.value1, active: true },
    { id: 2, type: t.type2, value: t.value2, active: true },
  ];

  return (
    <div className="flex flex-col gap-3 max-w-[320px] mx-auto p-4 font-sans transition-colors">
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-emerald-500/20 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-3 space-y-2">
          {constraints.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between gap-3 p-2 rounded-lg bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700"
            >
              <div className="flex items-center gap-2">
                <Ban size={12} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-[11px] font-bold text-slate-700 dark:text-zinc-200">{c.value}</span>
              </div>
              <div className="w-6 h-3 bg-emerald-500 rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-2 h-2 bg-white rounded-full" />
              </div>
            </motion.div>
          ))}

          <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <UserCheck size={14} />
            <span className="text-[10px] font-black">{t.text1}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-start">
        <motion.div 
          animate={{ x: [0, 2, 0] }}
          className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 text-slate-900 dark:text-zinc-100 px-3 py-2 rounded-xl rounded-tl-none text-[10px] font-bold shadow-sm flex items-center gap-2"
        >
          <AlertCircle size={12} className="text-emerald-500 shrink-0" />
          {t.prompt1}
        </motion.div>
      </div>
    </div>
  );
}