"use client";

import {motion} from 'framer-motion';
import { HARDWARE } from '@/shared/@types';

export default function HardwareCard({ item, index }: { item: typeof HARDWARE[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12 + 0.1, duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl overflow-hidden mb-3"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <div className="p-3.5">
        <div className='flex-none'>
          {item.emoji}
        </div>
        <div className="flex items-start justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
                {item.category}
              </p>
              <p className="text-sm font-semibold leading-tight" style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
                {item.name}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: item.badgeColor + "33", color: item.badgeColor, fontSize: "9px" }}
            >
              {item.badge}
            </span>
            <span className="text-sm font-bold text-emerald-400 mt-1.5">{item.price}</span>
          </div>
        </div>

        <p className="text-[11px] leading-relaxed mb-2.5" style={{ color: "rgba(255,255,255,0.55)" }}>
          {item.desc}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1 flex-wrap">
            {item.tags.map(t => (
              <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                {t}
              </span>
            ))}
          </div>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1 transition-all text-emerald-950 bg-emerald-300"
          >
            Buy ↗
          </a>
        </div>
      </div>
    </motion.div>
  );
}