"use client";

import { TextScramble } from "@/shared/ui/TextScramble";
import GlobalNetwork from "@/shared/widgets/sync/GlobalNetwork";
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { useDict } from "@/shared/hooks/useDict";

export default function CryptoTrigger({ onClick }: { onClick?: () => void }) {
    const dict = useDict();

    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap={{ scale: 0.99 }}
            onClick={onClick}
            className="group relative flex h-96 md:h-125 w-full flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-stone-200 bg-stone-50/50 p-6 md:p-10 transition-all duration-500 hover:border-stone-400 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-zinc-950/20 hover:dark:bg-zinc-950/40 select-none cursor-pointer"
        >
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 transition-all duration-700 group-hover:scale-110 group-hover:opacity-60 group-hover:rotate-3">
                <div className="scale-75 md:scale-125 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <GlobalNetwork />
                </div>
            </div>

            <div className="absolute inset-0 z-10 bg-linear-to-b from-transparent via-stone-50/80 to-stone-50 dark:via-slate-950/80 dark:to-slate-950" />

            <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white shadow-sm border border-stone-200 dark:bg-zinc-900 dark:border-slate-700">
                    <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 text-stone-600 dark:text-slate-400" />
                </div>
            </div>

            <div className="relative z-30 mt-auto flex flex-col items-center gap-4 md:gap-6 text-center">
                <div className="w-full max-w-[280px] md:max-w-md">
                    <TextScramble 
                        className="text-2xl md:text-4xl font-medium tracking-tighter text-slate-900 dark:text-white leading-[1.1]"
                        text={dict.crypto.heading}
                    />
                </div>
                
                <p className="max-w-70 text-sm text-stone-500 dark:text-slate-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {dict.crypto.text}
                </p>
            </div>
        </motion.div>
    )
}