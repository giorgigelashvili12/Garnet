"use client";
import React from "react";
import { motion } from "framer-motion";
import {Tick} from "@/shared/ui/tick";
import {Pipe} from "@/shared/ui/pipe";
import {ProgressBar} from "@/shared/ui/progress-bar";

export function UsageChart2() {
    const timeline = React.useMemo(() => [0, 20, 40, 70], []);
    const delays = React.useMemo(() => [1000, 4200, 4200], []);

    return (
        <div className="relative select-none pointer-events-none">
            <motion.div initial={{ opacity: 0, x: -30, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative w-80 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
                <div className="space-y-6">
                    <div>
                        <span className="font-bold text-lg text-zinc-900 dark:text-white">Invoice</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] tracking-wider font-bold text-zinc-400">Invoice Number</span>
                            <span className="text-xs font-medium text-zinc-900 dark:text-zinc-200">#444444</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-[10px] tracking-wider font-bold text-zinc-400">Date Due</span>
                            <span className="text-xs font-medium text-zinc-900 dark:text-zinc-200">Mar 10</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-[10px] tracking-wider font-bold text-zinc-400">Unity</span>
                            <span className="text-xs font-medium text-zinc-900 dark:text-zinc-200 truncate">billing@example.com</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-[10px] tracking-wider font-bold text-zinc-400">To</span>
                            <span className="text-xs font-medium text-zinc-900 dark:text-zinc-200 truncate">person@example.com</span>
                        </div>
                    </div>

                    <div>
                        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex gap-1.5">
                            <div className="w-20">
                                <Tick start={5105.69} target={20105.69} steps={[5000, 5000, 5000]} isCurrency={true}/>
                            </div>
                            <div>due Mar. 10</div>
                        </div>

                        <div className="w-full mt-10">
                            <div className="grid grid-cols-[2fr_1fr_1.5fr] gap-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                                <span className="text-[10px] text-left tracking-wider font-bold text-zinc-400">Description</span>
                                <span className="text-[10px] text-left tracking-wider font-bold text-zinc-400">Qty</span>
                                <span className="text-[10px] text-left tracking-wider font-bold text-zinc-400">Unit Price</span>
                            </div>

                            <div className="grid grid-cols-[2fr_1fr_1.5fr] gap-4 py-4 border-b border-zinc-100 dark:border-zinc-800 items-center">
                                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 w-10">Cloud Tokens</span>
                                <span className="text-xs text-zinc-600 dark:text-zinc-400 text-right tabular-nums">
                                    <Tick start={510569010} target={2010569010} steps={[500000000, 500000000, 500000000, 500000000]} isCurrency={false}/>
                                </span>
                                <span className="text-xs text-zinc-600 dark:text-zinc-400 text-right whitespace-nowrap">$0.01 per 1,000</span>
                            </div>
                        </div>

                        <div className="flex justify-between mt-5">
                            <span>Total</span>
                            <span>
                                <Tick start={5105.69} target={20105.69} steps={[5000, 5000, 5000]} isCurrency={true}/>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="absolute -top-3 -right-60.5 w-40 h-24 flex items-center justify-center z-100 overflow-visible pointer-events-none rotate-270 scale-450">
                    <Pipe />
                </div>

                <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="absolute -right-50 top-50 w-64 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl z-50">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border-4 border-emerald-600 flex items-center justify-center shrink-0">
                                <div className="w-3 h-3 bg-emerald-600 rounded-full" />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight">Pro Plan</span>
                                <span className="text-xs text-zinc-500">Monthly Billing</span>
                            </div>
                        </div>

                        <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />

                        <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight">Tokens</span>
                                <span className="text-xs text-zinc-500 mt-0.5">$0.01 per 1,000 tokens</span>
                            </div>
                        </div>

                        <div>
                            <ProgressBar timeline={timeline} delays={delays} />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
