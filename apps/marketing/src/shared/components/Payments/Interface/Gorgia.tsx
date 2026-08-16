"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../../Logo'

type Step = 'cart' | 'review' | 'checkout'

export default function Gorgia() {
    const [step, setStep] = useState<Step>('cart')

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => {
                if (prev === 'cart') return 'review'
                if (prev === 'review') return 'checkout'
                return 'cart'
            })
        }, 3500)

        return () => clearInterval(interval)
    }, [])

    const stepsInfo = [
        { id: 'cart', label: 'Cart', num: 1 },
        { id: 'review', label: 'Review', num: 2 },
        { id: 'checkout', label: 'Checkout', num: 3 },
    ]

    return (
        <div className='bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex flex-col justify-between rounded-2xl w-150 h-full overflow-hidden shadow-lg transition-colors'>
            <div className='flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900'>
                <div className='relative w-28 h-8 flex items-center'>
                    <Image 
                        src="/gorgia.png"
                        width={120}
                        height={40}
                        alt="Gorgia"
                        className='object-contain dark:brightness-110'
                    />
                </div>

                <div className='flex items-center gap-2 text-xs font-medium'>
                    {stepsInfo.map((s, idx) => {
                        const isActive = step === s.id
                        return (
                            <React.Fragment key={s.id}>
                                {idx > 0 && <div className='w-6 h-px bg-gray-300 dark:bg-zinc-700' />}
                                <div className={`flex items-center gap-1.5 transition-colors duration-300 ${
                                    isActive 
                                        ? 'text-sky-600 dark:text-sky-400 font-semibold' 
                                        : 'text-gray-400 dark:text-zinc-500'
                                }`}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs transition-colors duration-300 ${
                                        isActive 
                                            ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800' 
                                            : 'bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 border-gray-300 dark:border-zinc-700'
                                    }`}>
                                        {s.num}
                                    </div>
                                    <span>{s.label}</span>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>

            <div className='p-6 flex-1 relative overflow-hidden'>
                <AnimatePresence mode='wait'>
                    {step === 'cart' && (
                        <motion.div
                            key='cart'
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className='h-full flex flex-col justify-between'
                        >
                            <h1 className='text-xl font-semibold text-gray-900 dark:text-zinc-100 pb-3 border-b border-gray-200 dark:border-zinc-800'>
                                Items
                            </h1>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5'>
                                <div className='flex items-center gap-3.5 border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/60 p-3 rounded-xl shadow-sm'>
                                    <Image 
                                        src="/product.png"
                                        width={80}
                                        height={80}
                                        alt="Product"
                                        className='rounded-lg object-cover bg-gray-100 dark:bg-zinc-700'
                                    />

                                    <div className="flex flex-col gap-1 text-left">
                                        <h2 className='font-semibold text-gray-900 dark:text-zinc-100 text-base'>Green Apple</h2>
                                        <span className='text-gray-500 dark:text-zinc-400 text-xs'>Quantity: 5</span>
                                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm">$7.50</span>
                                    </div>
                                </div>

                                <div className='flex flex-col justify-center text-xs text-gray-600 dark:text-zinc-300 border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/60 p-4 rounded-xl shadow-sm gap-1.5'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-500 dark:text-zinc-400'>Amount:</span>
                                        <span className='font-medium text-gray-900 dark:text-zinc-200'>$5.00</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-500 dark:text-zinc-400'>Shipping:</span>
                                        <span className='font-medium text-gray-900 dark:text-zinc-200'>$1.00</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-500 dark:text-zinc-400'>Tax:</span>
                                        <span className='font-medium text-gray-900 dark:text-zinc-200'>$0.50</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 'review' && (
                        <motion.div
                            key='review'
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className='h-full flex flex-col justify-between'
                        >
                            <h1 className='text-xl font-semibold text-gray-900 dark:text-zinc-100 pb-3 border-b border-gray-200 dark:border-zinc-800'>
                                Order Summary
                            </h1>

                            <div className='bg-white dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm mt-5 text-sm space-y-2.5'>
                                <div className='flex justify-between text-gray-600 dark:text-zinc-300'>
                                    <span>Subtotal</span>
                                    <span className='font-medium text-gray-900 dark:text-zinc-100'>$5.00</span>
                                </div>
                                <div className='flex justify-between text-gray-600 dark:text-zinc-300'>
                                    <span>Estimated Shipping</span>
                                    <span className='font-medium text-gray-900 dark:text-zinc-100'>$1.00</span>
                                </div>
                                <div className='flex justify-between text-gray-600 dark:text-zinc-300'>
                                    <span>Tax</span>
                                    <span className='font-medium text-gray-900 dark:text-zinc-100'>$0.50</span>
                                </div>
                                <div className='border-t border-gray-200 dark:border-zinc-700 pt-2.5 flex justify-between font-semibold text-gray-900 dark:text-zinc-100 text-base'>
                                    <span>Total</span>
                                    <span className='text-emerald-600 dark:text-emerald-400'>$6.50</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 'checkout' && (
                        <motion.div
                            key='checkout'
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className='h-full flex flex-col justify-between'
                        >
                            <h1 className='text-xl font-semibold text-gray-900 dark:text-zinc-100 pb-3 border-b border-gray-200 dark:border-zinc-800'>
                                Payment Information
                            </h1>

                            <div className='bg-white dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm mt-5 space-y-3 text-left'>
                                <div>
                                    <label className='text-xs text-gray-500 dark:text-zinc-400 block mb-1'>Card Details</label>
                                    <div className='p-2.5 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm bg-gray-50 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 font-mono'>
                                        •••• •••• •••• 4242
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className='bg-white dark:bg-zinc-800/50 border-t border-gray-200 dark:border-zinc-800 py-3.5 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-zinc-500'>
                <span className='-mr-9.5 mt-0.5'>Powered By</span>
                <div className='flex items-center opacity-80 dark:brightness-120 scale-50'>
                    <Logo />
                </div>
            </div>
        </div>
    )
}
