"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RECEIPT_ITEMS } from "../libs/delivery";
import type { DeviceClass } from "../libs/useDeviceClass";

interface ReceiptProps {
  visible: boolean;
  deviceClass: DeviceClass;
}

const Receipt = React.memo(function Receipt({ visible, deviceClass }: ReceiptProps) {
  const isMobile = deviceClass === "mobile";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="receipt"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="mt-3 pt-3 border-t border-[#f0f0f0] dark:border-[#2a2f3d]">
            <p className="text-[13px] font-bold text-[#1B2B4B] dark:text-[#e2e8f0] mb-2">
              Order receipt
            </p>

            {RECEIPT_ITEMS.map((item, i) =>
              isMobile ? (
                <div
                  key={item.label}
                  className="flex justify-between text-[12px] text-[#666] dark:text-[#94a3b8] mb-1"
                >
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ) : (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.15 }}
                  className="flex justify-between text-[12px] text-[#666] dark:text-[#94a3b8] mb-1"
                >
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </motion.div>
              )
            )}

            <div className="flex justify-between text-[13px] font-bold text-[#1B2B4B] dark:text-[#e2e8f0] mt-2 pt-2 border-t border-[#f0f0f0] dark:border-[#2a2f3d]">
              <span>Total</span>
              <span>$17.00</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default Receipt;
