"use client";
import React from "react";

const accounts = [
    { id: "1", name: "Gleason Group", status: "Enabled", balance: "$5,502" },
    { id: "2", name: "Torp Group", status: "Enabled", balance: "$380" },
    { id: "3", name: "Lynch Inc", status: "In review", balance: "$933" },
    { id: "4", name: "Conroy Hammes", status: "Enabled", balance: "$168" },
    { id: "5", name: "Stehr LLC", status: "Rejected", balance: "$608" },
    { id: "6", name: "Larkin and Sons", status: "Enabled", balance: "$1,320" },
];

export default function AccountList({ className }: { className?: string }) {
    return (
        <div className={`w-92 lg:w-100 2xl:w-92 xl:w-92 md:w-92 sm:w-92 max-[620px]:w-70 max-[330px]:w-50 select-none bg-white dark:bg-zinc-950 rounded-4xl md:rounded-4xl border border-zinc-200 dark:border-white/5 shadow-xl overflow-hidden ${className}`}>
            <div className="p-4 md:p-5 pb-2 md:pb-3 flex justify-between items-end">
                <h3 className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest">Accounts</h3>
                <span className="text-[10px] text-emerald-500 font-medium md:hidden">Live Updates</span>
            </div>

            <div className="px-2 pb-4 space-y-0.5 md:space-y-1">
                {accounts.map((acc) => (
                    <div key={acc.id} className="flex items-center justify-between p-2.5 md:p-3 rounded-xl md:rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                        <div className="flex flex-col min-w-0 pr-2">
                            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none mb-1 truncate">
                                {acc.name}
                            </span>
                            <div className="flex items-center gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${acc.status === 'Enabled' ? 'bg-emerald-500' : acc.status === 'Rejected' ? 'bg-rose-500' : 'bg-blue-500 animate-pulse'}`} />
                                <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 capitalize">{acc.status}</span>
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