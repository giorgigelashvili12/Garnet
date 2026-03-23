"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDict } from "@/shared/hooks/useDict";

export default function AgentCommerce({ onClick }: { onClick?: () => void }) {
    const dict = useDict();
    const t = dict?.charts?.AgentCommerce;

    const images = ["/hoodie.webp", "/trackpants.jpg"];

    if (!t) return null;

    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="p-10 cursor-pointer w-full h-full overflow-hidden bg-stone-50 border-stone-400/50 dark:bg-(--dark-bg)/20 hover:dark:bg-(--dark-bg)/50 flex flex-col gap-1 rounded-4xl border dark:border-slate-800 select-none transition-colors relative hover:z-10"
        >
            <div className="scale-90 origin-top w-full">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-end">
                        <div className="bg-emerald-600 text-white p-4 rounded-2xl rounded-tr-none max-w-[80%] shadow-sm">
                            <p className="text-sm font-medium leading-tight">
                                {t.customerQuery}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-4">
                        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm">
                            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-tight">
                                {t.agentResponse}
                            </p>
                        </div>

                        <div className="flex gap-4 w-full max-w-md pointer-events-none mt-2">
                            {t.products.map((product: any, index: number) => (
                                <div key={index} className="flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 w-50 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
                                    <div className="bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden aspect-square">
                                        <Image
                                            src={images[index]}
                                            alt={product.name}
                                            width={200}
                                            height={200}
                                            className="rounded-3xl p-2 object-contain"
                                        />
                                    </div>
                                    <div className="p-4 space-y-1">
                                        <div className="flex flex-col gap-1">
                                            <h4 className="font-bold text-xs text-zinc-900 dark:text-white tracking-tight">
                                                {product.name}
                                            </h4>
                                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                {product.price}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="pt-2">
                                            <div className="w-full py-1 bg-zinc-900 dark:bg-white text-white dark:text-black text-[8px] font-bold uppercase text-center rounded-md">
                                                {t.buttonText}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}