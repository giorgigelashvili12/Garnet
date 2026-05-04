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
            className="group relative flex h-125 w-full flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-stone-200 bg-stone-50/50 p-10 transition-all duration-500 hover:border-stone-400 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-zinc-950/20 hover:dark:bg-zinc-950/40 select-none cursor-pointer"
        >
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 transition-all duration-700 group-hover:scale-110 group-hover:opacity-60 group-hover:rotate-3">
                <div className="scale-125 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <GlobalNetwork />
                </div>
            </div>

            <div className="absolute inset-0 z-10 bg-linear-to-b from-transparent via-stone-50/80 to-stone-50 dark:via-slate-950/80 dark:to-slate-950" />

            <div className="absolute top-8 right-8 z-30 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-stone-200 dark:bg-zinc-900 dark:border-slate-700">
                    <ArrowUpRight className="h-5 w-5 text-stone-600 dark:text-slate-400" />
                </div>
            </div>

            <div className="relative z-30 mt-auto flex flex-col items-center gap-6 text-center">
                <div className="max-w-md">
                    <TextScramble 
                        className="text-3xl md:text-4xl font-medium w-120 tracking-tighter text-slate-900 dark:text-white leading-[1.1]"
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