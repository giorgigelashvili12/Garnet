'use client';

import { motion, SpringOptions, useScroll, useSpring } from 'framer-motion';
import {cn} from "@/shared/lib/utils";
import { RefObject } from 'react';

interface ScrollProgressProps {
    className?: string;
    springOptions?: SpringOptions;
    containerRef?: RefObject<HTMLDivElement>;
}

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
};

export function ScrollProgress({className, springOptions, containerRef,}: ScrollProgressProps) {
    const { scrollYProgress } = useScroll({
        container: containerRef,
        //@ts-expect-error unreasoanble
        layoutEffect: containerRef?.current !== null,
    });

    const scaleX = useSpring(scrollYProgress, {
        ...(springOptions ?? DEFAULT_SPRING_OPTIONS),
    });

    return (
        <motion.div
            className={cn('inset-x-0 top-0 h-0.5 origin-left', className)}
            style={{
                scaleX,
            }}
        />
    );
}