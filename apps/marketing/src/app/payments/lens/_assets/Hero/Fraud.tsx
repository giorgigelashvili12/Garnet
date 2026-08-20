import React from 'react'
import { Shield, Check } from 'lucide-react'

export default function Fraud() {
    const recentDecisions = [
        { id: '#48291', merchant: 'Amazon.com', amount: '$2,847', risk: 7, status: 'APPROVED' },
        { id: '#48298', merchant: 'Anon Transfers', amount: '$5,660', risk: 81, status: 'BLOCKED' },
        { id: '#48296', merchant: 'Unknown Vendor', amount: '$8,900', risk: 89, status: 'BLOCKED' },
    ]

    return (
        <div className="w-full max-w-md bg-white dark:bg-[#070d14] text-slate-600 dark:text-gray-300 rounded-2xl border border-slate-200 dark:border-slate-800/60 overflow-hidden font-mono shadow-2xl">
            <div className="p-6">
                <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="text-slate-100 dark:text-slate-800/80"
                                strokeWidth="3"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                className="text-emerald-500 dark:text-emerald-400"
                                strokeDasharray="7, 100"
                                strokeWidth="3"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-xl font-bold text-slate-900 dark:text-white leading-none">7</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-sans">RISK %</span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-2 text-xs">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-none mb-3 font-sans">$2,847</div>
                        
                        <div className="grid grid-cols-2 gap-y-1 text-[11px] pt-1">
                            <span className="text-slate-400 dark:text-slate-500 font-sans">Merchant</span>
                            <span className="text-right text-slate-700 dark:text-slate-300 font-sans truncate">Amazon.com</span>
                            
                            <span className="text-slate-400 dark:text-slate-500 font-sans">Card</span>
                            <span className="text-right text-slate-700 dark:text-slate-300 font-mono">••• 4821</span>
                            
                            <span className="text-slate-400 dark:text-slate-500 font-sans">Origin</span>
                            <span className="text-right text-slate-700 dark:text-slate-300">US · 0.9ms</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-2">
                    <div className="w-full py-1.5 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 tracking-wide">
                        <Check className="w-3.5 h-3.5" />
                        APPROVED
                    </div>
                </div>
            </div>

            <div className="px-6 pt-4 pb-2 border-t border-slate-100 dark:border-slate-800/60">
                <div className="text-[10px] tracking-wider text-slate-400 dark:text-slate-500 font-semibold mb-3">RECENT DECISIONS</div>
                
                <div className="space-y-4">
                    {recentDecisions.map((item) => {
                        const isApproved = item.status === 'APPROVED'
                        return (
                            <div key={item.id} className="flex items-center justify-between text-xs">
                                <div>
                                    <div className="text-slate-400 dark:text-slate-500 text-[11px]">
                                        {item.id} <span className="text-slate-300 dark:text-slate-600">·</span> <span className="text-slate-600 dark:text-slate-400 font-sans">{item.merchant}</span>
                                    </div>
                                    <div className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5">{item.amount}</div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-end gap-1 w-16">
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${isApproved ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-red-500'}`}
                                                style={{ width: `${item.risk}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.risk}%</span>
                                    </div>

                                    <span className={`text-[11px] font-semibold w-16 text-right ${isApproved ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="grid grid-cols-3 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/40 text-center divide-x divide-slate-100 dark:divide-slate-800/60 py-4 mt-4">
                <div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white font-sans">99.8%</div>
                    <div className="text-[11px] text-slate-500 font-sans mt-0.5">accuracy</div>
                </div>
                <div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white font-sans">1.2ms</div>
                    <div className="text-[11px] text-slate-500 font-sans mt-0.5">avg latency</div>
                </div>
                <div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white font-sans">$47k</div>
                    <div className="text-[11px] text-slate-500 font-sans mt-0.5">saved today</div>
                </div>
            </div>
        </div>
    )
}