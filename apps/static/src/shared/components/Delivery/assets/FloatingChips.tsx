"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DeviceClass } from "../libs/useDeviceClass";

interface ChipProps {
  label: string;
  bg: string;
  text: string;
  darkBg?: string;
  darkText?: string;
}

const Chip = React.memo(function Chip({ label, bg, text }: ChipProps) {
  return (
    <div
      className="rounded-full px-3.5 py-1.5 text-[13px] font-bold whitespace-nowrap"
      style={{ background: bg, color: text, fontFamily: "sans-serif" }}
    >
      {label}
    </div>
  );
});

interface PriceConnectorProps {
  label: string;
  price: string;
  visible: boolean;
  delay?: number;
}

const PriceConnector = React.memo(function PriceConnector({
  label,
  price,
  visible,
  delay = 0,
}: PriceConnectorProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.35, delay }}
          className="flex items-center gap-1.5"
        >
          <div className="w-6 h-0.5 bg-[#1B5FC0] dark:bg-[#3b82f6]" />
          <div className="w-2 h-2 rounded-full bg-[#1B5FC0] dark:bg-[#3b82f6] flex-shrink-0" />
          <div
            className="rounded-2xl px-2.5 py-1 text-[12px] font-bold bg-[#e8f0fe] dark:bg-[#1e3a5f] text-[#1B5FC0] dark:text-[#93c5fd]"
            style={{ fontFamily: "sans-serif" }}
          >
            {price}
          </div>
          <div
            className="rounded-2xl px-3.5 py-1.5 text-[12px] font-bold bg-[#1B5FC0] dark:bg-[#2563eb] text-white"
            style={{ fontFamily: "sans-serif" }}
          >
            {label}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

interface FloatingChipsProps {
  stageIdx: number;
  deviceClass: DeviceClass;
}

export default function FloatingChips({ stageIdx, deviceClass }: FloatingChipsProps) {
  if (deviceClass === "mobile") return null;

  return (
    <>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5">
        <Chip label="Customer" bg="#00C9C8" text="white" />
        <div className="w-2 h-2 rounded-full bg-[#00C9C8] flex-shrink-0" />
        <div className="w-5 h-0.5 bg-[#00C9C8]" />
      </div>

      <div className="absolute right-0 top-[20%] z-10">
        <PriceConnector
          label="Restaurant"
          price="$11.00"
          visible={stageIdx >= 1}
        />
      </div>

      <div className="absolute right-0 top-[46%] z-10">
        <PriceConnector
          label="Dasher"
          price="$5.00"
          visible={stageIdx >= 4}
          delay={0.15}
        />
      </div>

      <AnimatePresence>
        {stageIdx >= 4 && (
          <motion.div
            key="doordash-chip"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, delay: 0.25 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
          >
            <div
              className="rounded-2xl px-3.5 py-1.5 text-[12px] font-bold text-white"
              style={{ background: "#E8402A", fontFamily: "sans-serif" }}
            >
              DoorDash
            </div>
            <div className="w-0.5 h-4 bg-[#E8402A]" />
            <div
              className="rounded-xl px-2.5 py-1 text-[11px] font-bold bg-[#ffe0dc] dark:bg-[#4c1d1a] text-[#E8402A] dark:text-[#fca5a5]"
              style={{ fontFamily: "sans-serif" }}
            >
              $1.00
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
