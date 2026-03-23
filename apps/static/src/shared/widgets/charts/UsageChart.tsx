"use client";
import React from "react";
import { motion } from "framer-motion";
import {useDict} from "@/shared/hooks/useDict";

export function UsageChart() {
    const data = [
        15, 25, 40, 30, 45, 60, 50, 80, 45, 35, 20, 15, 55, 45, 65, 55, 75, 100, 70,
        45, 30, 40, 35, 60, 65, 75, 85,
    ];

    const dict = useDict();
    const title = dict.charts.UsageChart.title;

    return (
        <div className="w-full bg-white dark:bg-zinc-900 rounded-4xl p-6 px-9 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <div className="mb-6">
                <p className="text-xs font-medium text-zinc-400 tracking-widest mb-1">
                    {title}
                </p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tighter">
                    2,010,569,010
                </p>
            </div>

            <div className="flex items-end justify-between h-32 gap-1 px-1">
                {data.map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{
                            delay: 0.2 + i * 0.02,
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                        className="flex-1 bg-emerald-500 rounded-t-xs"
                    />
                ))}
            </div>
        </div>
    );
}
