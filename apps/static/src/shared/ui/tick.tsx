"use client";

import {useEffect, useState} from "react";
import {motion, animate} from 'framer-motion';
import {TickProps} from "@/shared/lib/@types";

export function Tick({target, start, steps, pause = 3000, delay = 800, isCurrency = true}: TickProps) {
    const [displayValue, setDisplayValue] = useState(start);

    useEffect(() => {
        let isMounted = true;

        const runSequence = async () => {
            await new Promise((resolve) => setTimeout(resolve, delay));

            let currentPos = start;

            for(let i = 0; i < steps.length; i++) {
                if (!isMounted) return;

                const nextValue = i === steps.length - 1 ? target : currentPos + steps[i];

                await new Promise<void>((resolve) => {
                    animate(currentPos, nextValue, {
                        duration: 1.4,
                        ease: "easeOut",
                        onUpdate: (latest) => setDisplayValue(latest),
                        onComplete: resolve,
                    });
                });

                currentPos = nextValue;

                if (i < steps.length - 1) {
                    await new Promise((resolve) => setTimeout(resolve, pause));
                }
            }
        };

        runSequence();
        return () => {
            isMounted = false;
        };
    }, [target, start, steps, pause, delay]);

    return (
        <motion.span>
            {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: isCurrency ? 2: 0, maximumFractionDigits: isCurrency ? 2 :0}).format(displayValue
            )}
        </motion.span>
    )
}