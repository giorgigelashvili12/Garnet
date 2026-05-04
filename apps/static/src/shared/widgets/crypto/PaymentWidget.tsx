"use client";

import React, { useState } from "react";
import { CreditCard, Bitcoin, Wallet, Landmark, ExternalLink } from "lucide-react";
import { useDict } from "@/shared/hooks/useDict";

type PaymentOption = "card" | "crypto" | "cashapp" | "bank";

export default function PaymentWidget() {
  const [selected, setSelected] = useState<PaymentOption>("crypto");

  const dict = useDict();

  const options = [
    { id: "card", label: dict.charts.CryptoWidget.card, icon: CreditCard },
    { id: "crypto", label: dict.charts.CryptoWidget.crypto, icon: Bitcoin },
    { id: "cashapp", label: dict.charts.CryptoWidget.cashapp, icon: Wallet },
    { id: "bank", label: dict.charts.CryptoWidget.bank, icon: Landmark },
  ] as const;

  return (
    <div className="max-w-md select-none w-full bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm font-sans">
      <div className="mb-6">
        <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
          {dict.charts.CryptoWidget.email}
        </label>
        <input
          type="email"
          disabled
          defaultValue="jane@email.com"
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
        />
      </div>

      <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
      {dict.charts.CryptoWidget.paymentMethod}
      </h2>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
        {options.map((option) => {
          const isSelected = selected === option.id;
          const Icon = option.icon;

          return (
            <div key={option.id} className="border-b last:border-b-0 border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setSelected(option.id)}
                className="w-full flex items-center gap-4 p-4 hover:bg-emerald-50/50 dark:hover:bg-emerald-500/5 transition-colors text-left"
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected 
                    ? "border-emerald-500 bg-emerald-500" 
                    : "border-zinc-300 dark:border-zinc-600"
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <div className={`flex items-center gap-3 font-semibold transition-colors ${
                  isSelected ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-600 dark:text-zinc-400"
                }`}>
                  <Icon size={20} strokeWidth={isSelected ? 2.5 : 2} />
                  <span>{option.label}</span>
                </div>
              </button>

              {isSelected && option.id === "crypto" && (
                <div className="px-12 pb-5">
                  <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20">
                    <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                    {dict.charts.CryptoWidget.cryptoNote}
                    </p>
                    <div className="flex gap-3 items-start text-xs text-emerald-700/70 dark:text-emerald-400/70">
                      <ExternalLink size={14} className="mt-0.5 shrink-0" />
                      <p>{dict.charts.CryptoWidget.cryptoRedirect}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}