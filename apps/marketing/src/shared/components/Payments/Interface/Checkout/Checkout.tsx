"use client";

import Logo from '@/shared/components/Logo'
import Typewriter from '@/shared/ui/Typewriter'
import { ArrowRight, Check } from 'lucide-react'
import React from 'react'
import { CiDeliveryTruck } from 'react-icons/ci'

export default function Checkout() {
    return (
        <div>
            <div className='mb-4'>
                <div className='flex justify-between items-center py-1 gap-5'>
                    <div className='flex items-center gap-2 grayscale-100 opacity-50'>
                        <span className='px-1 border rounded-full bg-emerald-200/50 border-emerald-800 text-emerald-800 group: dark:bg-emerald-800/50 dark:text-emerald-300 dark:border-emerald-300'>
                            <Check className='w-4' />
                        </span>
                        <span>Cart</span>
                    </div>
                    
                    <hr className='w-full h-0.5 bg-gray-300 dark:opacity-10' />

                    <div className='flex items-center gap-2 grayscale-100 opacity-50'>
                        <span className='px-1 border rounded-full bg-emerald-200/50 border-emerald-800 text-emerald-800 group: dark:bg-emerald-800/50 dark:text-emerald-300 dark:border-emerald-300'>
                            <Check className='w-4' />
                        </span>
                        <span>Review</span>
                    </div>

                    <hr className='w-full h-0.5 bg-gray-300 dark:opacity-10' />

                    <div className='flex items-center gap-2'>
                        <span className='px-2 border rounded-full bg-emerald-200/50 border-emerald-800 text-emerald-800 group: dark:bg-emerald-800/50 dark:text-emerald-300 dark:border-emerald-300'>3</span>
                        <span>Checkout</span>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <h1 className='text-2xl font-bold'>Checkout</h1>

                <div>
                    <h2 className='text-xl font-medium mb-3'>Shipping Information</h2>

                    <div className='flex gap-5 items-center'>
                        <div className='flex items-center gap-2 bg-emerald-50 border border-emerald-300 p-2 rounded-xl dark:bg-emerald-100'>
                            <div className='bg-white w-4 h-4 rounded-full border-4 border-emerald-400' />
                            <div className='flex gap-1 items-center'>
                                <CiDeliveryTruck className='font-bold text-emerald-600 dark:text-emerald-800' />
                                <span className='text-emerald-600 dark:text-emerald-800'>Delivery</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-2 border border-gray-300 p-2 rounded-xl dark:border-zinc-600 dark:bg-zinc-300'>
                            <div className='bg-white w-4 h-4 rounded-full border-2 border-gray-400' />
                            <div className='flex gap-1 items-center'>
                                <CiDeliveryTruck className='font-bold text-gray-600' />
                                <span className='text-gray-600'>Delivery</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 mt-4'>
                        <div>
                            <label>First Name <b className='text-red-500'>*</b></label>
                            
                            <div className='border border-gray-300 py-2 px-4 rounded-xl dark:border-zinc-600'>
                                <Typewriter
                                    text="Giorgi Gelashvili"
                                    placeholder="Enter your name..."
                                    delay={1500}
                                    speed={80}
                                />
                            </div>
                        </div>

                        <div>
                            <label>Enter Email Address <b className='text-red-500'>*</b></label>
                            
                            <div className='border border-gray-300 py-2 px-4 rounded-xl dark:border-zinc-600'>
                                <Typewriter
                                    text="mymail@example.com"
                                    placeholder="Enter your email..."
                                    delay={3500}
                                    speed={80}
                                />
                            </div>
                        </div>

                        <div className='mt-3 flex justify-center items-center cursor-pointer'>
                            <span className='gap-1 bg-emerald-400 text-white py-1 rounded-xl w-full flex justify-center items-center dark:bg-emerald-500'>
                                <text>Pay Now</text>
                                <ArrowRight className='w-4.5' />
                            </span>
                        </div>
                    </div>
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
