"use client";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";

export function Pipe() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 1000));
            setStep(1);

            await new Promise(r => setTimeout(r, 4200));
            setStep(2);

            await new Promise(r => setTimeout(r, 4200));
            setStep(3);
        };

        sequence();
    }, []);

    const path = "M 50 200 L 150 200 Q 180 200, 180 170 L 180 50";

    return (
        <div className='absolute inset-0 pointer-events-none'>
            <svg className='w-full h-full' viewBox='0 0 400 400'>
                <path d={path} fill='transparent' stroke='currenctColor' className='text-zinc-200 dark:text-zinc-800'/>

                {step > 0 && (
                    <motion.circle key={step} r='6' fill='#10b981' initial={{opacity: 0}} animate={{offsetDistance: ['0%', '100%'], opacity: [0, 1, 1, 0]}} transition={{duration: 0.8, ease: 'easeInOut', times: [0, 0.1, 0.9, 1]}} style={{offsetPath: `path('${path}')`, offsetRotate: '0deg'}}/>
                )}
            </svg>
        </div>
    )
}