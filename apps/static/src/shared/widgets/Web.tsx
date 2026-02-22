"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Step} from "@/shared/lib/@types";
import Image from "next/image";
import { lang, dict_atlas_payments, dict_atlas_web } from "@/shared/lib/constants";
import { Lock } from "lucide-react";
import Card from "@/shared/icons/Card";

export default function Web() {
    const [selectedStep, setSelectedStep] = useState<Step | null>(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => { setIndex((prev) => (prev + 1) % lang.length); }, 4000);
        return () => clearInterval(timer);
    }, []);

    const urls = { en: "quickmarket.com/checkout", ka: "quickmarket.ge/gadakhda", de: "quickmarket.de/kasse" };
    const currentLang = lang[index] as keyof typeof dict_atlas_web;
    const t = dict_atlas_web[currentLang];
    const pt = dict_atlas_payments[currentLang as keyof typeof dict_atlas_payments];

    if (!t || !pt) return null;

    return (
        <div className="relative mt-20 flex flex-col items-center justify-center p-4 md:p-10 min-h-screen overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-30 dark:opacity-50" style={{ background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 70%)` }} />
                <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.2]" style={{ backgroundImage: `radial-gradient(circle, #000 1.5px, transparent 1.5px)`, backgroundSize: "48px 48px" }} />
            </div>
            <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-32">
                <motion.div initial={{ x: -60, opacity: 0, rotate: -2 }} animate={{ x: 0, opacity: 1, rotate: -5 }} whileHover={{ rotate: 0, scale: 1.02 }} transition={{ type: "spring", stiffness: 100 }} className="relative z-20 shrink-0">
                    <div className="relative z-1 bg-white dark:bg-zinc-800 flex justify-center items-center w-72 h-130 rounded-[3.5rem] border border-stone-200 dark:border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)]">
                        <div className="bg-black w-66.25 h-125 rounded-[3rem] flex justify-center items-center">
                            <div className="bg-white w-60 h-115 rounded-2xl overflow-hidden flex flex-col">
                                <div className="flex justify-center items-center w-full h-24 pt-4">
                                    <Image src="/nfc.png" alt="" width={60} height={60} priority />
                                </div>
                                <div className="flex flex-col px-4 text-center grow">
                                    <AnimatePresence mode="wait">
                                        <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-2">
                                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">{pt.text1}</p>
                                            <span className="text-black text-4xl font-black block mt-1">$7.50</span>
                                            <p className="text-gray-400 text-[10px] mt-4 leading-tight">{pt.text2}</p>
                                        </motion.div>
                                    </AnimatePresence>
                                    <div className="flex flex-col gap-3 mt-8">
                                        {[pt.text3, pt.text4, pt.text5].map((label, i) => (
                                            <div key={i} className="flex justify-between text-[11px] font-bold text-gray-700">
                                                <span>{label}</span>
                                                <span>${i === 1 ? "1.00" : i === 2 ? "1.50" : "5.00"}</span>
                                            </div>
                                        ))}
                                        <hr className="border-gray-100 my-1" />
                                        <div className="flex justify-between text-xs font-black uppercase text-black">
                                            <span>{pt.text6}</span>
                                            <span>$7.50</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-emerald-600 mb-6 mx-4 py-3 rounded-xl flex justify-center items-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white text-[10px] font-black uppercase tracking-widest">{pt.text7}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="relative z-10 w-full max-w-225">
                    <div className="w-full p-3 rounded-[2.5rem] bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl">
                        <div className="flex justify-center items-center w-full h-12">
                            <div className="w-full max-w-lg h-8 flex items-center px-4 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-white/20 dark:border-white/5 shadow-sm">
                                <Lock className="w-3 h-3 mr-3 shrink-0" />
                                <AnimatePresence mode="wait">
                                    <motion.span key={index} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }} className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">https://{urls[currentLang]}</motion.span>
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-slate-800 shadow-xl mt-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-100 dark:divide-slate-800">
                                <div className="p-10">
                                    <AnimatePresence mode="wait">
                                        <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <h2 className="font-black text-2xl text-slate-900 dark:text-white leading-tight">{t.text1}</h2>
                                            <p className="text-stone-500 dark:text-slate-400 text-sm mt-2">{t.text2}</p>
                                        </motion.div>
                                    </AnimatePresence>
                                    <div className="mt-8 space-y-4">
                                        <button className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl flex justify-center items-center gap-2 text-sm font-bold active:scale-[0.98] transition-all">
                                            <Image className="invert dark:invert-0 w-4 h-4" src="/apple.png" alt="" width={16} height={16} /> Pay
                                        </button>
                                        <div className="flex items-center gap-4 py-2">
                                            <div className="flex-1 h-px bg-stone-200 dark:bg-slate-800" />
                                            <span className="text-[10px] font-black text-stone-300 dark:text-slate-600 uppercase tracking-widest" />
                                            <div className="flex-1 h-px bg-stone-200 dark:bg-slate-800" />
                                        </div>
                                        <div className="space-y-3">
                                            <span className="text-[10px] font-black uppercase tracking-tighter text-stone-400 block">{t.text3}</span>
                                            <div className="border border-stone-200 dark:border-slate-800 rounded-xl overflow-hidden bg-stone-50/30 dark:bg-slate-800/20">
                                                {[0, 1, 2].map((i) => {
                                                    const isActive = index === i;
                                                    return (
                                                        <div key={i} className={`flex justify-between items-center px-4 py-4 border-b last:border-0 border-stone-200 dark:border-slate-800 transition-all duration-500 ${isActive ? "bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05]" : "opacity-40 grayscale"}`}>
                                                            <div className="flex items-center gap-3">
                                                                {i === 0 ? <Card className="scale-75" /> : <Image src={i === 1 ? "/tbc.png" : "/bog.png"} alt="" width={32} height={22} className="object-contain" />}
                                                                <span className={`text-sm font-bold ${isActive ? "text-slate-900 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}>{i === 0 ? "•••• 4242" : i === 1 ? t.text4 : t.text5}</span>
                                                            </div>
                                                            <div className={`w-4 h-4 rounded-full border-2 transition-all ${isActive ? "border-emerald-500 bg-emerald-500 shadow-[inset_0_0_0_3px_#fff] dark:shadow-[inset_0_0_0_3px_#0f172a]" : "border-stone-300"}`} />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl uppercase text-xs tracking-[0.2em] shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]">{t.text6}</button>
                                </div>
                                <div className="p-10 bg-stone-50/40 dark:bg-slate-950/20">
                                    <h3 className="font-black text-xl text-slate-900 dark:text-white">{t.text7}</h3>
                                    <div className="mt-8 flex gap-5 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-stone-100 dark:border-slate-700 shadow-sm">
                                        <div className="w-20 h-20 bg-stone-50 dark:bg-slate-900 rounded-xl flex items-center justify-center p-2">
                                            <Image src="/product.png" alt="" width={60} height={60} className="object-contain" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <span className="font-black text-lg text-slate-900 dark:text-white leading-tight">{t.text8}</span>
                                            <span className="text-xs text-stone-400 mt-1">{t.text9}</span>
                                            <span className="font-black mt-2">$7.50</span>
                                        </div>
                                    </div>
                                    <div className="mt-10 space-y-4 pt-8 border-t border-stone-200/60 dark:border-slate-800">
                                        {[t.text10, t.text11, t.text12].map((label, i) => (
                                            <div key={i} className="flex justify-between text-[11px] font-black text-stone-400 uppercase tracking-widest">
                                                <span>{label}</span>
                                                <span className="text-slate-700 dark:text-slate-300">${i === 0 ? "5.00" : i === 1 ? "1.50" : "1.00"}</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between text-3xl font-black text-slate-900 dark:text-white pt-4">
                                            <span>{t.text13}</span>
                                            <span>$7.50</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}