"use client";

import {motion} from "framer-motion";
import { useState, useEffect } from "react";

import {ProgressBarProps} from "@/shared/lib/@types";

export function ProgressBar({ timeline, delays }: ProgressBarProps) {
    const [stepU, setStep] = useState(0);
    const currentProgress = timeline[stepU] ?? timeline[timeline.length - 1] ?? 0;

    useEffect(() => {
        let isMounted = true;

        const sequence = async () => {
            for (let i = 0; i < delays.length; i++) {
                await new Promise((r) => setTimeout(r, delays[i]));
                if (!isMounted) return;
                setStep(i + 1);
            }
        };

        void sequence();

        return () => {
            isMounted = false;
        };
    }, [delays]);

    return (
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden shadow-inner">
            <motion.div
                initial={{ width: `${timeline[0]}%` }}
                animate={{ width: `${currentProgress}%` }}
                transition={{
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full rounded-full bg-linear-to-r from-emerald-500 via-lime-400 to-emerald-300 bg-[length:200%_auto] animate-pulse"
            />
        </div>
    );
}