"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MODULES, PaymentModule } from "./constants/Modules";

type Region = "georgia" | "europe";

const TYPE_LABELS: Record<PaymentModule["type"], { label: string; color: string }> = {
    bank_gateway: { label: "Bank Gateway", color: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800" },
    wallet: { label: "Digital Wallet", color: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800" },
    bnpl: { label: "Installments / BNPL", color: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800" },
    bank_transfer: { label: "Bank Transfer", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" },
};

export default function Modules() {
    const [activeRegion, setActiveRegion] = useState<Region>("georgia");
    const [selectedModule, setSelectedModule] = useState<PaymentModule | null>(null);

    const currentModules = MODULES[activeRegion];

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-200 dark:border-zinc-800 pb-6">
                <div>
                    <h2 className="text-5xl font-medium text-gray-900 dark:text-zinc-100">
                        Supported Payment Gateways
                    </h2>
                    <p className="text-xl text-gray-500 dark:text-zinc-400 mt-1">
                        Explore native acquiring partners and regional checkout options.
                    </p>
                </div>

                <div className="flex p-1 bg-gray-100 dark:bg-zinc-800/80 rounded-xl border border-gray-200 dark:border-zinc-700/60 w-fit">
                    <button
                        onClick={() => setActiveRegion("georgia")}
                        className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg cursor-pointer ${
                            activeRegion === "georgia"
                            ? "text-gray-900 dark:text-zinc-100"
                            : "text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200"
                        }`}
                    >
                        {activeRegion === "georgia" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-white dark:bg-zinc-700 shadow-sm rounded-lg"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            Georgia <span className="text-xs opacity-60">({MODULES.georgia.length})</span>
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveRegion("europe")}
                        className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg cursor-pointer ${
                            activeRegion === "europe"
                            ? "text-gray-900 dark:text-zinc-100"
                            : "text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200"
                        }`}
                    >
                        {activeRegion === "europe" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-white dark:bg-zinc-700 shadow-sm rounded-lg"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            Europe <span className="text-xs opacity-60">({MODULES.europe.length})</span>
                        </span>
                    </button>
                </div>
            </div>

            <motion.div
                key={activeRegion}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {currentModules.map((item) => {
                    const badge = TYPE_LABELS[item.type];
                    return (
                        <div
                            key={item.id}
                            onClick={() => setSelectedModule(item)}
                            className="group border border-gray-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 hover:border-gray-300 dark:hover:border-zinc-700 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="relative w-12 h-12 bg-gray-50 dark:bg-zinc-800 rounded-xl p-2 border border-gray-100 dark:border-zinc-700/50 flex items-center justify-center shrink-0">
                                        <Image
                                            src={item.logo}
                                            alt={item.name}
                                            width={40}
                                            height={40}
                                            className="object-contain max-h-8"
                                        />
                                    </div>
                                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${badge.color}`}>
                                        {badge.label}
                                    </span>
                                </div>

                                <h3 className="font-semibold text-gray-900 dark:text-zinc-100 text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                             <div className="mt-5 pt-4 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                                <div>
                                    <span className="text-gray-400 dark:text-zinc-500">Transaction Fee</span>
                                    <p className="font-semibold text-gray-900 dark:text-zinc-200 mt-0.5">
                                        {item.pricing.transactionFee}
                                        {item.pricing.fixedFee && ` + ${item.pricing.fixedFee}`}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <span className="text-gray-400 dark:text-zinc-500">Networks</span>
                                    <p className="font-medium text-gray-600 dark:text-zinc-400 mt-0.5 truncate max-w-[120px]">
                                        {item.supportedNetworks.join(", ")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </motion.div>

            <AnimatePresence>
                {selectedModule && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedModule(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 text-lg p-1"
                            >
                                ✕
                            </button>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-800 rounded-xl p-2 border border-gray-100 dark:border-zinc-700/50 flex items-center justify-center">
                                    <Image src={selectedModule.logo} alt={selectedModule.name} width={40} height={40} className="object-contain max-h-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-zinc-100 text-lg">{selectedModule.name}</h3>
                                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${TYPE_LABELS[selectedModule.type].color}`}>
                                        {TYPE_LABELS[selectedModule.type].label}
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed mb-5">
                                {selectedModule.description}
                            </p>

                            <div className="bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 p-4 rounded-xl space-y-2 text-xs mb-5">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-zinc-400">Variable Fee:</span>
                                    <span className="font-semibold text-gray-900 dark:text-zinc-100">{selectedModule.pricing.transactionFee}</span>
                                </div>
                                {selectedModule.pricing.fixedFee && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-zinc-400">Fixed Fee per Order:</span>
                                        <span className="font-semibold text-gray-900 dark:text-zinc-100">{selectedModule.pricing.fixedFee}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-zinc-400">Monthly Maintenance:</span>
                                    <span className="font-semibold text-gray-900 dark:text-zinc-100">{selectedModule.pricing.monthlyFee}</span>
                                </div>
                            </div>

                            <div>
                                <span className="text-xs font-medium text-gray-500 dark:text-zinc-400 block mb-2">Supported Networks & Rails</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedModule.supportedNetworks.map((net) => (
                                        <span key={net} className="bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 text-xs px-2.5 py-1 rounded-md">
                                            {net}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
