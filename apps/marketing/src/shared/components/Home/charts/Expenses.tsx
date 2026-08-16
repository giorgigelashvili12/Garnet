import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CATEGORIES = [
    "Airfare and fees",
    "Hotels, motels, and resorts",
    "Public transportation",
    "Parking fees and garages"
];

export const Expenses = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [amount, setAmount] = useState('100.00');

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-100 dark:border-zinc-800 overflow-visible transition-colors duration-200 select-none pointer-events-none">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    Add a spending limit
                </h2>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <label className="block text-zinc-900 dark:text-zinc-200 font-bold mb-3">
                        Limit
                    </label>
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400">$</span>
                            <input
                                readOnly
                                type="text"
                                value={amount}
                                className="w-full pl-7 pr-4 py-2 bg-white dark:bg-zinc-900 border-2 border-emerald-500 dark:border-emerald-500 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none ring-2 ring-emerald-500/20"
                            />
                        </div>

                        <div className="relative flex-1">
                            <div className="w-full h-full flex items-center justify-between px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 shadow-sm">
                                <span>Per month</span>
                                <div className="flex flex-col text-zinc-400 scale-75">
                                    <ChevronUp size={12} />
                                    <ChevronDown size={12} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-zinc-900 dark:text-zinc-200 font-bold mb-3">
                        Applies to categories
                    </label>

                    <div className="w-full flex items-center justify-between px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 shadow-sm transition-all">
                        <span className={selectedCategory === "" ? 'text-zinc-400' : 'text-zinc-900 dark:text-zinc-50'}>
                            {selectedCategory || "Choose"}
                        </span>
                        <div className="flex flex-col text-zinc-400 scale-75">
                            <ChevronUp size={12} />
                            <ChevronDown size={12} />
                        </div>
                    </div>

                    {isOpen && (
                        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden">
                            {CATEGORIES.map((category, index) => (
                                <div
                                    key={index}
                                    className="w-full text-left px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors text-sm font-medium border-b last:border-none border-zinc-50 dark:border-zinc-800"
                                >
                                    {category}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <div className="px-6 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold">
                        Cancel
                    </div>
                    <div className="px-8 py-2.5 rounded-lg bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20">
                        Save
                    </div>
                </div>
            </div>
        </div>
    );
};
