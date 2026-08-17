import React from 'react'
import Dashboard from '../Interface/Dashboard'

export default function Tools() {
    return (
        <div className='mx-60 mt-20 min-[1517px]:mx-30 max-[1201px]:flex max-[1201px]:flex-col max-[1201px]:mx-0 max-[1201px]:items-center max-[763px]:px-10 max-[409px]:scale-80'>
            <div className='flex flex-col gap-5 mb-6'>
                <h1 className='text-emerald-400 font-bold text-2xl max-[763px]:text-xl'>Checkout Studio</h1>
                <h2 className='text-5xl font-medium w-190 max-[763px]:text-3xl max-[763px]:w-fit'>Everything for building, designing and implementing your checkout pages</h2>

                <div className='flex items-center justify-between max-[1406px]:flex-col max-[1406px]:gap-10 max-[1406px]:items-start max-[1406px]:mt-5'>
                    <p className='w-100'><b>Configure</b> and add new checkout configurations visually with Garnet Checkout Studio</p>
                    <p className='w-100'><b>Monitor</b> reportings, get updates and track checkout performance</p>
                    <p className='w-100'><b>Optimize</b>, get recommendations to maximize the experience for your customers</p>
                </div>
            </div>

            <div className='rounded-xl max-[1471px]:hidden'>
                <Dashboard />
            </div>
        </div>
    )
}
