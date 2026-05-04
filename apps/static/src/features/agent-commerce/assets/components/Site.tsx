"use client";
import React, { useState, useEffect } from "react";
import { Plus, ArrowUp } from "lucide-react";
import { useDict } from "@/shared/hooks/useDict";
import { ProductI } from "@/shared/@types/Product";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function Site() {
  const [isDark] = useState(false);
  const dict = useDict();
  const t = dict?.charts?.AgentCommerce;
  const site = dict?.extra;

  const [placeholderText, setPlaceholderText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  const phrases = [
    site.prompt1,
    site.prompt2,
    site.prompt3,
  ];

  useEffect(() => {
    if (loopCount >= 3) {
      setPlaceholderText(site?.placeholder || "");
      return;
    }

    const currentPhrase = phrases[phraseIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && placeholderText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && placeholderText === "") {
        setIsDeleting(false);
        if (phraseIndex === phrases.length - 1) {
          setPhraseIndex(0);
          setLoopCount((prev) => prev + 1);
        } else {
          setPhraseIndex((prev) => prev + 1);
        }
      } else {
        const nextText = isDeleting
          ? currentPhrase.substring(0, placeholderText.length - 1)
          : currentPhrase.substring(0, placeholderText.length + 1);
        setPlaceholderText(nextText);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [placeholderText, isDeleting, phraseIndex, loopCount, site?.placeholder]);

  const history = [site?.history];
  const images = ["/hoodie.webp", "/trackpants.jpg"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  if (!t || !site) return null;

  return (
    <div className={`${isDark ? "dark" : ""}`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative pointer-events-none select-none h-full group w-full max-w-6xl mx-auto border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500"
      >
        <div className="flex h-140.5 w-full bg-white dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 transition-colors duration-300">
          <motion.aside
          
            className="w-64 hidden md:flex flex-col border-r border-slate-100 dark:border-white/5 p-4 shrink-0"
          >
            <h1 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-8 px-2 tracking-tight">
              {site.title}
            </h1>

            <button className="flex items-center gap-2 w-fit px-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 mb-8 ml-2 transition-colors">
              <Plus size={16} />
              {site.text1}
            </button>

            <div className="flex flex-col gap-1 overflow-y-auto">
              {history.map((item, i) => (
                <div
                  key={i}
                  className="px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-white/10 font-medium text-slate-700 dark:text-white truncate"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.aside>

          <main className="flex-1 flex flex-col relative overflow-hidden bg-white dark:bg-[#09090b]">
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8">
              <motion.div className="flex justify-end">
                <div className="bg-emerald-600 text-white p-4 rounded-2xl rounded-tr-none max-w-[80%] shadow-sm">
                  <p className="text-sm font-medium leading-tight">
                    {t.customerQuery}
                  </p>
                </div>
              </motion.div>

              <motion.div className="flex justify-start">
                <div className="max-w-[85%] md:max-w-xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-white/10 shadow-sm p-5 rounded-2xl rounded-tl-none text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
                  {t.agentResponse}
                </div>
              </motion.div>

              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {t.products.map((product: ProductI, index: number) => (
                  <motion.div
                    key={product.name}
                  
                    whileHover={{ scale: 1.02 }}
                    className="flex min-w-50 md:min-w-55 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden flex-shrink-0"
                  >
                    <div className="h-40 md:h-t58 w-40 bg-slate-50 dark:bg-white/5 flex items-center justify-center">
                      <Image
                        src={images[index]}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="rounded-2xl p-2 object-contain"
                      />
                    </div>
                    <div className="p-3 space-y-1 w-43">
                      <h3 className="font-medium text-slate-800 dark:text-white">
                        {product.name}
                      </h3>
                      <p className="text-sm font-bold mt-2 dark:text-white">
                        {product.price}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
            
              className="p-4 md:p-6 bg-white dark:bg-[#09090b] border-t border-slate-50 dark:border-white/5"
            >
              <div className="max-w-3xl mx-auto relative">
                <div className="relative w-full">
                  <input
                    type="text"
                    disabled
                    className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl py-3 md:py-4 pl-5 pr-12 text-sm focus:outline-none transition-all shadow-sm dark:text-white"
                  />
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-sm text-slate-800 dark:text-zinc-200">
                    <span>{placeholderText}</span>
                    {loopCount < 3 && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="ml-0.5 w-0.5 h-4 bg-emerald-500"
                      />
                    )}
                  </div>
                </div>
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 dark:text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <ArrowUp size={20} />
                </button>
              </div>
            </motion.div>
          </main>
        </div>

        <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize bg-transparent" />
      </motion.div>
    </div>
  );
}