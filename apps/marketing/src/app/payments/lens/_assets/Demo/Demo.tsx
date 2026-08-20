import Image from 'next/image'
import React from 'react'
import Fraud from './Fraud'
import Summary from './Summary'

export default function Demo() {
    return (
        <div className='flex items-center justify-between px-60 my-20'>
            <div className='flex flex-col gap-2 w-100 bg-background border border-gray-300 rounded-xl p-4 dark:border-zinc-700'>
                <h2 className='text-emerald-400 font-medium text-2xl'>Quick Market</h2>

                <p className='text-gray-500 dark:text-gray-200'>Your Cart</p>

                <div className='flex gap-4'>
                    <Image
                        src="/product.png"
                        width={100}
                        height={100}
                        alt="Product"
                    />

                    <div className='flex flex-col gap-1'>
                        <span className='text-xl'>Green Apple</span>
                        <span className='font-medium text-emerald-500'>$2.00</span>
                    </div>
                </div>

                <p className='mt-5'>Card Information</p>
                <div className='border border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl p-3 w-full'>
                    <span>2020 2020 2020 2020</span>
                </div>

                <div className='flex gap-2'>
                    <div className='border border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl p-3 w-full'>
                        <span>3/28</span>
                    </div>

                    <div className='border border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl p-3 w-full'>
                        <span>265</span>
                    </div>
                </div>
            </div>

            <div className='relative flex flex-col items-center justify-center'>
                <div className='absolute z-9 top-30 duration-200 right-80 opacity-90'>
                    <Fraud />
                </div>
                <div className='z-10 pt-8'>
                    <Summary />
                </div>
            </div>
        </div>
    )
}
