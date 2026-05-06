"use client";

import { ProductCardProps } from "@/shared/@types";
import { useState } from "react";
import { useDict } from "@/shared/hooks/useDict";

export default function ProductCard({ product, index }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const dict = useDict();

  return (
    <article
      className="group relative flex-none w-[300px] md:w-[340px] cursor-pointer bg-slate-700 rounded-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ 
        animation: 'fadeInUp 0.6s ease-out forwards',
        animationDelay: `${index * 100}ms`,
        opacity: 0 
      }}
    >
      <div
        className="relative overflow-hidden mb-4 transition-transform duration-500 ease-out"

        style={{
          backgroundColor: product.accentColor === "#2C2926" ? "#F5F2EF" : product.accentColor,
          aspectRatio: "4/3",
          borderRadius: "2px",
          transform: hovered ? "scale(1.015)" : "scale(1)",
        }}
      >

        <div className="absolute inset-0 p-6 flex items-center justify-center rounded-xl">
          <div
            className="w-full h-full transition-transform duration-700 ease-out rounded-xl"
            style={{ transform: hovered ? "scale(1.05) translateY(-4px)" : "scale(1) translateY(0)" }}
          >
            {product.component}
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-500 rounded-xl"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(0,0,0,0.05) 100%)",
            opacity: hovered ? 1 : 0.4
          }}
        />
      </div>

      <div className="space-y-2 px-2.5 pb-2.5">
        <div className="flex flex-col gap-1">
          {product.badge && (
            <span
              className="w-fit text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded bg-emerald-600 text-white mb-1"
            >
              {product.badge}
            </span>
          )}
          <h3 className="text-[17px] font-semibold tracking-tight text-white">
            {product.name}
          </h3>
        </div>

        <p className="text-[14px] leading-snug text-slate-400 font-normal line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-2">
          <span className="text-[15px] font-bold text-white">
            {product.price}
          </span>
          <span
            className={`text-[13px] font-medium flex items-center gap-1 transition-all duration-300 ${
              hovered ? "text-emerald-400 translate-x-1" : "text-slate-300"
            }`}
          >
            {dict.business.hardware.learnMore} 
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
