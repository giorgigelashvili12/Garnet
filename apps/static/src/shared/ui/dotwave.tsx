"use client";

import { useEffect, useRef } from "react";

import {DotWaveProps} from "@/shared/lib/@types";

export default function DotWave({color = "#10b981", opacity = 0.2, dotSize = 2}: DotWaveProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let width: number, height: number, count = 0;
        const dpr = Math.min(window.devicePixelRatio, 1.25);

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            const gap = width < 768 ? 50 : 35;

            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;

            for (let x = 0; x < width; x += gap) {
                for (let y = 0; y < height; y += gap) {
                    const z = Math.sin(x * 0.02 + count) * 15 +
                        Math.sin(y * 0.02 + count) * 15;

                    ctx.beginPath();
                    ctx.arc(x, y + z, dotSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            count += 0.02;
            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        resize();
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [color, opacity, dotSize]);

    return (
        <div
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
            style={{
                maskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
            }}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-60"
            />
        </div>
    );
}