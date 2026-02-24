"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ChevronRight, TrendingUp, Globe } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const POS = dynamic(() => import('@/shared/widgets/POS'), { ssr: false });
const Terminal = dynamic(() => import('@/shared/widgets/Terminal'), { ssr: false });
const FraudChart = dynamic(() => import('@/shared/widgets/charts/FraudChart'), {ssr: false});
const AuthChart = dynamic(() => import('@/shared/widgets/charts/AuthChart'), {ssr: false});
const AccountList = dynamic(() => import('@/shared/widgets/charts/AccountList'), {ssr: false});

export default function PaymentPopup({ onClose }: { onClose: () => void }) {
    const [isReady, setReady] = useState(false);
    const [showWidget, setShowWidget] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const readyTimer = setTimeout(() => setReady(true), 400);
        const widgetTimer = setTimeout(() => setShowWidget(true), 800);
        return () => {
            document.body.style.overflow = 'unset';
            clearTimeout(readyTimer);
            clearTimeout(widgetTimer);
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
                                        Accept payments globally online, simplify your checkout experience.
                                    </span>
                                    <p className="text-sm md:text-lg font-normal tracking-tighter text-slate-600 dark:text-zinc-400 block max-w-2xl leading-snug">
                                        Expand to new markets, increase acceptance rates and deal with fraud. Using integrated tools, accept payments everywhere, anytime.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                        <Link href="/payments" className="flex justify-center text-white px-5 py-2.5 bg-emerald-500 border border-emerald-500 items-center gap-1 font-bold text-sm transition-all rounded-lg hover:bg-transparent hover:text-emerald-400">
                                            Payments <ChevronRight className="size-4" />
                                        </Link>
                                        <Link href="/payments" className="flex justify-center text-emerald-500 dark:text-emerald-400 px-5 py-2.5 bg-transparent border border-emerald-500 items-center gap-1 font-bold text-sm transition-all rounded-lg hover:bg-emerald-500 hover:text-white">
                                            About Pricing <ChevronRight className="size-4" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                                    <div className="py-10 md:py-20 bg-slate-50 dark:bg-zinc-900/50 relative flex justify-center items-center overflow-hidden w-full lg:w-150 rounded-3xl md:rounded-4xl border border-slate-100 dark:border-white/5">
                                        <div className="relative z-10 scale-75 md:scale-90">
                                            <POS />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-6 md:gap-10 flex-1 w-full">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2.5 border rounded-md transition-colors bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400 shrink-0">
                                                <Globe size={20} />
                                            </div>
                                            <p className="text-sm md:text-base text-slate-600 dark:text-zinc-300">
                                                Increase conversion possibilities with pre-made payment UIs and 3 supported payment methods.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="p-2.5 border rounded-md transition-colors bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400 shrink-0">
                                                <TrendingUp size={20} />
                                            </div>
                                            <p className="text-sm md:text-base text-slate-600 dark:text-zinc-300">
                                                Optimize the speed of payments globally with intelligent tools, fraud prevention and intelligence.
                                            </p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-zinc-900/50 p-2 md:p-5 relative overflow-hidden flex flex-col items-center rounded-3xl md:rounded-4xl border border-slate-100 dark:border-white/5 w-full min-h-25">
                                            <div className='scale-100 py-4.5'>
                                                <AccountList/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {showWidget ? (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 md:mt-10">
                                        <span className="text-xl md:text-3xl font-normal tracking-tighter text-slate-900 dark:text-white block mb-6 md:mb-8">Explore more about Payments</span>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                            <div className="flex flex-col gap-4">
                                                <div className="bg-stone-100 dark:bg-zinc-900 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                                    <div className="scale-60 md:scale-80 w-100">
                                                        <FraudChart/>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-zinc-400">Identify activities and catch fraud in real-time. With models and tools built by Garnet, you can let legitimate customers in.</p>
                                                <Link href="/lens" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                                    Read About Garnet Lens <ChevronRight className="size-4" />
                                                </Link>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <div className="bg-stone-100 dark:bg-zinc-900 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                                    <div className="scale-80 md:scale-100 w-100 flex items-center justify-center">
                                                        <AuthChart/>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-zinc-400">Boost revenue and reduce costs, with all this, increase your authorization acceptance rates.</p>
                                                <Link href="/authorization" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                                    Read About Authorization <ChevronRight className="size-4" />
                                                </Link>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <div className="bg-stone-100 dark:bg-zinc-900 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                                    <div className="scale-50 md:scale-60 transition-transform">
                                                        <Terminal />
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-zinc-400">Manage payments online and globally, implement supported and popular payment methods.</p>
                                                <Link href="/terminal" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                                    Read About Terminal <ChevronRight className="size-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="h-48 w-full border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl flex items-center justify-center text-slate-400">
                                        Loading additional modules...
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
    );
}

function FeatureItem({ title, link, desc }: { title: string, link: string, desc: string }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="bg-stone-100 dark:bg-zinc-900 rounded-3xl p-6 md:p-10 flex justify-center items-center h-64 md:h-84 text-slate-400 italic">
                {title} Graphic
            </div>
            <p className="text-sm text-slate-600 dark:text-zinc-400">{desc}</p>
            <Link href={link} className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                Read About {title} <ChevronRight className="size-4" />
            </Link>
        </div>
    );
}