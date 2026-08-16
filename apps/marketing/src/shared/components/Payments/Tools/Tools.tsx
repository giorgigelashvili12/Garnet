import React from 'react'
import Dashboard from '../Interface/Dashboard'

export default function Tools() {
    return (
        <div className='mx-60 mt-20'>
            <div className='flex flex-col gap-5 mb-6'>
                <h1 className='text-emerald-400 font-bold text-2xl'>Checkout Studio</h1>
                <h2 className='text-5xl font-medium w-190'>Everything for building, designing and implementing your checkout pages</h2>

                <div className='flex items-center justify-between'>
                    <p className='w-100'><b>Configure</b> and add new checkout configurations visually with Garnet Checkout Studio</p>
                    <p className='w-100'><b>Monitor</b> reportings, get updates and track checkout performance</p>
                    <p className='w-100'><b>Optimize</b>, get recommendations to maximize the experience for your customers</p>
                </div>
            </div>

            <div className='rounded-xl'>
                <Dashboard />
            </div>
        </div>
    )
}
