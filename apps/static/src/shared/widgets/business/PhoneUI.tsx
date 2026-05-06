import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HARDWARE, TYPING_TEXT } from "@/shared/@types";
import { useTypewriter } from "@/shared/hooks/useTypewriter";
import AIResponse from "@/shared/ui/AIResponse";
import Image from "next/image";

export default function PhoneUI() {
  const { displayed, done } = useTypewriter(TYPING_TEXT);
  const [showResponse, setShowResponse] = useState(false);
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!done) return;
    setThinking(true);
    const t = setTimeout(() => { setThinking(false); setShowResponse(true); }, 1600);
    return () => clearTimeout(t);
  }, [done]);

  useEffect(() => {
    if (showResponse && scrollRef.current) {
      setTimeout(() => scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" }), 200);
    }
  }, [showResponse]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-slate-800"
    >
      <div
        className="relative bg-stone-800"
        style={{
          width: 375,
          height: 780,
          borderRadius: 50,
        }}
      >
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 z-10"
          style={{ paddingTop: 12, paddingBottom: 8 }}>
          <span className="text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>9:41</span>
          <div className="flex gap-1 items-center">
            {["▮▮▮", "◈", "⬛"].map((ic, i) => (
              <span key={i} className="text-[9px]" style={{ color: "rgba(255,255,255,0.5)" }}>{ic}</span>
            ))}
          </div>
        </div>

        <div className="absolute top-10 left-0 right-0 flex items-center justify-between px-5 z-10 pb-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white overflow-hidden border border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]">
              <Image
                src="/ai-logo.png"
                alt="✦"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-[13px] font-semibold" style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif" }}>Garnet AI</p>
              <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>Business Intelligence</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>⟳</button>
            <button className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>✕</button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="absolute left-0 right-0 overflow-y-auto"
          style={{ top: 90, bottom: 70, padding: "16px 14px 0" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-end mb-4"
          >
            <div className="text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5 bg-emerald-300 border border-emerald-500">
              <span>☕</span> Café · 800 sq ft · 12 tables
            </div>
          </motion.div>

          <div className="flex justify-end mb-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-[75%] rounded-2xl rounded-tr-sm px-3.5 py-2.5 shadow-lg shadow-emerald-900/20"
              style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}
            >
              <p className="text-[12px] leading-relaxed text-white font-medium">
                {displayed}
                {!done && <span className="inline-block w-0.5 h-3 ml-0.5 bg-white animate-pulse" style={{ verticalAlign: "middle" }} />}
              </p>
            </motion.div>
          </div>

          <AnimatePresence>
            {thinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white overflow-hidden p-1 shadow-sm shadow-emerald-500/20">
                    <Image src="/ai-logo.png" alt="AI" width={16} height={16} />
                </div>
                <div className="flex gap-1 px-3 py-2 rounded-2xl rounded-tl-sm"
                  style={{ background: "rgba(255,255,255,0.07)" }}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "#10b981" }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }} />
                  ))}
                </div>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Gathering insights…</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AIResponse visible={showResponse} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-3"
          style={{ background: "linear-gradient(to top, #0a0a0a 70%, transparent)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-full px-4 py-2.5 text-[11px] flex items-center"
              style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.08)" }}>
              Ask about your business…
            </div>
            <button className="w-9 h-9 rounded-full flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 text-white">
              ↑
            </button>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none rounded-[50px]"
          style={{ boxShadow: "inset 0 0 60px rgba(16,185,129,0.03)" }} />
      </div>
    </div>
  );
}
