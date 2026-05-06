"use client";

import {motion} from 'framer-motion';
import type { NodeProps, ArrowProps } from '@/shared/@types';
import { ACTIVE_BG, ACTIVE_TEXT, ACCENT, GRAY_BG, GRAY_TEXT, GRAY_BORDER } from '@/shared/@types';

export function Node({ label, sublabel, active, delay = 0, className = "", children }: NodeProps) {
  return (
    <motion.div
      animate={{
        backgroundColor: active ? ACTIVE_BG : GRAY_BG,
        borderColor:     active ? ACCENT     : GRAY_BORDER,
        color:           active ? ACTIVE_TEXT : GRAY_TEXT,
        boxShadow:       active
          ? `0 0 0 3px color-mix(in srgb, ${ACCENT} 35%, transparent), 0 8px 32px color-mix(in srgb, ${ACTIVE_BG} 25%, transparent)`
          : "none",
      }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={`relative flex flex-col items-center justify-center rounded-xl border-2 font-mono select-none px-2 ${className}`}
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {active && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.3 }}
          className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
          style={{ backgroundColor: ACCENT, color: "#fff" }}
        >
          ✓
        </motion.span>
      )}
      {children ? children : (
        <>
          <span className="text-sm font-semibold leading-tight text-center">{label}</span>
          {sublabel && (
            <span
              className="text-[10px] mt-1 text-center leading-tight opacity-75"
            >
              {sublabel}
            </span>
          )}
        </>
      )}
    </motion.div>
  );
}

export function Arrow({ active, delay = 0, direction = "left" }: ArrowProps) {
  const isLeft = direction === "left";
  return (
    <div className={`flex items-center justify-center ${isLeft ? "w-16" : "h-10 flex-col"}`}>
      <motion.div
        animate={{
          opacity:          active ? 1 : 0.18,
          backgroundColor: active ? ACCENT : GRAY_BORDER,
        }}
        transition={{ duration: 0.45, delay }}
        className={isLeft ? "h-0.5 flex-1 relative" : "w-0.5 flex-1 relative"}
      >
        <motion.div
          animate={{ borderRightColor: active ? ACCENT : GRAY_BORDER }}
          transition={{ duration: 0.45, delay }}
          className={
            isLeft
              ? "absolute left-0 top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-r-10"
              : "absolute top-0 left-1/2 -translate-x-1/2 border-x-[6px] border-x-transparent border-b-10"
          }
          style={{
            borderRightColor: active ? ACCENT : GRAY_BORDER,
            borderBottomColor: active ? ACCENT : GRAY_BORDER,
          }}
        />
      </motion.div>
    </div>
  );
}

export function PulseRing({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <motion.div
      className="absolute inset-0 rounded-xl border-2 pointer-events-none"
      style={{ borderColor: ACCENT }}
      initial={{ opacity: 0.8, scale: 1 }}
      animate={{ opacity: 0, scale: 1.12 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
    />
  );
}
