"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TYPING_TEXT } from "@/shared/@types/Business/Hardware";
import { useTypewriter } from "@/shared/hooks/useTypewriter";
import AIResponse from "./AIResponse";
import Image from "next/image";

export default function PhoneUI() {
  const { displayed, done } = useTypewriter(TYPING_TEXT);
  const [showResponse, setShowResponse] = useState(false);
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!done) return;
    setThinking(true);
    const t = setTimeout(() => {
      setThinking(false);
      setShowResponse(true);
    }, 1600);
    return () => clearTimeout(t);
  }, [done]);

  useEffect(() => {
    if (showResponse && scrollRef.current) {
      setTimeout(() => scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" }), 200);
    }
  }, [showResponse]);

  return (
    <div className="py-8 flex items-center justify-center  min-h-screen">
      <div className="relative w-[340px] h-[640px] bg-slate-950 rounded-[44px] border-[6px] border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_20px_rgba(16,185,129,0.1)] overflow-hidden flex flex-col">
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-slate-900 rounded-full z-30 flex items-center justify-end px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
        </div>

        <div className="relative z-20 flex items-center justify-between px-6 pt-3 pb-1 text-slate-400 select-none">
          <span className="text-[10px] font-semibold text-slate-300">9:41</span>
          <div className="flex gap-1 items-center text-[8px] text-slate-400">
            <span>5G</span>
            <div className="w-2.5 h-2 rounded-[1px] border border-slate-400 flex items-center p-[0.5px]">
              <div className="w-full h-full bg-slate-300 rounded-[0.5px]" />
            </div>
          </div>
        </div>

        <div className="relative z-20 flex items-center justify-between px-4 py-2.5 bg-slate-900/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white overflow-hidden border border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
              <Image
                src="/ai-logo.png"
                alt="✦"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-[12px] font-bold text-white leading-tight">Garnet AI</p>
              <p className="text-[8px] text-slate-400">Business Intelligence</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <button className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] bg-white/5 text-slate-400 hover:text-white transition-colors">
              ⟳
            </button>
            <button className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] bg-white/5 text-slate-400 hover:text-white transition-colors">
              ✕
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-3.5 pt-4 pb-16 space-y-3 no-scrollbar scroll-smooth"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-end"
          >
            <div className="text-[9px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span>☕</span> Café · 800 sq ft · 12 tables
            </div>
          </motion.div>

          <div className="flex justify-end">
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-[80%] rounded-2xl rounded-tr-xs px-3 py-2 bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md shadow-emerald-950/40"
            >
              <p className="text-[11px] leading-relaxed text-white font-medium">
                {displayed}
                {!done && (
                  <span className="inline-block w-0.5 h-2.5 ml-0.5 bg-white animate-pulse align-middle" />
                )}
              </p>
            </motion.div>
          </div>

          <AnimatePresence>
            {thinking && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white overflow-hidden p-0.5 shadow-sm">
                  <Image src="/ai-logo.png" alt="AI" width={34} height={34} />
                </div>
                <div className="flex gap-1 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 rounded-full bg-emerald-400"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
                <span className="text-[9px] text-slate-500">Thinking…</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AIResponse visible={showResponse} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-20">
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-full px-3.5 py-2 text-[10px] text-slate-400 bg-white/5 border border-white/10 backdrop-blur-sm">
              Ask about your business…
            </div>
            <button className="w-7 h-7 rounded-full flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20 text-xs">
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}