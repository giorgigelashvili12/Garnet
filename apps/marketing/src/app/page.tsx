"use client";

import React, { useRef } from 'react'
import Hero from './_components/features/Hero'
import Intro from './_components/features/Intro'
import { ScrollProgress } from '@/shared/ui/ScrollProgress'
import Chem from './_components/features/Chem';
import Payments from './_components/features/Payments/Payment';
import Issuing from './_components/features/Issuing/Issuing';
import Crypto from './_components/features/Crypto/Crypto';
import Stats from './_components/features/Stats/Stats';
import Dev from './_components/features/Dev/Dev';
import { Clients } from '@/shared/ui/Clients/Clients';
import Business from './_components/features/Business/Business';
import Footer from '@/shared/components/Global/Footer';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="bg-background min-h-screen max-[900px]:p-0 max-[900px]:m-0">
      <ScrollProgress
        className="fixed top-18 z-50 bg-[linear-gradient(90deg,rgba(42,155,104,1)_0%,rgba(87,199,133,1)_50%,rgba(109,237,83,1)_100%)] h-1"
      />

      <Hero />

      <div className='relative overflow-x-clip bg-background px-50 pb-50 max-[900px]:px-0 max-[900px]:m-0'>
        <div className='border border-(--bar-one)'>
          <div className="absolute -top-47 inset-x-0 h-48 bg-gradient-to-b from-background/20 via-background to-background pointer-events-none z-10" />

            <div className='gradient relative z-0 flex flex-col gap-40'>
              <Intro />

              <Clients />

              <Chem />

              <Payments />
              <Issuing />
              <Crypto />

              <Stats />

              <Dev />
            </div>
          </div>
        </div>

        <div className='z-10 relative overflow-x-clip'>
          <Business />

          <Footer />
        </div>
    </div>
  )
}
