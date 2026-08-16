import Logo from '@/shared/components/Logo'
import Image from 'next/image'
import React from 'react'

export default function Cart() {
    return (
        <div>
            <div className='border-b border-gray-300 pb-2 dark:border-gray-700'>
                <div className='flex justify-between items-center py-1 gap-5'>
                    <div className='flex items-center gap-2'>
                        <span className='px-2.5 border rounded-full bg-emerald-200/50 border-emerald-800 text-emerald-800 group: dark:bg-emerald-800/50 dark:text-emerald-300 dark:border-emerald-300'>1</span>
                        <span>Cart</span>
                    </div>
                    
                    <hr className='w-full h-0.5 bg-gray-300 dark:opacity-10' />

                    <div className='flex items-center gap-2 grayscale-100 opacity-50'>
                        <span className='px-2 border rounded-full bg-emerald-200/50 border-emerald-800 text-emerald-800 group: dark:bg-emerald-800/50 dark:text-emerald-300 dark:border-emerald-300'>2</span>
                        <span>Review</span>
                    </div>

                    <hr className='w-full h-0.5 bg-gray-300 dark:opacity-10' />

                    <div className='flex items-center gap-2 grayscale-100 opacity-50'>
                        <span className='px-2 border rounded-full bg-emerald-200/50 border-emerald-800 text-emerald-800 group: dark:bg-emerald-800/50 dark:text-emerald-300 dark:border-emerald-300'>3</span>
                        <span>Checkout</span>
                    </div>
                </div>
            </div>

            <div>
                <h1 className='text-xl mb-4 mt-3'>Cart</h1>

                <div className='flex gap-2 text-left border rounded-xl border-gray-300 dark:border-gray-700 w-fit p-3'>
                    <Image
                        src="/product.png"
                        width={100}
                        height={100}
                        alt="Product"
                        className='rounded-xl'
                    />

                    <div className="flex flex-col gap-1 text-left">
                        <span className="font-semibold text-base text-slate-700 dark:text-white">Green Apple</span>
                        <span className="text-xs text-slate-400 font-medium">Quantity: <span className="text-slate-700 dark:text-white">5</span></span>
                        <span className="text-sm font-bold text-emerald-400 mt-1">$7.50</span>
                    </div>
                </div>
            </div>

            <div className='bg-white mt-4 dark:bg-background border-t border-gray-200 dark:border-zinc-800 py-3.5 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-zinc-500'>
                <span className='-mr-9.5 mt-0.5'>Powered By</span>
                <div className='flex items-center opacity-80 dark:brightness-120 scale-50'>
                    <Logo />
                </div>
            </div>
        </div>
    )
}
