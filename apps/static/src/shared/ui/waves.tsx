"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export const SilkWaves: React.FC<{ className?: string }> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const timeRef = useRef(0);
    const colorState = useRef({ r: 3, g: 10, b: 8 });
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let w: number, h: number;
        let animationFrameId: number;

        const init = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
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

            ctx.moveTo(-50, h / 2);

            for (let x = 0; x < w + 50; x += 10) {
                const y =
                    h / 2 +
                    Math.sin(x * 0.001 + timeRef.current * speed + offset) * (h * 0.25) +
                    Math.sin(x * 0.002 + timeRef.current * speed) * 50;
                ctx.lineTo(x, y);
            }

            ctx.stroke();
            ctx.restore();
        };

        const animate = () => {
            const target =
                resolvedTheme === "dark"
                    ? { r: 3, g: 10, b: 8 }
                    : { r: 255, g: 255, b: 255 };
            const isDark = resolvedTheme === "dark";

            colorState.current.r += (target.r - colorState.current.r) * 0.05;
            colorState.current.g += (target.g - colorState.current.g) * 0.05;
            colorState.current.b += (target.b - colorState.current.b) * 0.05;

            const { r, g, b } = colorState.current;

            ctx.clearRect(0, 0, w, h);

            const primaryGreen = resolvedTheme === "dark" ? "#00ff41" : "#10b981";
            const ribbonColors = isDark
                ? {
                    back: "#007f5f",
                    mid: "#247ba0",
                    top: "#57cc99",
                }
                : {
                    back: "#d1fae5",
                    mid: "#10b981",
                    top: "#059669",
                };

            drawRibbon(0, ribbonColors.back, 80, 0.001, 0.1);
            drawRibbon(0.5, ribbonColors.mid, 30, 0.003, 0.2);
            drawRibbon(1.0, ribbonColors.top, 12, 0.005, 0.9);

            timeRef.current += 2;
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        window.addEventListener("resize", init);
        animate();

        return () => {
            window.removeEventListener("resize", init);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mounted, resolvedTheme]);

    if (!mounted) return <div className="fixed inset-0 bg-(--background) -z-10" />;

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 -z-10 ${className || ""} block`}
        />
    );
};
