"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import SyncTrigger from "./assets/Trigger";
import SyncPopup from "./assets/Popup";

export default function Sync() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div onClick={() => setIsOpen(true)} className="cursor-pointer">
                <SyncTrigger/>
            </div>

            <AnimatePresence mode="wait">
                {isOpen && <SyncPopup onClose={() => setIsOpen(false)} />}
            </AnimatePresence>
        </div>
    )
}