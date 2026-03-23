import React, { useState } from 'react';
import { useDict } from "@/shared/hooks/useDict";

export const Fund = () => {
    const dict = useDict();
    const t = dict.charts.Fund;

    const min = 12500;
    const max = 25000;
    const feeRate = 0.10;

    const [offerAmount, setOfferAmount] = useState(22500);

    const financingFee = offerAmount * feeRate;
    const percentage = ((offerAmount - min) / (max - min)) * 100;

    return (
        <div className="w-80 h-full max-w-md mx-auto bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 font-sans transition-colors duration-200 select-none pointer-events-none flex flex-col justify-between">

            <div>
                <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-zinc-50 leading-tight">
                    {t.title}
                </h2>

                <div className="space-y-5">
                    <div>
                        <label className="block text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-2">
                            {t.labelOffer}
                        </label>
                        <div className="inline-block border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 min-w-[120px] bg-zinc-50/50 dark:bg-zinc-800/50">
                            <span className="text-lg font-bold text-zinc-900 dark:text-emerald-400">
                                ${offerAmount.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="relative pt-2 pb-4">
                        <input
                            readOnly
                            type="range"
                            min={min}
                            max={max}
                            step={100}
                            value={offerAmount}
                            className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-emerald-500 bg-transparent"
                            style={{
                                background: `linear-gradient(to right, #10b981 0%, #10b981 ${percentage}%, #27272a ${percentage}%, #27272a 100%)`
                            }}
                        />
                        <div className="flex justify-between mt-3 text-zinc-400 dark:text-zinc-500 font-medium text-[10px] uppercase tracking-wider">
                            <span>${min.toLocaleString()}</span>
                            <span>${max.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400">{t.labelFinancingAmount}</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-200">${offerAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400">{t.labelFee}</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-200">${financingFee.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};