"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface WaveProps {
  className?: string;
  quality?: string;
}

export const Waves: React.FC<WaveProps> = ({ className = "", quality = "high" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let resizeTimeout: NodeJS.Timeout;

    const updateDimensions = (forceBufferReset = false) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const maxDpr = quality === "low" ? 1 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      if (forceBufferReset || Math.abs(sizeRef.current.w - width) > 100) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      sizeRef.current = { w: width, h: height };
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const drawRibbon = (offset: number, color: string, width: number, speed: number, opacity: number) => {
      const { w, h } = sizeRef.current;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.globalAlpha = opacity;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.moveTo(-50, h / 2);

      const step = quality === "low" ? 60 : 30;

      for (let x = -50; x < w + 100; x += step) {
        const y =
          h / 2 +
          Math.sin(x * 0.0008 + timeRef.current * speed + offset) * (h * 0.2) +
          Math.sin(x * 0.0015 + timeRef.current * speed) * 40;
        ctx.lineTo(x, y);
      }

      ctx.stroke();
      ctx.restore();
    };

    const animate = (timestamp: number) => {
      const delta = timestamp - lastTime;
      lastTime = timestamp;
      const dt = Math.min(delta, 32);
      timeRef.current += dt * 0.2;

      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const isDark = resolvedTheme === "dark";

      const ribbons = isDark
        ? [
            { offset: 1.0, color: "#0284c7", width: 22, speed: 0.004, opacity: 0.4 },
            { offset: 1.25, color: "#10b981", width: 12, speed: 0.005, opacity: 0.65 },
            { offset: 1.5, color: "#34d399", width: 5, speed: 0.006, opacity: 0.85 }
          ]
        : [
            { offset: 1.0, color: "#10b981", width: 22, speed: 0.004, opacity: 0.55 },
            { offset: 1.25, color: "#059669", width: 12, speed: 0.005, opacity: 0.7 },
            { offset: 1.5, color: "#047857", width: 5, speed: 0.006, opacity: 0.85 }
          ];

      for (let i = 0; i < ribbons.length; i++) {
        const r = ribbons[i];
        drawRibbon(r.offset, r.color, r.width, r.speed, r.opacity);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    updateDimensions(true);
    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      updateDimensions(false);
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => updateDimensions(true), 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
    };
  }, [mounted, resolvedTheme, quality]);

  if (!mounted) return null;

  return <canvas ref={canvasRef} className={`fixed inset-0 z-20 pointer-events-none ${className}`} />;
};
