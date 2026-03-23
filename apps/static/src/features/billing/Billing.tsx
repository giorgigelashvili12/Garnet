"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {BillingTrigger} from "@/features/billing/assets/Trigger";
import {BillingPopup} from "@/features/billing/assets/Popup";

export default function Billing() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsOpen(true)} className="cursor-pointer">
                <BillingTrigger/>
            </div>

            <AnimatePresence mode="wait">
                {isOpen && <BillingPopup onClose={() => setIsOpen(false)} />}
            </AnimatePresence>
        </>
    );
}
