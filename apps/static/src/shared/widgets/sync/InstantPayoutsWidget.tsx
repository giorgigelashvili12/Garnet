export const InstantPayoutsWidget = () => (
    <div className="relative w-full h-full flex justify-center items-end pb-0">
        <div className="w-[85%] bg-white dark:bg-zinc-950 rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-5px_30px_rgba(0,0,0,0.2)] p-5 md:p-6 flex flex-col gap-4 border border-slate-100 dark:border-zinc-800 mt-12 bg-gradient-to-b from-white dark:from-zinc-950 to-slate-50/50 dark:to-zinc-900 relative overflow-hidden">
            <h3 className="font-semibold text-slate-900 dark:text-white text-[17px] mb-1">Pay out funds</h3>

            <div className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold text-slate-900 dark:text-zinc-300">Pay out</span>
                <div className="border border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-xl p-3 px-3.5 flex items-start gap-2.5 shadow-sm transform transition-all duration-300 hover:scale-[1.02]">
                    <div className="mt-0.5 w-3.5 h-3.5 rounded-full border-[4px] border-emerald-500 bg-white dark:bg-zinc-900 min-w-[14px]" />
                    <div className="flex flex-col gap-1.5 text-left">
                        <span className="text-sm font-semibold text-emerald-900 dark:text-emerald-400 leading-none">Instant</span>
                        <span className="text-[10px] text-emerald-700/80 dark:text-emerald-500/80 leading-tight">
                            You can payout up to $538.24 which arrives instantly.
                        </span>
                    </div>
                </div>

                <div className="border border-transparent hover:border-slate-200 dark:hover:border-zinc-800 rounded-xl p-3 px-3.5 flex items-start gap-2.5 transition-all duration-300 cursor-pointer">
                    <div className="mt-0.5 w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-zinc-700 min-w-[14px]" />
                    <div className="flex flex-col gap-1.5 text-left">
                        <span className="text-sm font-semibold text-slate-700 dark:text-zinc-400 leading-none">Standard</span>
                        <span className="text-[10px] text-slate-500 dark:text-zinc-500 leading-tight">
                            You can payout up to $575.28 which arrives in 1-2 business days.
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
                <span className="text-[11px] font-semibold text-slate-900 dark:text-zinc-300">Pay out to</span>
                <div className="px-3.5 py-2.5 border border-slate-200/80 dark:border-zinc-800 rounded-xl flex justify-between items-center bg-white dark:bg-zinc-900 shadow-sm">
                    <span className="text-[11px] text-slate-700 dark:text-zinc-300 font-semibold flex items-center gap-2">
                        <span className="text-lg">🏦</span> •••• 1341
                    </span>
                    <span className="text-xs text-slate-400 dark:text-zinc-500">▼</span>
                </div>
            </div>
            
            <div className="flex flex-col gap-2 mt-2">
                <span className="text-[11px] font-semibold text-slate-900 dark:text-zinc-300">Amount</span>
                <div className="px-3.5 py-2.5 border border-slate-200/80 dark:border-zinc-800 rounded-xl flex items-center bg-white dark:bg-zinc-900 shadow-sm text-slate-600 dark:text-zinc-400 text-[11px] font-medium opacity-50">
                    $538.24
                </div>
            </div>
        </div>
    </div>
);
