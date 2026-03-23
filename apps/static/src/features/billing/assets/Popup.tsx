"use client";
import React, {useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, CreditCard, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import FeatureItem from "@/shared/ui/FeatureItem";
import {UsageChart2} from "@/shared/widgets/charts/UsageChartBig";
import AccountList from "@/shared/widgets/charts/AccountList";
import {Fund} from "@/shared/widgets/charts/Fund";
import {Expenses} from "@/shared/widgets/charts/Expenses";
import {useDict} from "@/shared/hooks/useDict";

export function BillingPopup({ onClose }: { onClose: () => void }) {
    const [isReady, setReady] = useState(false);
    const [showWidget, setShowWidget] = useState(false);
    const dict = useDict();
    const popup = dict.billing.popup;

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

                                <div className="flex flex-col h-fit justify-center lg:flex-row items-center overflow-hidden">
                                    <div className="h-fit w-full p-6 md:p-10 flex justify-center items-center max-w-5xl bg-slate-50 dark:bg-zinc-900/50 relative overflow-hidden rounded-4xl md:rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2xl">

                                        <div className="w-full flex justify-center items-center transition-transform duration-500">
                                            <div className="scale-110 md:scale-90 md:mr-40 sm:scale-90 sm:mr-40 [@media(max-width:630px)]:scale-80 [@media(max-width:630px)]:mr-35 [@media(max-width:330px)]:scale-30">
                                                <UsageChart2 />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {showWidget ? (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 md:mt-10">
                                        <span className="text-xl md:text-3xl font-normal tracking-tighter text-slate-900 dark:text-white block mb-6 md:mb-8">{dict.issuing.popup.intro}</span>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                            <div className="flex flex-col gap-4">
                                                <div className="bg-stone-100 dark:bg-zinc-900/50 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                                    <div className="scale-60 w-100 bg-white">
                                                        <div className='bg-white p-5 dark:bg-zinc-900'><AccountList/></div>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-zinc-400">{popup.featureItem1}</p>
                                                <Link href="/lens" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                                    {popup.card1.link} <ChevronRight className="size-4" />
                                                </Link>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <div className="bg-stone-100 dark:bg-zinc-900/50 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                                    <div className="scale-80 flex items-center justify-center">
                                                        <Fund/>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-zinc-400">{popup.card2.desc}</p>
                                                <Link href="/authorization" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                                    {popup.card2.link} <ChevronRight className="size-4" />
                                                </Link>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <div className="bg-stone-100 dark:bg-zinc-900/50 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                                    <div className="scale-50 md:scale-60 transition-transform">
                                                        <Expenses/>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-zinc-400">{popup.card3.desc}</p>
                                                <Link href="/terminal" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
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
    );

    /*
    return (
        <div className="fixed inset-0 z-100 flex justify-center items-center p-4 md:p-10 pointer-events-auto top-17">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-slate-500/60 dark:bg-(--dark-bg)/60 backdrop-blur-md cursor-zoom-out"
            />

            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="relative w-full max-w-7xl max-h-[90vh] bg-white dark:bg-(--dark-bg) rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl z-101 flex flex-col overflow-hidden"
            >
                <div className="absolute top-6 right-8 z-110">
                    <button
                        onClick={onClose}
                        className="p-3 cursor-pointer rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-95 border border-zinc-200 dark:border-zinc-800"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 md:p-16 lg:p-20">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-500 text-white font-black shadow-lg">
                            S
                        </div>
                        <span className="font-bold tracking-tighter text-2xl dark:text-white">
              Soteria Atlas
            </span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start w-full max-w-6xl mx-auto overflow-visible">
                        <div className="space-y-8">
                            <h1 className="text-2xl md:text-4xl font-normal tracking-tighter text-slate-900 dark:text-white block max-w-2xl leading-tight">
                                Enable any billing model
                            </h1>

                            <div className="flex flex-wrap gap-4 mt-6">
                                <Link
                                    href="/billing"
                                    className="flex text-white px-5 py-2.5 bg-emerald-500 border border-emerald-500 items-center gap-1 font-bold text-sm transition-all rounded-lg hover:bg-transparent hover:text-emerald-400"
                                >
                                    Billing <ChevronRight className="size-4" />
                                </Link>
                                <Link
                                    href="/billing"
                                    className="flex text-emerald-400 px-5 py-2.5 dark:text-emerald-600 bg-transparent border border-emerald-500 items-center gap-1 font-bold text-sm transition-all rounded-lg hover:bg-emerald-500 hover:text-white"
                                >
                                    About Pricing <ChevronRight className="size-4" />
                                </Link>
                            </div>

                            <div className="space-y-10 pt-4">
                                <FeatureItem
                                    icon={<CreditCard className="size-6 text-emerald-500" />}
                                    desc="Respond to user demands with much faster and a flexible answer, using pricing models, depending on your business logic."
                                />
                                <FeatureItem
                                    icon={<Zap className="size-6 text-emerald-500" />}
                                    desc="Improve your workflows with AI powered tools and logics, available on-platform."
                                />
                                <FeatureItem
                                    icon={<ArrowUpRight className="size-6 text-emerald-500" />}
                                    desc="Either implement the services in your server, or use no-code tools provided for your server, integrate data-pipes easily."
                                />
                            </div>
                        </div>

                        <div className="relative flex flex-col justify-center items-start overflow-visible max-w-xl mt-42">
                            <div className="space-y-6">
                                <p className="text-lg md:text-xl text-slate-700 dark:text-zinc-400 leading-relaxed font-light">
                                    Leverage your platform&apos;s revenue potential to the fullest
                                    by earning a percentage of the{" "}
                                    <span className="text-slate-900 dark:text-zinc-300 font-medium underline decoration-emerald-500/30 underline-offset-4">
                    interchange fee
                  </span>{" "}
                                    on every transaction.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-zinc-100 dark:border-zinc-800">
                                    <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-tight">
                      Issuance
                    </span>
                                        <span className="text-sm dark:text-zinc-300">
                      Instant Virtual Cards
                    </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-tight">
                      Rewards
                    </span>
                                        <span className="text-sm dark:text-zinc-300">
                      Competitive Cashback
                    </span>
                                    </div>
                                </div>

                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    Provide your clients the flexibility to choose between a
                                    <strong className="text-zinc-900 dark:text-zinc-300">
                                        {" "}
                                        straightforward blended rate{" "}
                                    </strong>
                                    or the{" "}
                                    <strong className="text-zinc-900 dark:text-zinc-300">
                                        {" "}
                                        transparent Interchange++ model{" "}
                                    </strong>
                                    to optimize value based on their specific transaction volumes.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="relative mt-15 flex justify-center items-center overflow-hidden bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] h-100 lg:h-125 shadow-inner">
                            <div className="scale-90 lg:scale-100">

                            </div>
                        </div>
                    </div>

                    <div className="mt-12 lg:mt-20 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center">
                            <div>
                                <div className="relative flex justify-center items-center bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] h-100 lg:h-125 shadow-inner overflow-visible">
                                    <div className="scale-90 lg:scale-110 xl:scale-125 transition-transform duration-500 ease-out translate-x-0 lg:-translate-x-4">

                                    </div>
                                </div>

                                <p className="my-2.5 dark:text-zinc-400">
                                    Automate usage-based billing to capture more revenue and
                                    manage costs as your customers scale their consumption.
                                </p>
                                <Link
                                    href="/invoice"
                                    className="flex items-center gap-1 text-emerald-500"
                                >
                                    Read About Usage-based billing{" "}
                                    <ChevronRight className="size-5" />
                                </Link>
                            </div>

                            <div>
                                <div className="relative flex justify-center items-center overflow-hidden bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] h-100 lg:h-125 shadow-inner">
                                    <div className="scale-90 lg:scale-100">

                                    </div>
                                </div>

                                <p className="my-2.5 dark:text-zinc-400">
                                    Manage global tax compliance, when it comes to anything,
                                    registration to calculation, collection, and filling
                                </p>
                                <Link
                                    href="/tax"
                                    className="flex items-center gap-1 text-emerald-500"
                                >
                                    Read About Tax <ChevronRight className="size-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
    */
}