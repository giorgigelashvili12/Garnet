"use client";
import React from "react";
import {useDict} from "@/shared/hooks/useDict";

export default function AccountList({ className }: { className?: string }) {
    const dict = useDict();
    const accounts = Object.entries(dict?.charts?.AccountList?.accounts ?? {});

    const getStatusStyles = (status: string) => {
        const s = status?.toLowerCase();
        if (s?.includes("enab") || s?.includes("აქტ") || s?.includes("akt"))
            return "bg-[#e2f5d8] text-[#43742f] border-[#c0e6ad]";
        if (s?.includes("rev") || s?.includes("განხ") || s?.includes("prüf"))
            return "bg-[#e0f3ff] text-[#4b91b5] border-[#b8e1f9]";
        if (s?.includes("rej") || s?.includes("უარ") || s?.includes("abge"))
            return "bg-[#fde3e6] text-[#b34045] border-[#f9c0c3]";

        return "bg-gray-100 text-gray-600 border-gray-200 dark:bg-zinc-800 dark:text-zinc-400";
    };

    return (
        <div className={`w-full bg-white dark:bg-zinc-900 transition-colors ${className} pointer-events-none select-none`}>
            <h2 className="text-[24px] font-bold text-[#1a273b] dark:text-white mb-10 tracking-tight">
                {dict.charts.AccountList?.title || "Connected accounts"}
            </h2>

            <div className="w-full">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="text-[#6a7383] dark:text-zinc-500 text-[14px] font-medium border-b border-[#f0f2f5] dark:border-zinc-800">
                        <th className="pb-4 font-semibold text-left w-2/5">Account</th>
                        <th className="pb-4 font-semibold text-left w-1/4">Account status</th>
                        <th className="pb-4 font-semibold text-right">Payment balance</th>
                    </tr>
                    </thead>
                    <tbody className="text-[#4f5b76] dark:text-zinc-300">
                    {accounts.map(([id, acc]: [string, any]) => (
                        <tr key={id} className="border-b border-[#f0f2f5] dark:border-zinc-800 last:border-0">
                            <td className="py-5 text-[15px] font-medium text-[#1a273b] dark:text-zinc-100">
                                {acc.name}
                            </td>

                            <td className="py-5">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[13px] font-medium border ${getStatusStyles(acc.status)}`}>
                                        {acc.status}
                                    </span>
                            </td>

                            <td className="py-5 text-[15px] font-medium text-[#6a7383] dark:text-zinc-400 text-right tabular-nums">
                                {acc.balance}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}