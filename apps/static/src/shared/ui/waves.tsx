"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export const SilkWaves: React.FC<{ className?: string }> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const timeRef = useRef(0);
    const sizeRef = useRef({ w: 0, h: 0, canvasW: 0, canvasH: 0 });
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!mounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
        if (!ctx) return;

        let animationFrameId: number;
        let lastTime = performance.now();

        const initialDpr = Math.min(window.devicePixelRatio || 1, 2);

        const updateDimensions = (forceBufferReset = false) => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const dpr = initialDpr;

            if (forceBufferReset || Math.abs(sizeRef.current.canvasW - width) > 100) {
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                sizeRef.current.canvasW = width;
                sizeRef.current.canvasH = height;
            }

            sizeRef.current.w = width;
            sizeRef.current.h = height;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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
            const step = w > 1200 ? 40 : 25;

            for (let x = -50; x < w + 100; x += step) {
                const y = h / 2 +
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

            const dt = Math.min(delta, 16.7);
            timeRef.current += dt * 0.2;

            const { w, h } = sizeRef.current;
            ctx.clearRect(0, 0, w, h);

            const isDark = resolvedTheme === "dark";
            const ribbonColors = isDark
                ? { back: "#064e3b", mid: "#247ba0", top: "#10b981" }
                : { back: "#d1fae5", mid: "#10b981", top: "#059669" };

            drawRibbon(0, ribbonColors.back, 60, 0.002, 0.15);
            drawRibbon(0.5, ribbonColors.mid, 25, 0.004, 0.25);
            drawRibbon(1.0, ribbonColors.top, 8, 0.006, 0.8);

            animationFrameId = requestAnimationFrame(animate);
        };

        updateDimensions(true);
        animationFrameId = requestAnimationFrame(animate);

        let resizeRaf: number | null = null;

        const handleResize = () => {
            if (resizeRaf) return;

            resizeRaf = requestAnimationFrame(() => {
                updateDimensions(true);
                resizeRaf = null;
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);

            if (resizeRaf !== null) {
                cancelAnimationFrame(resizeRaf);
            }
        };
    }, [mounted, resolvedTheme]);

    if (!mounted) return null;

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 -z-10 pointer-events-none bg-background ${className}`}
            style={{ willChange: 'transform' }}
        />
    );
};