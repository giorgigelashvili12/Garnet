"use client";

import Header from '@/shared/components/Header/Header'
import { ScrollProgress } from '@/shared/ui/ScrollProgress'
import React from 'react'
import Background from './_components/Background'
import Footer from '@/shared/components/Global/Footer'
import Hero from './_components/assets/Hero'
import Modules from '@/shared/components/Payments/Modules/Modules';
import CheckoutDemo from '@/shared/components/Payments/Interface/CheckoutDemo';
import Tools from '@/shared/components/Payments/Tools/Tools';
import DevLangugages from '@/shared/components/Payments/Interface/Dev/Dev';
import Pricing from '@/shared/components/Payments/Pricing/Pricing';

export default function Payments() {
    return (
        <div className="bg-background min-h-screen max-[900px]:p-0 max-[900px]:m-0">
            <Header />

            <ScrollProgress
                className="fixed top-18 z-50 bg-[linear-gradient(90deg,rgba(42,155,104,1)_0%,rgba(87,199,133,1)_50%,rgba(109,237,83,1)_100%)] h-1"
            />

            <div className='relative w-full overflow-x-clip px-4 sm:px-8 lg:px-16 pb-12 gradient flex items-center justify-center min-h-screen'>
                <div className='w-full max-w-7xl flex items-center justify-center text-center'>
                    <Hero />
                </div>
            </div>

            <div className='relative z-10 -mt-120 max-[1635px]:-mt-200 max-[438px]:-mt-100'>
                <Background />
            </div>

            <Modules />

            <CheckoutDemo />

            <Tools />

            <div className=''>
                <DevLangugages />
            </div>

            <Pricing />

            <Footer />
        </div>
    )
}
