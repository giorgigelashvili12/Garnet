import React from 'react'
import Model from '../_assets/Hero/Model'
import Fraud from '../_assets/Hero/Fraud'

export default function Hero() {
    return (
        <div className='flex items-center gap-20'>
            <div className='text-left'>
                <h1 className='text-7xl font-bold'>Detect Fraud,</h1>
                <h2 className='text-3xl mt-2 text-emerald-700 dark:text-emerald-200'>Grow Your Revenue, While Garnet Lens Projects It.</h2>
                <p>Attackes are changing day by day, Ganret Lens is here to stop that.</p>
            </div>

            <div className='flex'>
                <Model />

                <Fraud />
            </div>
        </div>
    )
}
