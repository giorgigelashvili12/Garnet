import InteractiveGrid from '@/shared/ui/InteractiveGrid'
import React from 'react'

const StatItem = ({ value, label }: { value: string; label: string }) => {
    return (
        <div className="group transition-all duration-500 ease-out relative flex flex-col items-center justify-center p-8 cursor-default bg-background/70">
            <div className="absolute top-0 left-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-all duration-500 ease-out group-hover:w-full group-hover:left-0" />
        
            <h3 className="text-5xl font-bold text-slate-900 dark:text-(--foreground) mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                {value}
            </h3>
            <p className="text-slate-500 dark:text-(--foreground) text-sm font-medium text-center max-w-[180px] leading-relaxed">
                {label}
            </p>
  
            <div className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-all duration-500 ease-out group-hover:w-full group-hover:left-0" />
      </div>
    );
};
  

export default function Stats() {
    return (
        <section className="w-full py-12 md:py-20 px-4 md:px-8">
            <InteractiveGrid className="max-w-7xl mx-auto rounded-3xl p-8 md:p-16 border border-border/60 shadow-2xl overflow-hidden">
        
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-medium text-foreground tracking-tight leading-tight">
                    Designed for scale and reliability
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatItem 
                    value="2" 
                    label="Currencies and payment methods supported" 
                />
                <StatItem 
                    value="$0" 
                    label="In total payments volume processed" 
                />
                <StatItem 
                    value="99.999%" 
                    label="Historical uptime for Garnet services" 
                />
                <StatItem 
                    value="1" 
                    label="Active subscriptions currently managed" 
                />
            </div>

        </InteractiveGrid>
    </section>
    )
}
