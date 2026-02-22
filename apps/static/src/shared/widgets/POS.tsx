"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {lang, dict_atlas_payments} from "@/shared/lib/constants";

export default function POS() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % lang.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const currentLang = lang[index] as keyof typeof dict_atlas_payments;
    const t = dict_atlas_payments[currentLang];

    return (
        <div className="relative z-20 shrink-0">
            <div className="relative z-1 bg-white dark:bg-zinc-800 flex justify-center items-center w-72 h-130 rounded-[3.5rem] border border-stone-200 dark:border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)]">
                <div className="bg-black w-66 h-125 rounded-[3rem] flex justify-center items-center">
                    <div className="bg-white w-60 h-115 rounded-2xl overflow-hidden flex flex-col">
                        <div className="flex justify-center items-center w-full h-24 pt-4">
                            <Image src="/nfc.png" alt="" width={60} height={60} priority />
                        </div>
                        <div className="flex flex-col px-4 text-center grow">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                >
                                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">{t.text1}</p>
                                    <span className="text-black text-4xl font-black block mt-1">$7.50</span>
                                    <p className="text-gray-400 text-[10px] mt-4 leading-tight">{t.text2}</p>
                                </motion.div>
                            </AnimatePresence>
                            <div className="flex flex-col gap-3 mt-8 text-left">
                                <div className="flex justify-between text-[11px] font-bold text-gray-700">
                                    <span>{t.text3}</span>
                                    <span>$5.00</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-bold text-gray-700">
                                    <span>{t.text4}</span>
                                    <span>$1.00</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-bold text-gray-700">
                                    <span>{t.text5}</span>
                                    <span>$1.50</span>
                                </div>
                                <hr className="border-gray-100 my-1" />
                                <div className="flex justify-between text-xs font-black uppercase text-black">
                                    <span>{t.text6}</span>
                                    <span>$7.50</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-emerald-600 mb-6 mx-4 py-3 rounded-xl flex justify-center items-center shadow-lg shadow-emerald-500/20">
                            <span className="text-white text-[10px] font-black uppercase tracking-widest">{t.text7}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
