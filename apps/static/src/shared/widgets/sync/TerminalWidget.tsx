import { Wifi } from "lucide-react";

export const TerminalWidget = () => (
    <div className="relative flex justify-center w-full h-full pt-10">
        {/* Terminal Device */}
        <div className="relative w-[180px] h-[340px] bg-white dark:bg-zinc-900 rounded-3xl border-[6px] border-slate-900 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col items-center z-10 pt-16 mt-4">
            <div className="w-12 h-12 rounded-full border border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 flex items-center justify-center mb-8 shadow-sm">
                <Wifi className="text-slate-700 dark:text-zinc-300 size-6 rotate-90" />
            </div>
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 mb-1">Total</span>
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">$173.88</span>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500">Tap, insert, or swipe to pay</span>
            <div className="absolute -bottom-1 w-[90%] h-8 bg-slate-100 dark:bg-black rounded-b-2xl border-t border-slate-200 dark:border-zinc-800 z-0 opacity-0" />
            <div className="absolute -bottom-2 w-[110%] h-8 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-800 z-10"></div>
        </div>

        {/* Hovering Card */}
        <div className="absolute top-16 right-2 md:-right-2 w-[140px] h-28 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl shadow-[0_15px_30px_rgba(16,185,129,0.3)] dark:shadow-[0_15px_30px_rgba(16,185,129,0.15)] z-20 overflow-hidden transform rotate-12 transition-transform hover:rotate-6 hover:scale-105">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-[22px] bg-amber-100/90 rounded-[4px] border border-amber-300/40" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-xl" />
        </div>
    </div>
);
