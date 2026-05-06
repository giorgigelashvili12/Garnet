"use client";

import { useDict } from "@/shared/hooks/useDict";
import { StatItem } from "@/shared/components/Sections/StatItem";

export default function Stats() {
    const dict = useDict();
    const t = dict.features.stats;

    return (
        <div className="w-full bg-white dark:bg-(--background) py-24 px-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-6xl font-bold text-[#0a2540] dark:text-(--foreground) leading-tight tracking-tight whitespace-pre-line">
                        {t.title} <br/> <span className="text-base md:text-xl -top-10">{t.sooner}</span>
                    </h2>
                </div>

                <div className="grid transition-all duration-500 ease-out grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-y border-slate-100">
                    <StatItem 
                        value="2" 
                        label={t.stat1} 
                    />
                    <StatItem 
                        value="$0" 
                        label={t.stat2} 
                    />
                    <StatItem 
                        value="99.999%" 
                        label={t.stat3} 
                    />
                    <StatItem 
                        value="1" 
                        label={t.stat4} 
                    />
                </div>
            </div>
        </div>
    )
}