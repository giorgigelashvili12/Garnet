"use client";

import POS from "@/shared/widgets/POS";
import Web from "@/shared/widgets/Web";
import DotWave from "@/shared/ui/dotwave";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PaymentPopup from "@/pages/payments/assets/Popup";

export default function Payments() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-full overflow-x-hidden">
            <div className="text-center mb-10 md:-mb-30 relative z-20 px-6 pt-16 md:pt-20">
                <span className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tighter text-slate-900 dark:text-white leading-tight block max-w-4xl mx-auto">
                    Accept payments globally online, simplify your checkout experience.
                </span>
            </div>

            <div className='relative min-h-[70vh] md:min-h-screen w-full select-none'
                 style={{
                     maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                     WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
                 }}>

                <div className='absolute inset-0 z-0 pointer-events-none'>
                    <DotWave color='#10b981' opacity={0.5}/>
                </div>

                <motion.div className='relative z-10 cursor-pointer pointer-events-auto flex items-center justify-center' onClick={() => setIsOpen(true)} whileTap={{ scale: 0.98 }}>
                    <div className="block md:hidden scale-90 sm:scale-100 transition-all duration-500">
                        <POS />
                    </div>

                    <div className="hidden md:block md:scale-90 lg:scale-100 transition-transform duration-500 origin-center">
                        <Web />
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <PaymentPopup onClose={() => setIsOpen(false)}/>
                )}
            </AnimatePresence>
        </div>
    )
}