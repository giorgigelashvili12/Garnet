"use client";

import {motion, useTransform, useScroll} from "framer-motion";
import {useRef} from "react";
import Logo from "@/shared/components/Logo";

export default function Intro() {
    const containerRef = useRef(null);
    const {scrollYProgress: headlineScroll} = useScroll({
        target: containerRef,
        offset: ['start end', 'center center']
    });

    const underlineWidth = useTransform(headlineScroll, [0, 1], ['0%', '100%'])

    return (
        <div className='max-w-5xl mx-auto px-4 xs:px-6 mb-32 md:mb-60' ref={containerRef}>
            <h1 className='text-3xl md:text-5xl lg:text-6xl font-normal tracking-tighter flex items-center flex-col justify-center mb-15'>
                What Are You Looking For?
                <span className="relative text-4xl xs:text-5xl md:text-6xl inline-block bg-linear-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent pb-4 leading-tight">
                    We Have The Answer For Everything
                    <motion.div style={{ width: underlineWidth }} className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-emerald-400 to-green-400 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"/>
                </span>
            </h1>

            <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-10 md:gap-16">
                <div className="group flex flex-col items-center sm:items-start">
                    <p className="text-[15px] font-medium xs:text-xs text-slate-500 mb-2">
                        Software
                    </p>
                    <div className='flex items-center gap-1.5'>
                        <Logo/>
                        <span className='font-extrabold tracking-tighter text-3xl xs:text-2xl text-slate-900 dark:text-white select-none pointer-events-none'>
                            Atlas
                        </span>
                    </div>
                </div>

                <div className="group flex flex-col items-center sm:items-start">
                    <p className="text-[15px] font-medium xs:text-xs text-slate-500 mb-2">
                        Business
                    </p>
                    <div className='flex items-center gap-1.5'>
                        <div className='grayscale-100'>
                            <Logo/>
                        </div>

                        <span className='font-extrabold tracking-tighter text-3xl xs:text-2xl text-slate-900 dark:text-white select-none pointer-events-none'>
                            Business
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
