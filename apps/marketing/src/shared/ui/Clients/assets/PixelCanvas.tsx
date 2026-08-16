"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPixel, Pixel } from "./Pixel";

type PixelCanvasProps = {
	colors: string[];
	gap?: number;
	speed?: number;
};

export function PixelCanvas({ colors, gap = 5, speed = 30 }: PixelCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const wrapRef = useRef<HTMLDivElement>(null);
	const pixelsRef = useRef<Pixel[]>([]);
	const animationRef = useRef<number>(0);
	const lastFrameRef = useRef(performance.now());
	const reducedMotionRef = useRef(false);

	const init = useCallback(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const rect = wrap.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;
		const w = Math.floor(rect.width);
		const h = Math.floor(rect.height);

		canvas.width = w * dpr;
		canvas.height = h * dpr;
		canvas.style.width = `${w}px`;
		canvas.style.height = `${h}px`;

		ctx.scale(dpr, dpr);

		const effectiveSpeed = reducedMotionRef.current ? 0 : Math.min(speed, 100) * 0.001;
		const pixels: Pixel[] = [];

		for (let x = 0; x < w; x += gap) {
			for (let y = 0; y < h; y += gap) {
				const color = colors[Math.floor(Math.random() * colors.length)];
				const dx = x - w / 2;
				const dy = y - h / 2;
				const delay = reducedMotionRef.current ? 0 : Math.sqrt(dx * dx + dy * dy);
				pixels.push(createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay));
			}
		}

		pixelsRef.current = pixels;
	}, [colors, gap, speed]);

	const animate = useCallback((mode: "appear" | "disappear") => {
		cancelAnimationFrame(animationRef.current);
		const frameInterval = 1000 / 60;

		const loop = () => {
			animationRef.current = requestAnimationFrame(loop);

			const now = performance.now();
			const elapsed = now - lastFrameRef.current;
			if (elapsed < frameInterval) return;
			lastFrameRef.current = now - (elapsed % frameInterval);

			const canvas = canvasRef.current;
			const ctx = canvas?.getContext("2d");
			if (!canvas || !ctx) return;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const pixels = pixelsRef.current;
			for (const pixel of pixels) pixel[mode]();

			if (pixels.every((p) => p.isIdle)) {
				cancelAnimationFrame(animationRef.current);
			}
		};

		animationRef.current = requestAnimationFrame(loop);
	}, []);

	useEffect(() => {
		reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		init();

		const resizeObserver = new ResizeObserver(() => init());
		if (wrapRef.current) resizeObserver.observe(wrapRef.current);

		const card = wrapRef.current?.parentElement;
		const handleEnter = () => animate("appear");
		const handleLeave = () => animate("disappear");
		card?.addEventListener("mouseenter", handleEnter);
		card?.addEventListener("mouseleave", handleLeave);

		return () => {
			resizeObserver.disconnect();
			cancelAnimationFrame(animationRef.current);
			card?.removeEventListener("mouseenter", handleEnter);
			card?.removeEventListener("mouseleave", handleLeave);
		};
	}, [init, animate]);

	return (
		<div ref={wrapRef} className="absolute inset-0 w-full h-full overflow-hidden">
			<canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
		</div>
	);
}