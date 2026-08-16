import Logo from '@/shared/components/Logo'
import { Check } from 'lucide-react'
import React from 'react'

export default function Review() {
    return (
        <div>
            <div className=''>
                <div className='flex justify-between items-center py-1 gap-5'>
                    <div className='flex items-center gap-2 grayscale-100 opacity-50'>
                        <span className='px-1 border rounded-full bg-emerald-200/50 border-emerald-800 text-emerald-800 group: dark:bg-emerald-800/50 dark:text-emerald-300 dark:border-emerald-300'>
                            <Check className='w-4' />
                        </span>
                        <span>Cart</span>
                    </div>
                    
                    <hr className='w-full h-0.5 bg-gray-300 dark:opacity-10' />

                    <div className='flex items-center gap-2'>
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

            <div className='flex justify-center items-center my-5 py-3'>
                <div  className='flex flex-col border border-gray-300 p-3 rounded-xl dark:border-zinc-800'>
                    <span className='text-gray-500 dark:text-zinc-300'>Amount: <span className='font-medium text-gray-600 dark:text-white'>$5.00</span></span>
                    <span className='text-gray-500 dark:text-zinc-300'>Shipping: <span  className='font-medium text-gray-600 dark:text-white'>$1.00</span></span>
                    <span className='text-gray-500 dark:text-zinc-300'>Tax: <span  className='font-medium text-gray-600 dark:text-white'>$0.50</span></span>
                </div>
            </div>

            <div className='bg-white dark:bg-background border-t border-gray-200 dark:border-zinc-800 py-3.5 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-zinc-500'>
                <span className='-mr-9.5 mt-0.5'>Powered By</span>
                <div className='flex items-center opacity-80 dark:brightness-120 scale-50'>
                    <Logo />
                </div>
            </div>
        </div>
    )
}
