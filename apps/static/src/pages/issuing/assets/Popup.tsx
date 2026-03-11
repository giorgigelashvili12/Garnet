"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X, CreditCard, ArrowLeftRight, Wallet, ChevronRight } from "lucide-react";
import Logo from "@/shared/ui/logo";
import Link from "next/link";
import dynamic from "next/dynamic";
import FeatureItem from "@/shared/ui/FeatureItem";
import LoadingSkeleton from "@/shared/ui/LoadingSkeleton";
import CardActivity from "@/shared/widgets/charts/CardActivity";
import {useDict} from "@/shared/hooks/useDict";
const AccountList = dynamic(() => import('@/shared/widgets/charts/AccountList'), {ssr: false});

export default function IssuingPopup({ onClose }: { onClose: () => void }) {
    const [isReady, setIsReady] = useState(false);
    const dict = useDict();

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
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-0 sm:p-4 md:p-6 pointer-events-auto md:top-17">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-md cursor-pointer"/>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-7xl h-full sm:h-[95vh] md:h-[90vh] bg-white dark:bg-zinc-950 rounded-none sm:rounded-4xl md:rounded-[3rem] shadow-2xl border-x-0 sm:border border-zinc-200 dark:border-zinc-800 z-[10000] overflow-hidden flex flex-col"
            >
                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-60">
                    <button onClick={onClose} className="p-2.5 md:p-3 cursor-pointer rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-95 border border-zinc-200 dark:border-zinc-800 shadow-lg">
                        <X className="size-5 md:size-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 sm:p-8 md:p-16 scrollbar-hide">
                    {isReady ? (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-10 md:space-y-20">

                            <div className="flex items-center gap-3">
                                <Logo />
                            </div>

                            <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                                <div className="space-y-6 md:space-y-10 text-left">
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                                        {dict.issuing.popup.title.one} <span className="text-emerald-400">{dict.issuing.popup.title.two}</span>
                                    </h1>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Link href="/billing" className="flex justify-center text-white px-6 py-3 bg-emerald-500 border border-emerald-500 items-center gap-2 font-bold text-sm transition-all rounded-xl hover:bg-transparent hover:text-emerald-500">
                                            {dict.issuing.popup.link1} <ChevronRight className="size-4" />
                                        </Link>
                                        <Link href="/pricing" className="flex justify-center text-zinc-600 dark:text-zinc-400 px-6 py-3 bg-zinc-100 dark:bg-zinc-900 border border-transparent items-center gap-2 font-bold text-sm transition-all rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700">
                                            {dict.issuing.popup.link2}
                                        </Link>
                                    </div>

                                    <div className="grid gap-6 md:gap-8 pt-4">
                                        <FeatureItem icon={<CreditCard className="text-emerald-500"/>} title={dict.issuing.popup.featureItem1.title} desc={dict.issuing.popup.featureItem1.desc} />
                                        <FeatureItem icon={<ArrowLeftRight className="text-emerald-500"/>} title={dict.issuing.popup.featureItem1.title} desc={dict.issuing.popup.featureItem1.desc} />
                                        <FeatureItem icon={<Wallet className="text-emerald-500"/>} title={dict.issuing.popup.featureItem1.title} desc={dict.issuing.popup.featureItem1.desc} />
                                    </div>
                                </div>

                                <div className="relative bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] md:rounded-[4rem] p-4 sm:p-8 min-h-100 flex items-center justify-center overflow-hidden">
                                    <div className="scale-90 sm:scale-100 md:scale-110 transform-gpu transition-transform duration-700">
                                        <CardActivity/>
                                    </div>
                                    <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                <div className="flex flex-col gap-4">
                                    <div className="bg-stone-100 dark:bg-zinc-900 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                        <div className="scale-60 md:scale-80 w-100">
                                            <AccountList/>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-zinc-400">{dict.issuing.popup.card1.title}</p>
                                    <Link href="/lens" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                        {dict.issuing.popup.card1.link} <ChevronRight className="size-4" />
                                    </Link>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="bg-stone-100 dark:bg-zinc-900 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                        <div className="scale-80 md:scale-100 w-100 flex items-center justify-center">

                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-zinc-400">{dict.issuing.popup.card2.title}</p>
                                    <Link href="/authorization" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                        {dict.issuing.popup.card2.link} <ChevronRight className="size-4" />
                                    </Link>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="bg-stone-100 dark:bg-zinc-900 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                        <div className="scale-50 md:scale-60 transition-transform">

                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-zinc-400">{dict.issuing.popup.card3.title}</p>
                                    <Link href="/terminal" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                        {dict.issuing.popup.card3.link} <ChevronRight className="size-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="p-8"><LoadingSkeleton /></div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}