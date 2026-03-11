"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { Atom } from "@/shared/ui/atom";
import { motion, AnimatePresence } from "framer-motion";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/shared/ui/hover-card";
import { Eye, EyeOff } from "lucide-react";
import {useDict} from "@/shared/hooks/useDict";

import Garnet from "@/widgets/garnet/Garnet";
import {useTheme} from "next-themes";

export default function Chem() {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showModel, setShowModel] = useState(true);
    const {resolvedTheme} = useTheme();
    const dict = useDict();

    const crystalPreview = resolvedTheme === 'dark' ? '/preview-2.png' : '/preview-1.png';

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) setShowModel(false);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const products = [
        {
            name: dict.chem.products.silicon.atom,
            atom: "Si",
            electrons: 14,
            fields: 3,
            color: "#059669",
            position: { top: "20%", left: "10%" },
            content: (
                <div className="flex flex-col gap-1 text-left">
                    <span className="font-semibold text-xl text-slate-900 dark:text-white">{dict.chem.products.silicon.title}</span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        {dict.chem.products.silicon.desc}
                    </span>
                    <Link href="" className="underline hover:text-emerald-600 transition-all">
                        {dict.chem.products.silicon.link}
                    </Link>
                </div>
            ),
        },
        {
            name: dict.chem.products.oxygen.atom,
            atom: "O",
            electrons: 8,
            fields: 2,
            color: "#0284c7",
            position: { top: "20%", right: "10%" },
            content: (
                <div className="flex flex-col gap-1 text-left">
                    <span className="font-semibold text-xl text-slate-900 dark:text-white">{dict.chem.products.oxygen.title}</span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        {dict.chem.products.oxygen.desc}
                    </span>
                    <Link href="" className="underline hover:text-emerald-600 transition-all">
                        {dict.chem.products.oxygen.link}
                    </Link>
                </div>
            ),
        },
        {
            name: dict.chem.products.chromium.atom,
            atom: "Cr",
            electrons: 24,
            fields: 4,
            color: "#ca8a04",
            position: { bottom: "20%", left: "8%" },
            content: (
                <div className="flex flex-col gap-1 text-left">
                    <span className="font-semibold text-xl text-slate-900 dark:text-white">{dict.chem.products.chromium.title}</span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        {dict.chem.products.chromium.desc}
                    </span>
                    <Link href="" className="underline hover:text-emerald-600 transition-all">
                        {dict.chem.products.chromium.link}
                    </Link>
                </div>
            ),
        },
        {
            name: dict.chem.products.manganese.atom,
            atom: "Mn",
            electrons: 25,
            fields: 4,
            color: "#9333ea",
            position: { bottom: "20%", right: "8%" },
            content: (
                <div className="flex flex-col gap-1 text-left">
                    <span className="font-semibold text-xl text-slate-900 dark:text-white">{dict.chem.products.manganese.title}</span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        {dict.chem.products.manganese.desc}
                    </span>
                    <Link href="" className="underline hover:text-emerald-600 transition-all">
                        {dict.chem.products.manganese.link}
                    </Link>
                </div>
            ),
        },
        {
            name: dict.chem.products.aluminum.atom,
            atom: "Al",
            electrons: 13,
            fields: 3,
            color: "#78716c",
            position: { top: "5%", left: "48%", transform: "translateX(-50%)" },
            content: (
                <div className="flex flex-col gap-1 text-left">
                    <span className="font-semibold text-xl text-slate-900 dark:text-white">{dict.chem.products.aluminum.title}</span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        {dict.chem.products.aluminum.desc}
                    </span>
                    <Link href="" className="underline hover:text-emerald-600 transition-all">
                        {dict.chem.products.aluminum.link}
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div className='bg-background dark:bg-(--base-dark) text-foreground py-16 md:py-32 px-6 overflow-hidden relative'>

            {!isMobile && (
                <div className="absolute top-95 right-40 z-50">
                    <button onClick={() => setShowModel(!showModel)} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-black dark:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[15px] font-mono tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                        {showModel ? <Eye size={14} /> : <EyeOff size={14} />}
                        {showModel ? "High Quality" : "Performance Mode"}
                    </button>
                </div>
            )}

            <div className='text-center space-y-4 max-w-4xl mx-auto mb-12 relative z-10'>
                <h1 className='text-3xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white'>
                    {dict.chem.titleAssets.one} <span className='text-emerald-500'>{dict.chem.titleAssets.two}</span>, {dict.chem.titleAssets.three}{' '}
                    <span className='bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent'>
                    {dict.chem.titleAssets.four}
                </span>
                </h1>

                <p className='text-base md:text-2xl text-slate-500 dark:text-slate-400'>
                    {dict.chem.subtitle}
                </p>
            </div>

            <div className={`relative ${isMobile ? 'h-80' : 'min-h-screen'} w-full flex items-center justify-center`}>

                {showModel && !isMobile && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000">
                        <div className="w-full h-full min-w-[140vw] md:min-w-full flex items-center justify-center">
                            <Garnet/>
                        </div>
                    </div>
                )}

                {(!showModel || isMobile) && (
                    <Image src={crystalPreview} alt='preview' width={500} height={500}></Image>
                )}

                <div
                    className={`absolute inset-0 z-10 flex items-center justify-center ${!isMobile ? 'cursor-pointer' : ''}`}
                    onClick={() => !isMobile && setOpen(!open)}
                />

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

            {isMobile && (
                <div className="mt-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4">
                    <div className="grid grid-cols-1 gap-16">
                        {products.map((item) => (
                            <div key={item.name} className="relative p-6 rounded-4xl bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm">
                                <div className="absolute -top-6 right-4 sm:right-8 z-20">
                                    <div className='scale-125 sm:scale-150 md:scale-180 transition-transform duration-500'>
                                        <Atom symbol={item.atom} electrons={item.electrons} fields={item.fields} color={item.color} className='drop-shadow-2xl'/>
                                    </div>
                                </div>

                                <div className="flex items-center mb-5 mt-2 relative z-10">
                                    <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-white shadow-lg" style={{ backgroundColor: item.color }}>
                                        {item.atom}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white pl-4 tracking-tight">
                                        {item.name}
                                    </h3>
                                </div>

                                <div className="text-sm leading-relaxed text-slate-700 dark:text-white/70 relative z-10 pr-8">
                                    {item.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}