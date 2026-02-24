"use client";

import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {ProgressBarProps} from "@/shared/lib/@types";

export function ProgressBar({timeline, delays}: ProgressBarProps) {
    const [step, setStep] = useState(0);
    const current = timeline[step] ?? timeline[timeline.length - 1] ?? 0;

    useEffect(() => {
        let mounted = true;

        const sequence = async () => {
            for(let i = 0; i < delays.length; i++) {
                await new Promise(r => setTimeout(r, delays[i]));
                if(!mounted) return;
                setStep(step + 1);
            }
        };

        sequence();

        return () => {mounted = false;};
    }, [delays, step]);

    return (
        <div className='w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden shadow-inner'>
            <motion.div initial={{width: `${timeline[0]}%`}} animate={{width: `${current}%`}} transition={{duration: 1.4, ease: [0.22, 1, 0.36, 1]}} className='h-full rounded-full bg-linear-to-r from-emerald-500 via-lime-400 to-emerald-300 bg-size-[200%_auto] animate-[linear_3s_linear_infinite]'/>
        </div>
    )
}