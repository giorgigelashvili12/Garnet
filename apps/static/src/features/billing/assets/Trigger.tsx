"use client";
import React from "react";
import { Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";
import {UsageChart} from "@/shared/widgets/charts/UsageChart";
import {useDict} from "@/shared/hooks/useDict";

export function BillingTrigger({ onClick }: { onClick?: () => void }) {
    // const containerVariants = {
    //     initial: { opacity: 0, y: 20 },
    //     animate: {
    //         opacity: 1,
    //         y: 0,
    //         transition: { duration: 0.6, ease: "easeOut" },
    //     },
    // };

    const dict = useDict();
    const trigger = dict?.billing?.trigger;

    const cardVariants = {
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="p-10 cursor-pointer w-full h-full overflow-hidden bg-stone-50 border-stone-400/50 dark:bg-(--dark-bg)/20 hover:dark:bg-(--dark-bg)/50 flex flex-col gap-1 rounded-4xl border dark:border-slate-800 select-none transition-colors"
        >
            <div className="scale-90 origin-top">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                </motion.div>

                <div className="flex flex-col gap-6 w-full max-w-md pointer-events-none">
                    <motion.div
                        variants={cardVariants}
                        className="bg-white dark:bg-zinc-900 rounded-4xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-center shadow-sm">
                                <Zap size={20} className="text-emerald-500 fill-emerald-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                                    {trigger?.subtitle1}
                                </h3>
                                <p className="text-sm text-zinc-500 font-medium">
                                    {trigger?.subtitle2}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[10px] font-bold text-zinc-500 tracking-widest">
                                {trigger?.text1}
                            </p>
                            <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                                {trigger?.text2}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 tracking-widest">
                                <Activity size={12} className="text-emerald-500" />
                                {trigger?.text3}
                            </div>
                            <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "75%" }}
                                    transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
                                    className="h-full bg-linear-to-r from-emerald-500 via-lime-400 to-emerald-300"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <UsageChart />
                </div>
            </div>
        </motion.div>
    );
}
