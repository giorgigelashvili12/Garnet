"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export const SilkWaves: React.FC<{ className?: string }> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const timeRef = useRef(0);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", {
            alpha: true,
            desynchronized: true
        });
        if (!ctx) return;

        let w: number, h: number;
        let animationFrameId: number;
        let dpr = 1;

        const init = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;

            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;

            ctx.scale(dpr, dpr);
        };

        const drawRibbon = (
            offset: number,
            color: string,
            width: number,
            speed: number,
            opacity: number,
        ) => {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.globalAlpha = opacity;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            ctx.moveTo(-20, h / 2);

            for (let x = 0; x < w + 40; x += 25) {
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
            timeRef.current = timestamp * 0.2;

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

        init();
        window.addEventListener("resize", init);
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", init);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mounted, resolvedTheme]);

    if (!mounted) return <div className="fixed inset-0 bg-background -z-10" />;

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 -z-10 pointer-events-none ${className || ""} block`}
        />
    );
};