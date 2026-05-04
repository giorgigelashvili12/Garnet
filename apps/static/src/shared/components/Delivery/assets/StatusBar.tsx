"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface StatusBarProps {
  progress: MotionValue<number>;
}

const SEG1_END = 0.45;
const SEG2_END = 0.9;

function segFill(progress: number, start: number, end: number): number {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

const BAR = "h-[3px] flex-1 rounded-full overflow-hidden bg-[#dde4ef] dark:bg-[#1e293b]";
const FILL = "h-full rounded-full bg-[#E8402A]";
import { memo } from "react";

export default memo(function StatusBar({ progress }: StatusBarProps) {
  const p1Width = useTransform(progress, p => `${segFill(p, 0, SEG1_END) * 100}%`);
  const p2Width = useTransform(progress, p => `${segFill(p, SEG1_END, SEG2_END) * 100}%`);
  const p3Width = useTransform(progress, p => `${segFill(p, SEG2_END, 1) * 100}%`);

  return (
    <div className="flex items-center gap-1 my-2.5">
      <div className={BAR}>
        <motion.div
          className={FILL}
          style={{ width: p1Width }}
        />
      </div>

      <span className="text-base leading-none">🍴</span>

      <div className={BAR}>
        <motion.div
          className={FILL}
          style={{ width: p2Width }}
        />
      </div>

      <span className="text-base leading-none">🚗</span>

      <div className={BAR}>
        <motion.div
          className={FILL}
          style={{ width: p3Width }}
        />
      </div>

      <span className="text-base leading-none">🏠</span>
    </div>
  );
});
