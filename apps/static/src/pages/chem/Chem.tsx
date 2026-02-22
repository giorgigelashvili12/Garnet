"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Garnet from "@/widgets/garnet/Garnet";

import { Atom } from "@/shared/ui/atom";
import { motion, AnimatePresence } from "framer-motion";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/shared/ui/hover-card";

export default function Chem() {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const products = [
        {
            name: "Silicon",
            atom: "Si",
            electrons: 14,
            fields: 3,
            color: "#059669",
            position: { top: "20%", left: "10%" },
            content: (
                <div className="flex flex-col gap-1 text-left">
                    <span className="font-semibold text-xl text-slate-900 dark:text-white">Payments</span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        Sell your products digitally, globally. Leave the rest for{" "}
                        <span className="text-emerald-500 font-medium">Garnet</span> to handle.
                    </span>
                    <Link href="" className="underline hover:text-emerald-600 transition-all">
                        Read About Payments
                    </Link>
                </div>
            ),
        },
        {
            name: "Oxygen",
            atom: "O",
            electrons: 8,
            fields: 2,
            color: "#0284c7",
            position: { top: "20%", right: "10%" },
            content: (
                <div className="flex flex-col gap-1 text-left">
                    <span className="font-semibold text-xl text-slate-900 dark:text-white">Money Management</span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        Exact tool designed to manage money with Financial Accounts.
                    </span>
                    <Link href="" className="underline hover:text-emerald-600 transition-all">
                        Read About Money Management
                    </Link>
                </div>
            ),
        },
        {
            name: "Chromium",
            atom: "Cr",
            electrons: 24,
            fields: 4,
            color: "#ca8a04",
            position: { bottom: "20%", left: "8%" },
            content: (
                <div className="flex flex-col gap-1 text-left">
                    <span className="font-semibold text-xl text-slate-900 dark:text-white">Marketplaces</span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        Designed to orchestrate identity verification and complex
                        multi-party payments.
                    </span>
                    <Link href="" className="underline hover:text-emerald-600 transition-all">
                        Read About Marketplaces
                    </Link>
                </div>
            ),
        },
        {
            name: "Manganese",
            atom: "Mn",
            electrons: 25,
            fields: 4,
            color: "#9333ea",
            position: { bottom: "20%", right: "8%" },
            content: (
                <div className="flex flex-col gap-1 text-left">
                    <span className="font-semibold text-xl text-slate-900 dark:text-white">Revenue Growth</span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        Launch fast and improve revenue capture with billing software&#39;s.
                    </span>
                    <Link href="" className="underline hover:text-emerald-600 transition-all">
                        Read About Revenue Growth
                    </Link>
                </div>
            ),
        },
        {
            name: "Aluminum",
            atom: "Al",
            electrons: 13,
            fields: 3,
            color: "#78716c",
            position: { top: "5%", left: "50%", transform: "translateX(-50%)" },
            content: (
                <div className="flex flex-col gap-1 text-left">
                    <span className="font-semibold text-xl text-slate-900 dark:text-white">Hardware</span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        Grow your business locally, make your name rule the streets.
                    </span>
                    <Link href="" className="underline hover:text-emerald-600 transition-all">
                        Read About Hardware
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div className='bg-background dark:bg-(--base-dark) text-foreground py-16 md:py-32 px-6 overflow-hidden'>
            <div className='text-center space-y-4 max-w-4xl mx-auto mb-12'>
                <h1 className='text-3xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white'>
                    From the <span className='text-emerald-500'>Element</span>, the{' '}
                    <span className='bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent'>
                    Universe
                </span>
                </h1>

                <p className='text-base md:text-2xl text-slate-500 dark:text-slate-400'>
                    The molecular structure of a modern business.
                </p>
            </div>

            <div className={`relative ${isMobile ? 'h-80' : 'min-h-screen'} w-full flex items-center justify-center`}>
                <div
                    className={`absolute inset-0 z-0 flex items-center justify-center ${!isMobile ? 'cursor-pointer' : ''}`}
                    onClick={() => !isMobile && setOpen(!open)}
                >
                    <div className="w-full h-full max-w-2xl">
                        <Garnet/>
                    </div>
                </div>

                {!isMobile && (
                    <AnimatePresence>
                        {open && products.map((item, i) => (
                            <motion.div
                                key={item.name}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 120, damping: 12, delay: i * 0.05 }}
                                className='absolute z-50 pointer-events-auto'
                                style={item.position}
                            >
                                <HoverCard openDelay={0} closeDelay={100}>
                                    <HoverCardTrigger asChild>
                                        <motion.div whileHover={{ scale: 1.1 }} className='flex flex-col items-center gap-4 cursor-pointer group'>
                                            <div className='scale-200'>
                                                <Atom symbol={item.atom} electrons={item.electrons} fields={item.fields} color={item.color} className='drop-shadow-lg'/>
                                            </div>
                                            <span className='text-[10px] font-mono tracking-[0.2em] text-slate-500 dark:text-slate-300 font-bold bg-white/5 px-2 py-1 rounded backdrop-blur-md'>
                                                {item.name}
                                            </span>
                                        </motion.div>
                                    </HoverCardTrigger>
                                    <HoverCardContent side='top' align='center' sideOffset={15} className='z-100 p-0 border-none bg-transparent shadow-none w-70'>
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-2xl backdrop-blur-xl bg-opacity-95 dark:bg-opacity-90">
                                            {item.content}
                                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-800" />
                                        </motion.div>
                                    </HoverCardContent>
                                </HoverCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}

                {!isMobile && !open && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-10 text-xs font-mono uppercase tracking-widest text-slate-400 animate-pulse pointer-events-none">
                        Click core to expand structure
                    </motion.div>
                )}
            </div>

            {isMobile && (
                <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="grid grid-cols-1 gap-6">
                        {products.map((item) => (
                            <div key={item.name} className="p-6 rounded-2xl bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg" style={{ backgroundColor: item.color }}>
                                        {item.atom}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.name}</h3>
                                </div>
                                {item.content}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}