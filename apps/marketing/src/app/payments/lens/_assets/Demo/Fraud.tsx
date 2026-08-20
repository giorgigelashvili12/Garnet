import React from 'react'

export default function Fraud() {
    return (
        <div className='bg-background p-4 flex flex-col gap-2 w-130 border border-gray-300 rounded-xl dark:border-zinc-700 h-fit'>
            <h2 className='mb-4 font-medium'>Payment Analysis</h2>

            <div className='flex justify-between border-b pb-3'>
                <span>Bot Abuse</span>
                <div className='flex gap-4 items-center'>
                    <span className='border border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-sm'>Low Risk</span>
                    <span className='font-medium'>28</span>
                </div>
            </div>

            <div className='flex justify-between border-b pb-3'>
                <span>Early Fraud Warning</span>
                <div className='flex gap-4 items-center'>
                    <span className='border border-amber-500 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-sm'>Medium Risk</span>
                    <span className='font-medium'>58</span>
                </div>
            </div>

            <div className='flex justify-between border-b pb-3'>
                <span>Fraudulent Dispute</span>
                <div className='flex gap-4 items-center'>
                    <span className='border border-red-500 bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded-sm'>High Risk</span>
                    <span className='font-medium'>88</span>
                </div>
            </div>
        </div>
    ) 
}
