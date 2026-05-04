"use client";

import React from "react";

const STAGE_NAMES = [
  "Preparing",
  "Dasher ready",
  "On the way",
  "Approaching",
  "Delivered",
];

interface StageControlsProps {
  current: number;
  onChange: (idx: number) => void;
  onReplay: () => void;
}

const StageControls = React.memo(function StageControls({
  current,
  onChange,
  onReplay,
}: StageControlsProps) {
  return (
    <div className="flex gap-2 justify-center overflow-x-auto max-w-full px-2 py-1 md:flex-wrap md:overflow-x-visible scrollbar-none">
      {STAGE_NAMES.map((name, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={[
            "rounded-full px-4 py-1.5 text-[12px] border-none cursor-pointer",
            "transition-all duration-200 whitespace-nowrap flex-shrink-0",
            current === i
              ? "bg-[#1B2B4B] dark:bg-[#3b82f6] text-white font-bold"
              : "bg-white dark:bg-[#1e293b] text-[#555] dark:text-[#94a3b8] font-normal",
          ].join(" ")}
          style={{
            fontFamily: "sans-serif",
            boxShadow: "0 1px 5px rgba(0,0,0,0.10)",
          }}
        >
          {i + 1}. {name}
        </button>
      ))}
      <button
        onClick={onReplay}
        className="rounded-full px-4 py-1.5 text-[12px] border-none cursor-pointer text-white font-bold whitespace-nowrap flex-shrink-0 bg-[#E8402A] hover:bg-[#d63820] transition-colors duration-200"
        style={{
          fontFamily: "sans-serif",
          boxShadow: "0 1px 5px rgba(0,0,0,0.15)",
        }}
      >
        ↺ Replay
      </button>
    </div>
  );
});

export default StageControls;
