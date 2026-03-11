"use client";
import React from "react";
import {useDict} from "@/shared/hooks/useDict";

export default function AccountList({ className }: { className?: string }) {
    const dict = useDict();

    const accounts = Object.entries(dict?.charts?.AccountList?.accounts ?? {});

    return (
        <div className={`w-92 lg:w-100 2xl:w-92 xl:w-92 md:w-92 sm:w-92 max-[620px]:w-70 max-[330px]:w-50 select-none bg-white dark:bg-zinc-900 rounded-4xl md:rounded-4xl border border-zinc-200 dark:border-white/5 shadow-xl overflow-hidden ${className}`}>
            <div className="p-4 md:p-5 pb-2 md:pb-3 flex justify-between items-end">
                <h3 className="text-[20px] md:text-[15px] font-bold text-zinc-400">{dict.charts.AccountList?.text1}</h3>
                <span className="text-[10px] text-emerald-500 font-medium md:hidden">{dict.charts.AccountList?.text2}</span>
            </div>

            <div className="px-2 pb-4 space-y-0.5 md:space-y-1">
                {accounts.map(([id, acc]) => (
                    <div key={id} className="flex items-center justify-between p-2.5 md:p-3 rounded-xl md:rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                        <div className="flex flex-col min-w-0 pr-2">
                            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none mb-1 truncate">
                                {acc.name}
                            </span>
                            <div className="flex items-center gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${acc.status === dict.charts.AccountList.status1 ? 'bg-emerald-500' : acc.status === dict.charts.AccountList.status2 ? 'bg-rose-500' : 'bg-blue-500 animate-pulse'}`} />
                                <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 capitalize">
                                    {acc.status}
                                </span>
                            </div>
                        </div>
                        <span className="text-sm font-black text-zinc-900 dark:text-zinc-100 tabular-nums shrink-0">
                            {acc.balance}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}