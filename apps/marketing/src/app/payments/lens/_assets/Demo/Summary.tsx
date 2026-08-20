import RiskGauge from '@/shared/ui/RiskGuage'
import { Summary, TriangleAlert } from 'lucide-react'
import React from 'react'

export default function RiskSummary() {
    return (
        <div className='bg-background border border-gray-300 dark:border-zinc-600 p-6 rounded-xl w-fit'>
            <h2 className='flex gap-2 items-center mb-6 font-medium text-xl'><Summary /> Risk Summary</h2>

            <div className='flex items-center border border-gray-300/50 dark:border-zinc-600/50 px-3 py-1 w-fit rounded-xl'>
                <div className='flex flex-col gap-0.5 pl-3.5'>
                    <p>Risk Of Fraud</p>
                    <span className='text-2xl font-medium text-rose-500'>High</span>
                </div>

                <div className='scale-75'>
                    <RiskGauge />
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <h2 className='text-xl'>Warning Description</h2>

                <p className='flex items-center gap-2 text-rose-500'>
                    <TriangleAlert className='text-red-500' />
                    Linked To Fraudulent Accounts
                </p>

                <p className='flex items-center gap-2 text-rose-500'>
                    <TriangleAlert />
                    Dispute History
                </p>
            </div>

            <div className='my-5'>
                <h2 className='text-xl font-medium'>Signals</h2>
                <p className=''>- Negative Balance</p>
            </div>

            <div className='my-5'>
                <h2 className='text-xl font-medium'>Attributes</h2>
                <p>- Suspicious Activity</p>
                <p>- Unusual Time-Zone Based Activity</p>
            </div>
        </div>
    )
}
