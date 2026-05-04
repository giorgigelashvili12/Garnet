"use client";

import { useEffect, useState } from "react";
import { useDict } from "@/shared/hooks/useDict";
import { motion } from "framer-motion";
import { X, ArrowUpRight, CreditCard, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import Browser from "@/shared/ui/browser";
import { Site } from "./components/Site";
import { UCP } from "@/shared/widgets/agent-commerce/UCP";
import { SmartKit } from "@/shared/widgets/agent-commerce/SmartKit";
import { AgenticGuard } from "@/shared/widgets/agent-commerce/AgenticGuard";

export function AgentCommercePopup({onClose}: {onClose: () => void}) {
    const [isReady, setReady] = useState(false);
    const [showWidget, setShowWidget] = useState(false);

    const dict = useDict();
    const popup = dict.charts.AgentCommerce.popup;
    const web = dict.extra.site_url;

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setReady(true);
            setShowWidget(true);
        }, 100);

        return () => {
            document.body.style.overflow = originalOverflow;
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className='fixed inset-0 z-100 flex md:top-17 items-center justify-center p-2 md:p-12'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className='absolute inset-0 bg-black/60 backdrop-blur-md' />

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="relative w-full max-w-7xl h-[95vh] md:h-[90vh] bg-white/95 dark:bg-zinc-950/90 rounded-4xl md:rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col">
                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-120">
                    <button onClick={onClose} className="p-2 md:p-3 cursor-pointer rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-95 shadow-lg">
                        <X size={20} className="md:size-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-10 pt-16 md:pt-16 scrollbar-hide">
                    <div className="flex flex-col gap-8 md:gap-10">
                        {isReady ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8 md:gap-10">
                                <div className="space-y-4">
                                    <span className="text-2xl md:text-4xl font-normal tracking-tighter text-slate-900 dark:text-white block max-w-2xl leading-tight">
                                        {popup.title}
                                    </span>

                                    <p className="text-sm md:text-lg font-normal tracking-tighter text-slate-600 dark:text-zinc-400 block max-w-2xl leading-snug">
                                        {popup.desc}
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                        <Link href="/payments" className="flex justify-center text-white px-5 py-2.5 bg-emerald-500 border border-emerald-500 items-center gap-1 font-bold text-sm transition-all rounded-lg hover:bg-transparent hover:text-emerald-400">
                                            {popup.link1} <ChevronRight className="size-4" />
                                        </Link>
                                        <Link href="/payments" className="flex justify-center text-emerald-500 dark:text-emerald-400 px-5 py-2.5 bg-transparent border border-emerald-500 items-center gap-1 font-bold text-sm transition-all rounded-lg hover:bg-emerald-500 hover:text-white">
                                            {popup.link2} <ChevronRight className="size-4" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex flex-col min-h-screen justify-center items-center lg:flex-row overflow-hidden bg-slate-50 dark:bg-zinc-900/50 p-4 border border-slate-100 dark:border-white/5">
                                    <div className="h-170 w-full flex justify-center items-center max-w-6xl relative overflow-hidden rounded-4xl md:rounded-[3rem] shadow-2xl">
    
                                        <div className="w-full h-full flex justify-center items-center transition-transform duration-500">
                                            <div className="w-full flex justify-center items-center scale-100 md:scale-95 sm:scale-90 [@media(max-width:630px)]:scale-80 [@media(max-width:330px)]:scale-50">
                                                <Browser url={web}>
                                                    <Site />
                                                </Browser>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {showWidget ? (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 md:mt-10">
                                        <span className="text-xl md:text-3xl font-normal tracking-tighter text-slate-900 dark:text-white block mb-6 md:mb-8">
                                            {popup.more}
                                        </span>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                            <div className="flex flex-col gap-4">
                                                <div className="bg-stone-100 dark:bg-zinc-900/50 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                                    <div className="scale-60 w-100 select-none pointer-events-none">
                                                        <SmartKit/>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-zinc-400">
                                                    {popup.card1.text}
                                                </p>
                                                <Link href="/" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                                    {popup.card1.link} <ChevronRight className="size-4" />
                                                </Link>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <div className="bg-stone-100 dark:bg-zinc-900/50 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                                    <div className="scale-100 flex items-center justify-center">
                                                        <AgenticGuard/>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-zinc-400">
                                                    {popup.card2.text}
                                                </p>
                                                <Link href="/" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                                    {popup.card2.link} <ChevronRight className="size-4" />
                                                </Link>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <div className="bg-stone-100 dark:bg-zinc-900/50 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                                    <div className="scale-50 md:scale-60 transition-transform">
                                                        <UCP/>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-zinc-400">
                                                    {popup.card3.text}
                                                </p>
                                                <Link href="/" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                                    {popup.card3.link} <ChevronRight className="size-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="h-48 w-full border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl flex items-center justify-center text-slate-400">
                                        {dict.payments.popup.loading}
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <div className="flex flex-col gap-10 animate-pulse">
                                <div className="h-12 w-3/4 bg-slate-200 dark:bg-zinc-800 rounded-xl" />
                                <div className="h-64 w-full bg-slate-100 dark:bg-zinc-800/50 rounded-3xl md:rounded-4xl" />
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}