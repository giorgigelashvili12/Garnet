"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { X, ChevronRight, TrendingUp, Globe } from "lucide-react";
import Link from "next/link";
import { IssuingWeb } from "@/shared/components/Home/issuing/IssuingWeb";
import AccountList from "@/shared/components/Home/charts/AccountList";
import { Fund } from "@/shared/components/Home/charts/Fund";
import { Expenses } from "@/shared/components/Home/charts/Expenses";
// import {IssuingWeb} from "@/shared/widgets/issuing/IssuingWeb";
// import AccountList from "@/shared/widgets/charts/AccountList";
// import {Fund} from "@/shared/widgets/charts/Fund";
// import {Expenses} from "@/shared/widgets/charts/Expenses";

export default function IssuingPopup({ onClose }: { onClose: () => void }) {
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
        <div className='fixed inset-0 z-100 flex md:top-17 items-center justify-center p-2 md:p-12 max-[768px]:top-20'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className='absolute inset-0 bg-black/60 backdrop-blur-md' />

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="relative w-full max-w-7xl h-[95vh] md:h-[90vh] bg-white/95 dark:bg-zinc-950/90 rounded-4xl md:rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col">
                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-120">
                    <button onClick={onClose} className="p-2 max-[768px]:mt-3 md:p-3 cursor-pointer rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-95 shadow-lg">
                        <X size={20} className="md:size-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-10 pt-16 md:pt-16 scrollbar-hide">
                    <div className="flex flex-col gap-8 md:gap-10">
                        {isReady ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8 md:gap-10">
                                <div className="space-y-4">
                                    <span className="text-2xl md:text-4xl font-normal tracking-tighter text-slate-900 dark:text-white block max-w-2xl leading-tight">
                                        Launch your own global card program at the
                                        {" "}
                                        speed of light
                                    </span>
                                    <p className="text-sm md:text-lg font-normal tracking-tighter text-slate-600 dark:text-zinc-400 block max-w-2xl leading-snug">
                                        Create commercial or consumer cards with Garnet&rsquo;s support. Expense management, allowing to spend credit or earned funds; Use Garnet as your program manager, or use Garnet as your processor for control. 
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                        <Link href="/payments" className="flex justify-center text-white px-5 py-2.5 bg-emerald-500 border border-emerald-500 items-center gap-1 font-bold text-sm transition-all rounded-lg hover:bg-transparent hover:text-emerald-400">
                                            Get Started <ChevronRight className="size-4" />
                                        </Link>
                                        <Link href="/payments" className="flex justify-center text-emerald-500 dark:text-emerald-400 px-5 py-2.5 bg-transparent border border-emerald-500 items-center gap-1 font-bold text-sm transition-all rounded-lg hover:bg-emerald-500 hover:text-white">
                                            View Pricing <ChevronRight className="size-4" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex flex-col h-fit justify-center lg:flex-row items-center gap-8 lg:gap-12 p-4 md:p-8 overflow-hidden">
                                    <div className="h-fit max-[400px]:scale-70 max-[400px]:w-100 w-full max-w-5xl bg-slate-50 dark:bg-zinc-900/50 relative overflow-hidden rounded-4xl md:rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2xlscale-[0.8] sm:scale-90 md:scale-100 transition-transform duration-500 origin-center">
                                        <IssuingWeb />
                                    </div>
                                </div>

                                {showWidget ? (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 md:mt-10">
                                        <span className="text-xl md:text-3xl font-normal tracking-tighter text-slate-900 dark:text-white block mb-6 md:mb-8">Explore More About Issuing</span>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                            <div className="flex flex-col gap-4">
                                                <div className="bg-stone-100 dark:bg-zinc-900/50 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                                    <div className="scale-60 w-100 bg-white">
                                                        <div className='bg-white p-5 dark:bg-zinc-900'>
                                                            <AccountList />
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-zinc-400">Scale your business globally, setup pipes and move data all around</p>
                                                <Link href="/lens" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                                    Read About Garnet Link <ChevronRight className="size-4" />
                                                </Link>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <div className="bg-stone-100 dark:bg-zinc-900/50 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                                    <div className="scale-80 flex items-center justify-center">
                                                        <Fund />
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-zinc-400">BaaS (Banking-as-a-Service), practice of integrating financial services in Softwares.</p>
                                                <Link href="/authorization" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                                    Read About Treasury <ChevronRight className="size-4" />
                                                </Link>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <div className="bg-stone-100 dark:bg-zinc-900/50 rounded-3xl flex justify-center items-center h-64 md:h-84 overflow-hidden">
                                                    <div className="scale-50 md:scale-60 transition-transform">
                                                        <Expenses />
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-zinc-400">End-user based service, while creating a card issuing program, you can track and limit expenses.</p>
                                                <Link href="/terminal" className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                                    Read About Expense Management <ChevronRight className="size-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="h-48 w-full border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl flex items-center justify-center text-slate-400">
                                        Loading...
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

/*
Build and monetize a program that gives your customers access to fast financing with minimal effort.

Capital for platforms

Enable your customers to hold funds, pay bills, earn rewards, and manage cash flows with a single integration.

Financial Accounts for platforms
*  */