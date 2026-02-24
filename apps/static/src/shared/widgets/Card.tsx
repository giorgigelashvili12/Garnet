"use client";

import {useRef, useState} from "react";
import {useMotionValue, useSpring, useTransform, motion} from "framer-motion";

export function IssuingCard() {
    const ref = useRef<HTMLDivElement | null>(null);

    const x = useMotionValue(0)
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const rotateX = useTransform(xSpring, [-0.5, 0.5], ['15deg', '-15deg']);
    const rotateY = useTransform(ySpring, [-0.5, 0.5], ['15deg', '-15deg']);

    const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if(!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

        x.set(mouseX);
        y.set(mouseY);
    }

    const mouseLeave = () => {
        x.set(0);
        y.set(0);
    }

    return (
        <div className="flex items-center justify-center p-20 perspective-[1000px]" onMouseMove={mouseMove} onMouseLeave={mouseLeave}>
            <motion.div ref={ref} style={{rotateX, rotateY, transformStyle: "preserve-3d",}} className="relative w-80 h-48 rounded-2xl bg-linear-to-br from-emerald-500 to-green-700 p-6 shadow-2xl border border-white/20 overflow-hidden">
                <motion.div style={{transform: "translateZ(50px)", background: "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 80%)",}} className="absolute inset-0 pointer-events-none opacity-50"/>

                <div style={{ transform: "translateZ(75px)" }} className="flex flex-col h-full justify-between relative z-10">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-9 bg-linear-to-br from-yellow-200 to-yellow-500/80 rounded-md shadow-inner" />
                        <div className="text-white/40 italic font-bold text-xl">VISA</div>
                    </div>

                    <div className="space-y-4">
                        <div className="text-white text-xl tracking-[0.2em] font-mono drop-shadow-md">
                            4242 4242 4242
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[8px] uppercase text-white/60 tracking-widest"></p>
                                <p className="text-white text-xs font-bold uppercase tracking-wider"></p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase text-white/60 tracking-widest"></p>
                                <p className="text-white text-xs font-bold uppercase"></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
        </div>
    )
}