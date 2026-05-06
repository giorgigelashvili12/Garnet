"use client";

import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { PRODUCTS } from "@/shared/@types";
import ProductCard from "@/shared/widgets/business/ProductCard";
import { useDict } from "@/shared/hooks/useDict";

export default function HardwareSection() {
  const dict = useDict();
  const t = dict.business.hardware;
  
  const localizedProducts = useMemo(() => {
    return PRODUCTS.map(p => {
      const localized = t.products[p.id.replace("table-terminal", "register").replace("terminal-case", "case").replace("terminal-stand", "stand").replace("wall-mount", "wall").replace("on-table-terminal", "table") as keyof typeof t.products];
      if (localized) {
        return {
          ...p,
          name: localized.name,
          description: localized.desc,
          price: localized.price
        };
      }
      return p;
    });
  }, [t.products]);

  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const tEnv = trackRef.current;
    if (!tEnv) return;
    setCanPrev(tEnv.scrollLeft > 10);
    setCanNext(tEnv.scrollLeft < tEnv.scrollWidth - tEnv.clientWidth - 10);
  }, []);

  const scroll = useCallback((dir: "prev" | "next") => {
    const tEnv = trackRef.current;
    if (!tEnv) return;
    const scrollAmount = tEnv.clientWidth * 0.8;
    tEnv.scrollBy({ left: dir === "next" ? scrollAmount : -scrollAmount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const tEnv = trackRef.current;
    if (tEnv) {
      tEnv.addEventListener('scroll', updateArrows);
      window.addEventListener('resize', updateArrows);
      return () => {
        tEnv.removeEventListener('scroll', updateArrows);
        window.removeEventListener('resize', updateArrows);
      };
    }
  }, [updateArrows]);

  return (
    <section id="hardware-section" className="w-full py-24 bg-slate-800">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-8 md:px-16 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              {t.title1} <br />
              <span className="text-slate-500">{t.title2}</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-lg mb-8">
              {t.desc}
            </p>
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-white font-semibold text-sm transition-all"
            >
              <span className="border-b-2 border-white group-hover:border-emerald-500 group-hover:text-emerald-400 transition-all pb-1">
                {t.explore}
              </span>
              <span className="bg-white text-black rounded-full p-1 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scroll("prev")}
              disabled={!canPrev}
              className="w-12 h-12 rounded-full border cursor-pointer border-white/10 flex items-center justify-center transition-all text-white disabled:opacity-20 hover:bg-white hover:text-black disabled:hover:bg-transparent"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("next")}
              disabled={!canNext}
              className="w-12 h-12 rounded-full border cursor-pointer border-white/10 flex items-center justify-center transition-all text-white disabled:opacity-20 hover:bg-white hover:text-black disabled:hover:bg-transparent"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-8 overflow-x-auto pl-8 md:pl-16 pr-8 no-scrollbar scroll-smooth"
          style={{ scrollSnapType: "x proximity" }}
        >
          {localizedProducts.map((product, i) => (
            <div key={product.id} style={{ scrollSnapAlign: "start" }}>
              <ProductCard product={product} index={i} />
            </div>
          ))}
          <div className="flex-none w-8 md:w-16" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
