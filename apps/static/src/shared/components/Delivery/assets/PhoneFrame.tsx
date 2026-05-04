"use client";

import { useEffect, useState, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), { ssr: false });
const Receipt = dynamic(() => import("./Receipt"), { ssr: false });
const StatusBar = dynamic(() => import("./StatusBar"), { ssr: false });
import { useDeliveryAnimation } from "../libs/useDeliveryAnimation";
import type { DeviceClass } from "../libs/useDeviceClass";

interface PhoneFrameProps {
  stageIdx: number;
  deviceClass: DeviceClass;
  prefersReducedMotion: boolean;
}

function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const el = document.documentElement;
    setIsDark(el.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(el.classList.contains("dark"));
    });
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

export default memo(function PhoneFrame({ stageIdx, deviceClass, prefersReducedMotion }: PhoneFrameProps) {
  const { routeT, dasherT, dasherVisible, showReceipt, status, sub } =
    useDeliveryAnimation(stageIdx, deviceClass, prefersReducedMotion);

  const isDelivered = stageIdx === 4;
  const isDark = useIsDark();

  return (
    <div
      className="bg-white dark:bg-[#161b27] overflow-hidden flex-shrink-0 w-full max-w-[280px] md:w-[280px]"
      style={{
        borderRadius: 40,
        boxShadow: isDark
          ? "0 24px 72px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(255,255,255,0.06)"
          : "0 24px 72px rgba(0,0,0,0.22), 0 0 0 1.5px rgba(0,0,0,0.08)",
        contain: "content",
      }}
    >
      <div className="py-3 text-center border-b border-[#f5f5f5] dark:border-[#2a2f3d]">
        <span
          className="text-[13px] font-black tracking-[0.14em] text-[#E8402A]"
          style={{ fontFamily: "sans-serif" }}
        >
          ◀ DOORDASH
        </span>
      </div>

      <MapView
        routeT={routeT}
        dasherT={dasherT}
        dasherVisible={dasherVisible}
        showPriceTag={stageIdx >= 1}
        deviceClass={deviceClass}
        isDark={isDark}
      />

      <div className="px-4 pt-3 pb-5">
        <div className="flex items-center gap-1.5 mb-0.5">
          <motion.div
            animate={{ backgroundColor: isDelivered ? "#4CAF50" : "#2196F3" }}
            transition={{ duration: 0.4 }}
            className="w-2 h-2 rounded-full flex-shrink-0"
          />
          <AnimatePresence mode="wait">
            <motion.p
              key={status}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-[15px] font-bold text-[#1B2B4B] dark:text-[#e2e8f0]"
              style={{ fontFamily: "sans-serif" }}
            >
              {status}
            </motion.p>
          </AnimatePresence>
        </div>

        <p
          className="text-[12px] text-[#888] dark:text-[#94a3b8] mb-0"
          style={{ fontFamily: "sans-serif" }}
        >
          {sub}
        </p>

        <StatusBar progress={routeT} />

        <p
          className="text-[11px] text-[#aaa] dark:text-[#475569]"
          style={{ fontFamily: "sans-serif" }}
        >
          Delivery by 6:45 PM · Apple Pay · $17.00
        </p>

        <Receipt visible={showReceipt} deviceClass={deviceClass} />
      </div>
    </div>
  );
});
