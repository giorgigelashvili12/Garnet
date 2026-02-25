"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X, CreditCard, ArrowLeftRight, Wallet, ChevronRight } from "lucide-react";
import Logo from "@/shared/ui/logo";
import Link from "next/link";
import FeatureItem from "@/shared/ui/FeatureItem";
import LoadingSkeleton from "@/shared/ui/LoadingSkeleton";

export default function IssuingPopup({ onClose }: { onClose: () => void }) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";
        const timer = setTimeout(() => setIsReady(true), 150);
        return () => {
            document.body.style.overflow = originalStyle;
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-2 sm:p-6 pointer-events-auto md:top-17">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm cursor-pointer"/>

            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                className="relative w-full max-w-7xl h-[95vh] md:h-[90vh] bg-white dark:bg-zinc-950 rounded-4xl md:rounded-[3rem] shadow-2xl border border-zinc-200 dark:border-zinc-800 z-10000 overflow-hidden flex flex-col"
            >
                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
                    <button onClick={onClose} className="p-2 md:p-3 cursor-pointer rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-95 border border-zinc-200 dark:border-zinc-800">
                        <X className="size-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-16 scrollbar-hide">
                    {isReady ? (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-12 md:space-y-16">
                            <div className="flex items-center gap-3">
                                <Logo/>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                                <div className="space-y-6 md:space-y-8">
                                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-normal tracking-tighter text-slate-900 dark:text-white leading-tight">
                                        Launch your own global card program at the speed of light
                                    </h1>

                                    <div className="flex flex-wrap gap-3">
                                        <Link href="/billing" className="flex justify-center text-white px-5 py-2.5 bg-emerald-500 border border-emerald-500 items-center gap-1 font-bold text-sm transition-all rounded-lg hover:bg-transparent hover:text-emerald-400">
                                            Billing <ChevronRight className="size-4" />
                                        </Link>
                                        <Link href="/pricing" className="flex justify-center text-emerald-400 px-5 py-2.5 dark:text-emerald-600 bg-transparent border border-emerald-500 items-center gap-1 font-bold text-sm transition-all rounded-lg hover:bg-emerald-500 hover:text-white">
                                            Pricing <ChevronRight className="size-4" />
                                        </Link>
                                    </div>

                                    <div className="space-y-8 pt-4">
                                        <FeatureItem icon={<CreditCard/>} title="Absolute Control" desc="Move from concept to a real program in a fraction of the time." />
                                        <FeatureItem icon={<ArrowLeftRight/>} title="Global Compliance" desc="Instantly verify users across 150+ jurisdictions in real-time." />
                                        <FeatureItem icon={<Wallet/>} title="Smart Treasury" desc="Approve or decline transactions based on custom logic." />
                                    </div>
                                </div>

                                <div className="relative bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 min-h-[300px] flex items-center justify-center">
                                    <div className="scale-75 sm:scale-90 lg:scale-100 transition-transform">

                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 md:gap-12 pb-6">
                                <div className="w-full aspect-square md:aspect-video lg:aspect-square bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center overflow-hidden">
                                    <div className="scale-75 md:scale-[0.85] transform-gpu">

                                    </div>
                                </div>
                                <div className="w-full aspect-square md:aspect-video lg:aspect-square bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center overflow-hidden">
                                    <div className="scale-75 md:scale-[0.85] transform-gpu">

                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <span className="text-xl md:text-3xl font-normal tracking-tighter text-slate-900 dark:text-white block">Explore more about Issuing</span>

                                <div className="w-full lg:max-w-md flex flex-col gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-white/5">
                                    <div className="bg-stone-200/50 dark:bg-zinc-800/50 rounded-2xl flex justify-center items-center h-48 md:h-64 overflow-hidden">
                                    </div>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Manage payments online and globally, implement supported methods.</p>
                                    <Link href="/terminal" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                        Read About Terminal <ChevronRight className="size-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <LoadingSkeleton />
                    )}
                </div>
            </motion.div>
        </div>
    );
}