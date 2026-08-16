"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Logo from "@/shared/components/Logo";

export default function Intro() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress: headlineScroll } = useScroll({
		target: containerRef,
		offset: ["start end", "center center"],
	});

	const underlineWidth = useTransform(headlineScroll, [0, 1], ["0%", "100%"]);

	return (
		<div
			className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-32 md:mb-44 lg:mb-60"
			ref={containerRef}
		>
			<h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tighter flex flex-col items-center justify-center text-center mb-10 sm:mb-12 md:mb-16">
				What Are You Looking For?
				<span className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold inline-block bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent pb-3 sm:pb-4 mt-2 leading-tight">
					We Have The Answer For Everything
					<motion.div
						style={{ width: underlineWidth }}
						className="absolute bottom-0 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"
					/>
				</span>
			</h1>

			<div className="flex flex-col justify-center items-center gap-8 max-[950px]:flex-col">
				<div className="group flex flex-col items-center sm:items-start">
					<p className="text-xs sm:text-sm font-medium text-slate-500 mb-1.5 sm:mb-2">
						Software
					</p>
					<div className="flex items-center gap-2">
						<Logo />
						<span className="font-extrabold tracking-tighter text-3xl text-slate-900 dark:text-white select-none pointer-events-none max-[1080px]:text-2xl ">
							Atlas
						</span>
					</div>
				</div>

				<div className="group flex flex-col items-center sm:items-start">
					<p className="text-xs sm:text-sm font-medium text-slate-500 mb-1.5 sm:mb-2">
						Business
					</p>
					<div className="flex items-center gap-2">
						<div className="grayscale">
							<Logo />
						</div>
						<span className="font-extrabold tracking-tighter text-3xl text-slate-900 dark:text-white select-none pointer-events-none max-[1080px]:text-2xl">
							Business
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
