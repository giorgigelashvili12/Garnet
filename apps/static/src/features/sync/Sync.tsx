"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import SyncTrigger from "./assets/Trigger";

export default function Sync() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div>
                <SyncTrigger/>
            </div>

            <AnimatePresence mode="wait">
                {isOpen}
            </AnimatePresence>
        </div>
    )
}