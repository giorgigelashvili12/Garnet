import React from 'react'

export default function Pricing() {
    return (
        <div className='px-50 mt-20 mb-20 gradient max-[713px]:px-10'>
            <h2 className='font-medium text-3xl text-emerald-400'>Pricing</h2>

            <div className='flex justify-between items-center my-10 max-[1049px]:flex-col max-[1049px]:items-start max-[1049px]:gap-5'>
                <span className='border-l-3 pl-3 border-emerald-400 font-medium'>General Fee</span>

                <span className='text-gray-500'>Per successful transaction</span>

                <span className='bg-gray-50 dark:bg-zinc-900 px-5 py-6 border-l-3 pl-3 border-emerald-400 w-50'>15% + $0.20</span>
            </div>

            <div className='flex items-center justify-between my-10 max-[1049px]:flex-col max-[1049px]:items-start max-[1049px]:gap-5 max-[1049px]:mt-10'>
                <span className='border-l-3 pl-3 border-emerald-400 font-medium'>Custom Domain</span>

                <span className='text-gray-500'>Checkout page hosted on your site (monthly charge)</span>

                <span className='bg-gray-50 dark:bg-zinc-900 px-5 py-6 border-l-3 pl-3 border-emerald-400 w-50'>$10.00</span>
            </div>
        </div>
    )
}
