import Header from '@/shared/components/Header/Header'
import { ScrollProgress } from '@/shared/ui/ScrollProgress'
import React from 'react'
import Background from './_assets/Background'
import Hero from './_components/Hero'
import Footer from '@/shared/components/Global/Footer'
import Profiling from './_assets/Profiling/Profiling'
import Demo from './_assets/Demo/Demo'

export default function Lens() {
    return (
        <div className="bg-background min-h-screen max-[900px]:p-0 max-[900px]:m-0 gradient">
            <Header />

            <ScrollProgress
                className="fixed top-18 z-50 bg-[linear-gradient(90deg,rgba(42,155,104,1)_0%,rgba(87,199,133,1)_50%,rgba(109,237,83,1)_100%)] h-1"
            />

            <div className='relative w-full overflow-x-clip px-4 sm:px-8 lg:px-16 pb-12 flex items-center justify-center min-h-screen z-11'>
                <div className='w-full max-w-7xl flex items-center justify-center text-center'>
                    <Hero />
                </div>
            </div>

            <div className='relative z-10 -mt-120 max-[1635px]:-mt-200 max-[438px]:-mt-100'>
                <Background />
            </div>

            <Profiling />

            <Demo />

            <Footer />
        </div>
    )
}
