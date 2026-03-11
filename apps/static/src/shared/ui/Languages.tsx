"use client";

import { useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLangStore } from "@/shared/config/lang";
import Image from "next/image";

const languages = [
    { code: "EN", name: "English", flag: "/eng.svg" },
    { code: "DE", name: "Deutsch", flag: "/ger.webp" },
    { code: "GE", name: "ქართული", flag: "/geo.png" },
];

export default function Languages() {
    const [isOpen, setIsOpen] = useState(false);

    const { lang: globalLangCode, setLang } = useLangStore();

    const currentLang = languages.find((l) => l.code === globalLangCode) || languages[0];

    return (
        <div className="relative z-999999">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-4 py-2 rounded-2xl dark:bg-white/5 border dark:border-white/20 dark:hover:border-white/10 text-zinc-400 hover:border-zinc-300 hover:text-zinc-400 dark:hover:text-white hover:bg-white/10 transition-all backdrop-blur-md cursor-pointer group">
                <Globe size={16} className={isOpen ? "text-emerald-500" : "group-hover:text-emerald-400"} />
                <span className="text-xs font-bold tracking-widest">{currentLang.code}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}/>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-3 w-48 p-2 bg-zinc-950/90 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
                        >
                            <div className="flex flex-col gap-1">
                                {languages.map((l) => (
                                    <button
                                        key={l.code}
                                        onClick={() => {
                                            // @ts-expect-error mito
                                            setLang(l.code);
                                            setIsOpen(false);
                                        }}
                                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all group ${
                                            globalLangCode === l.code ? "bg-white/10 text-white" : "text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Image src={l.flag} alt={l.name} width={25} height={25} className="rounded-sm shadow-sm"/>
                                            <span className="text-sm font-medium tracking-tight">{l.name}</span>
                                        </div>
                                        {globalLangCode === l.code && (
                                            <Check size={14} className="text-emerald-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}