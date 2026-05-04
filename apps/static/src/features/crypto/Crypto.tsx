"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import CryptoTrigger from "./assets/Trigger";
import { CryptoPopup } from "./assets/Popup";

export default function Crypto() {
    const [isOpen, setIsOpen] = useState(false);
 
    return (
        <div>
            <div onClick={() => setIsOpen(true)} className="cursor-pointer">
                <CryptoTrigger/>
            </div>

            <AnimatePresence mode="wait">
                {isOpen && <CryptoPopup onClose={() => setIsOpen(false)}/> }
            </AnimatePresence>
        </div>
    )
}