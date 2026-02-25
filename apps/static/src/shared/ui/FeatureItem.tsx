import {ReactNode} from "react";

export default function FeatureItem({ icon, title, desc }: { icon: ReactNode, title: string, desc: string }) {
    return (
        <div className="flex gap-4 md:gap-6">
            <div className="shrink-0 p-3 md:p-4 h-fit rounded-xl md:rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                {icon}
            </div>
            <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
                <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-snug md:leading-relaxed max-w-md">
                    {desc}
                </p>
            </div>
        </div>
    );
}