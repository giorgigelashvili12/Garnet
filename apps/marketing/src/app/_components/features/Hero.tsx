"use client";

import Header from '@/shared/components/Header/Header'
import { Waves } from '@/shared/ui/Waves'
import React, { useEffect, useState } from 'react'
import Info from '../assets/Info'

export default function Hero() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className='relative min-h-screen w-full flex items-center justify-center overflow-x-hidden bg-background'>
            <Header />

            <div className='absolute inset-0 w-full h-full z-0 pointer-events-none'>

                <Waves />

                <div className='absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background'/>
                {isMobile && (
                    <div className="absolute inset-0 bg-radial-at-t from-emerald-500/10 via-transparent to-transparent" />
                )}
            </div>

            <Info />
        </div>
    )
}
