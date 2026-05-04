"use client";

import { memo } from "react";
import dynamic from "next/dynamic";

const FloatingChips = dynamic(() => import("./FloatingChips"), { ssr: false });
const PhoneFrame = dynamic(() => import("./PhoneFrame"), { ssr: false });
import { useDeviceClass } from "../libs/useDeviceClass";

interface DeliverySceneProps {
  stageIdx: number;
}

export default memo(function DeliveryScene({ stageIdx }: DeliverySceneProps) {
  const { deviceClass, prefersReducedMotion } = useDeviceClass();

  return (
    <div className="relative flex items-center justify-center w-full max-w-[580px] mx-auto">
      <FloatingChips stageIdx={stageIdx} deviceClass={deviceClass} />

      <PhoneFrame
        stageIdx={stageIdx}
        deviceClass={deviceClass}
        prefersReducedMotion={prefersReducedMotion}
      />
    </div>
  );
});
