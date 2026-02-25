"use client";

import {motion} from "framer-motion";
import {IssuingCard} from "@/shared/widgets/Card";

export default function IssuingTrigger({onClick}: {onClick?: () => void}) {
    return (
        <button type='button' onClick={e => {e.preventDefault(); onClick?.()}} className='group relative flex h-125 w-full flex-col items-center justify-start overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-12 shadow-sm transition-all duration-500 hover:shadow-xl dark:border-white/5 dark:bg-(--dark-bg) cursor-pointer text-left'>
            <div className='absolute inset-0 pointer-events-none opacity-50 transition-opacity group-hover:opacity-100' style={{background: `radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)`}}/>

            <div className='relative z-20 mb-12 text-center'>
                <h3 className='block max-w-2xl text-3xl font-normal tracking-tighter text-slate-900 dark:text-white'>Create a Card Issuing Program</h3>
                <p className='mt-2 text-sm font-medium text-emerald-500/80 dark:text-emerald-400/80'>All is in your hands</p>
            </div>

            <motion.div
                initial={{ rotateX: 15, rotateY: -20, rotateZ: 10, scale: 1 }}
                whileHover={{
                    rotateX: 10,
                    rotateY: -10,
                    rotateZ: 5,
                    scale: 1.05,
                }}
                whileTap={{
                    scale: 0.98,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                }} transition={{ type: "spring", stiffness: 300, damping: 20 }} style={{ transformStyle: "preserve-3d" }} className="relative z-10 will-change-transform">
                <div className="rounded-3xl shadow-[25px_25px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[25px_25px_60px_-15px_rgba(0,0,0,0.7)]">
                    <IssuingCard />
                </div>

                <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-white/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
            </motion.div>

            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-emerald-500/10 blur-[80px] pointer-events-none" />
        </button>
    )
}