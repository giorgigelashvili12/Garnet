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
        <div className='max-w-5xl mx-auto px-6 mb-60' ref={containerRef}>
            <h1 className='text-5xl md:text-5xl flex flex-col gap-4 font-semibold text-center mb-24 relative'>
                What Are You Looking For?
                <span className="relative text-6xl inline-block bg-linear-to-r from-green-600 to-lime-300 bg-clip-text text-transparent pb-4">
                    We Got The Answer To Everything.
                    <motion.div style={{ width: underlineWidth }} className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-green-500 to-lime-300 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"/>
                </span>
            </h1>

            <div className="flex flex-col md:flex-row justify-center gap-16">
                <div className="group">
                    <p className="text-xs font-mono text-slate-500 mb-2 ">
                        Softwares
                    </p>
                    <div className='flex items-center gap-1.5'>
                        <Logo/>
                        <span className='font-black tracking-tighter text-2xl text-slate-900 dark:text-white'>
                            Atlas
                        </span>
                    </div>
                </div>

                <div className="group">
                    <p className="text-xs font-mono text-slate-500 mb-2 ">
                        Hardware
                    </p>
                    <div className='flex items-center gap-1.5'>
                        <div className='grayscale-100'>
                            <Logo/>
                        </div>

                        <span className='font-black tracking-tighter text-2xl text-slate-900 dark:text-white'>
                            Business
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}