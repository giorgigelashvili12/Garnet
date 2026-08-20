import { Sparkle } from 'lucide-react'
import React from 'react'

export default function Model() {
    return (
        <div className='bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-[#1b2733] text-slate-900 dark:text-white p-5 rounded-2xl max-w-xl font-sans shadow-xl'>
            <div className='flex gap-3 items-center pb-4 border-b border-slate-200 dark:border-[#1b2733]'>
                <div className='bg-emerald-50 dark:bg-[#132826] p-2 rounded-xl border border-emerald-200 dark:border-[#1b3d36] flex items-center justify-center'>
                    <Sparkle className='bg-emerald-500 text-white rounded-xl p-1 h-6 w-6' />
                </div>
                <span className='text-lg font-medium tracking-tight'>Models:</span>
            </div>

            <div className='flex flex-wrap gap-2 pt-4'>
                <div className='bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors'>
                    Payments
                </div>

                <div className='bg-slate-100 hover:bg-slate-200 dark:bg-[#131d27] dark:hover:bg-[#1b2733] text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white border border-slate-200 dark:border-[#1b2733] px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors'>
                    Disputes
                </div>

                <div className='bg-slate-100 hover:bg-slate-200 dark:bg-[#131d27] dark:hover:bg-[#1b2733] text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white border border-slate-200 dark:border-[#1b2733] px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors'>
                    Refunds
                </div>
            </div>
        </div>
    )
}