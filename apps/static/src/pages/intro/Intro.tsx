"use client";

import {motion, useTransform, useScroll} from "framer-motion";
import {useRef} from "react";
import Link from "next/link";
import Logo from "@/shared/ui/logo";

export default function Intro() {
    const containerRef = useRef(null);
    const {scrollYProgress: headlineScroll} = useScroll({
        target: containerRef,
        offset: ['start end', 'center center']
    });

    const underlineWidth = useTransform(headlineScroll, [0, 1], ['0%', '100%'])

    return (
        <div className='max-w-5xl mx-auto px-4 xs:px-6 mb-32 md:mb-60' ref={containerRef}>
            <h1 className='text-3xl xs:text-4xl md:text-5xl flex flex-col gap-2 xs:gap-4 font-semibold text-center mb-16 md:mb-24 relative'>
                What Are You Looking For?
                <span className="relative text-4xl xs:text-5xl md:text-6xl inline-block bg-linear-to-r from-green-600 to-lime-300 bg-clip-text text-transparent pb-4 leading-tight">
                    We Got The Answer To Everything.
                    <motion.div
                        style={{ width: underlineWidth }}
                        className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-green-500 to-lime-300 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                    />
                </span>
            </h1>

            <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-10 md:gap-16">
                <div className="group flex flex-col items-center sm:items-start">
                    <p className="text-[10px] xs:text-xs font-mono text-slate-500 mb-2">
                        Softwares
                    </p>
                    <div className='flex items-center gap-1.5'>
                        <Logo/>
                        <span className='font-black tracking-tighter text-xl xs:text-2xl text-slate-900 dark:text-white'>
                            Atlas
                        </span>
                    </div>
                </div>

                <div className="group flex flex-col items-center sm:items-start">
                    <p className="text-[10px] xs:text-xs font-mono text-slate-500 mb-2">
                        Hardware
                    </p>
                    <div className='flex items-center gap-1.5'>
                        <div className='grayscale-100'>
                            <Logo/>
                        </div>

                        <span className='font-black tracking-tighter text-xl xs:text-2xl text-slate-900 dark:text-white'>
                            Business
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}