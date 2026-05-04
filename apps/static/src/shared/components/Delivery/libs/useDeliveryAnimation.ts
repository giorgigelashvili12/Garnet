"use client";

import { useEffect, useRef, useState } from "react";
import { STAGES, TOTAL_LENGTH } from "../libs/delivery";
import { animate, useMotionValue, MotionValue } from "framer-motion";
import type { DeviceClass } from "./useDeviceClass";

interface AnimationState {
  routeT: MotionValue<number>;
  dasherT: MotionValue<number>;
  dasherVisible: boolean;
  showReceipt: boolean;
  status: string;
  sub: string;
}

const SPEED: Record<DeviceClass, number> = {
  desktop: 0.09,
  mobile: 0.14,
};

export function useDeliveryAnimation(
  targetStageId: number,
  deviceClass: DeviceClass = "desktop",
  prefersReducedMotion = false
): AnimationState {
  const routeT = useMotionValue(0);
  const dasherT = useMotionValue(0);
  const [dasherVisible, setDasherVisible] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [status, setStatus]       = useState(STAGES[0].status);
  const [sub, setSub]             = useState(STAGES[0].sub);

  const prevStageRef = useRef(0);

  const routeTRef = useRef(routeT);
  const dasherTRef = useRef(dasherT);

  useEffect(() => {
    const rt = routeTRef.current;
    const dt = dasherTRef.current;
    const target = STAGES[targetStageId];
    const fromT  = rt.get();
    const toT    = target.routeT;

    setStatus(target.status);
    setSub(target.sub);
    setShowReceipt(target.showReceipt);
    setDasherVisible(target.showDasher);

    if (targetStageId === 0) {
      rt.set(0);
      dt.set(0);
      prevStageRef.current = 0;
      return;
    }

    if (targetStageId === 1 && prevStageRef.current === 0) {
      dt.set(0);
      prevStageRef.current = 1;
      return;
    }

    if (toT === fromT) {
      if (target.showDasher) dt.set(toT);
      prevStageRef.current = targetStageId;
      return;
    }

    if (prefersReducedMotion) {
      rt.set(toT);
      if (target.showDasher) dt.set(toT);
      prevStageRef.current = targetStageId;
      return;
    }

    const pixelDist = Math.abs(toT - fromT) * TOTAL_LENGTH;
    const speedPxPerMs = SPEED[deviceClass];
    const durationSec = (pixelDist / speedPxPerMs) / 1000;

    const animRoute = animate(rt, toT, { duration: durationSec, ease: "easeInOut" });
    const animDasher = target.showDasher
      ? animate(dt, toT, { duration: durationSec, ease: "easeInOut" })
      : null;

    prevStageRef.current = targetStageId;

    return () => {
      animRoute.stop();
      if (animDasher) animDasher.stop();
    };
  }, [targetStageId, deviceClass, prefersReducedMotion]);

  return { routeT, dasherT, dasherVisible, showReceipt, status, sub };
}
