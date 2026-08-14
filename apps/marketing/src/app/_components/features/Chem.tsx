import React, { useState } from 'react'
import Crystal from '../assets/Crystal'
import { Atom } from '@/shared/ui/Atom'
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export default function Chem() {
    const [isMobile, setIsMobile] = useState(false);
    const [open, setOpen] = useState(false);

    const products = [
        {
            name: "Sillicon",
            atom: "Si",
            electrons: 14,
            fields: 3,
            color: "#059669",
            position: { top: "20%", left: "20%" },
            content: (
                <div className="flex flex-col gap-1 text-left">
                    <span className="font-semibold text-xl text-slate-900 dark:text-white">Payments</span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        Sell your products digitally, globally. Leave the rest for Garnet to handle.
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
            position: { top: "20%", right: "20%" },
            content: (
                <div className="flex flex-col gap-1 text-left">
                    <span className="font-semibold text-xl text-slate-900 dark:text-white">Finances</span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        Exact tool designed to manage money with Financial Accounts.
                    </span>
                    <Link href="" className="underline hover:text-emerald-600 transition-all">
                        Read About Finances
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
            position: { bottom: "20%", left: "20%" },
            content: (
                <div className="flex flex-col gap-1 text-left">
                    <span className="font-semibold text-xl text-slate-900 dark:text-white">Associations</span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        Designed to orchestrate identity verification and complex multi-party payments.
                    </span>
                    <Link href="" className="underline hover:text-emerald-600 transition-all">
                        Read About Associations
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
            position: { bottom: "20%", right: "20%" },
            content: (
                <div className="flex flex-col gap-1 text-left">
                    <span className="font-semibold text-xl text-slate-900 dark:text-white">Revenue</span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        Launch fast and improve revenue capture with billing software&apos;s
                    </span>
                    <Link href="" className="underline hover:text-emerald-600 transition-all">
                        Read About Revenue
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
            position: { top: "15%", left: "48%", transform: "translateX(-50%)" },
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
        <div className='relative flex flex-col justify-center items-center mt-32 min-h-[600px] w-full'>
            <h1 className='text-3xl md:text-5xl lg:text-6xl font-normal tracking-tighter mb-15'>
                From The <span className='text-green-500'>Element</span>, To The <span className='text-emerald-500'>Universe</span>
            </h1>

            <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer select-none">
                <Crystal className="" />
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
                            <HoverCard>
                                <HoverCardTrigger delay={0} closeDelay={100}>
                                    <motion.div whileHover={{ scale: 1.1 }} className='flex flex-col items-center gap-4 cursor-pointer group'>
                                        <div className='scale-200'>
                                            <Atom symbol={item.atom} electrons={item.electrons} fields={item.fields} color={item.color} className='drop-shadow-lg'/>
                                        </div>
                                        <span className='text-[10px] tracking-[0.2em] text-slate-500 dark:text-slate-300 font-bold bg-white/5 px-2 py-1 rounded backdrop-blur-md'>
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
        </div>
    )
}
