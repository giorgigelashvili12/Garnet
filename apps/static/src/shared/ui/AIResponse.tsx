"use client";

import { motion } from 'framer-motion';
import { HARDWARE } from '../@types';
import HardwareCard from '../components/Business/HardwareCard';
import Image from 'next/image';

export default function AIResponse({ visible }: { visible: boolean }) {
  const total = HARDWARE.reduce((s, h) => s + parseInt(h.price.replace(/\D/g, "")), 0);
  
  if (!visible) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-3"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white overflow-hidden border border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]">
          <Image
            src="/ai-logo.png"
            alt="✦"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
          Found <strong style={{ color: "#34d399" }}>recommendations</strong> for your café
        </p>
      </motion.div>

      {HARDWARE.map((item, i) => <HardwareCard key={item.id} item={item} index={i} />)}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: HARDWARE.length * 0.12 + 0.4 }}
        className="mt-1 mb-4 p-3 rounded-2xl"
        style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
      >
        <p className="text-[10px] mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Estimated Total:</p>
        <p className="text-lg font-bold" style={{ color: "#34d399", fontFamily: "'DM Sans',sans-serif" }}>
          ${total.toLocaleString()}
        </p>
        <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
          Covers POS, networking, security, signage, inventory & printing. Prices may vary by region.
        </p>
      </motion.div>
    </motion.div>
  );
}
