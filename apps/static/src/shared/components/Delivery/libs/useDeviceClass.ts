"use client";

import { useEffect, useState } from "react";

export type DeviceClass = "mobile" | "desktop";

interface DeviceInfo {
  deviceClass: DeviceClass;
  prefersReducedMotion: boolean;
}

const MOBILE_BREAKPOINT = 768;

export function useDeviceClass(): DeviceInfo {
  const [deviceClass, setDeviceClass] = useState<DeviceClass>(() => {
    if (typeof window === "undefined") return "desktop";
    return window.innerWidth <= MOBILE_BREAKPOINT ? "mobile" : "desktop";
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mqSize = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onSize = (e: MediaQueryListEvent) =>
      setDeviceClass(e.matches ? "mobile" : "desktop");
    const onMotion = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);

    mqSize.addEventListener("change", onSize);
    mqMotion.addEventListener("change", onMotion);

    setDeviceClass(mqSize.matches ? "mobile" : "desktop");
    setPrefersReducedMotion(mqMotion.matches);

    return () => {
      mqSize.removeEventListener("change", onSize);
      mqMotion.removeEventListener("change", onMotion);
    };
  }, []);

  return { deviceClass, prefersReducedMotion };
}
