"use client";

import {useState} from 'react';
import {AnimatePresence} from "framer-motion";
import dynamic from "next/dynamic";
import IssuingTrigger from "@/features/issuing/assets/Trigger";

const IssuingPopup= dynamic(() => import('@/features/issuing/assets/Popup'), {ssr: false});

export default function Issuing() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='relative'>
            <IssuingTrigger onClick={() => setIsOpen(true)}/>

            <AnimatePresence mode='wait'>
                {isOpen && (
                    <IssuingPopup key='issuing-model-key' onClose={() => setIsOpen(false)}/>
                )}
            </AnimatePresence>
        </div>
    )
}