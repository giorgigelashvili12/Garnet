"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Minus, Plus, Loader2 } from "lucide-react";
import { useDict } from "@/shared/hooks/useDict";

export function UCP() {
  const images = ["/hoodie.webp", "/trackpants.jpg"];
  const dict = useDict();
  const t = dict?.charts?.AgentCommerce;

  if (!t?.products || t.products.length === 0) return null;

  const product = t.products[0];

  return (
    <div className="flex bg-white dark:bg-zinc-900/95 flex-col gap-6 max-w-md mx-auto p-6 font-sans transition-colors duration-300 select-none pointer-events-none">
      <div className="flex justify-end">
        <div className="bg-emerald-600 dark:bg-emerald-500 text-white px-6 py-3 rounded-2xl rounded-tr-none text-sm font-medium shadow-sm">
          {t.customerQuery}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-slate-900 dark:text-zinc-100 font-medium transition-colors">
          {t.agentResponse}
        </p>

        <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-emerald-500/20 rounded-xl shadow-sm overflow-hidden transition-all">
          <div className="p-4 flex gap-4">
            <div className="relative h-20 w-20 bg-slate-100 dark:bg-emerald-950/30 rounded-lg overflow-hidden flex-shrink-0 border border-transparent dark:border-emerald-500/10">
              <Image
                src={images[0]}
                alt={product.name}
                fill
                className="object-cover p-2"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-50 leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                  Black - Large
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                  {product.price}
                </p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 tracking-wide uppercase">
                  Cartsy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-full px-3 py-1 h-fit self-start">
              <button className="text-slate-400 dark:text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Minus size={14} strokeWidth={3} />
              </button>
              <span className="text-xs font-bold text-slate-700 dark:text-zinc-200">1</span>
              <button className="text-slate-400 dark:text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Plus size={14} strokeWidth={3} />
              </button>
            </div>
          </div>

          <div className="border-t border-slate-50 dark:border-zinc-800 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <button className="flex items-center gap-1 text-slate-500 dark:text-zinc-400 text-xs font-bold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Total due today <ChevronDown size={14} />
              </button>
              <span className="text-sm font-bold text-slate-900 dark:text-zinc-50">$31.00</span>
            </div>

            <button className="w-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 py-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors border border-emerald-100/50 dark:border-emerald-500/20">
                <Loader2 size={16} />
              Talking to Quick Market
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}