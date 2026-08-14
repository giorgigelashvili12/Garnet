'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface CrystalProps {
    className?: string;
}

export default function Crystal({ className = "" }: CrystalProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={`w-200 h-150 ${className}`} />;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <div className={`${className} z-5`}>
            <video
                key={isDark ? "dark-mode" : "light-mode"}
                autoPlay
                loop
                muted
                playsInline
                style={
                    isDark
                        ? {
                              WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 90%)',
                              maskImage: 'radial-gradient(circle at center, black 50%, transparent 90%)',
                          }
                        : {}
                }
                className={`w-200 h-150 max-w-none object-contain pointer-events-none select-none z-5 ${
                    isDark
                        ? "mix-blend-screen mask-[radial-gradient(circle_at_center,black_90%,transparent_20%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_90%,transparent_20%)]"
                        : "mix-blend-multiply brightness-125 contrast-125"
                }`}
            >
                <source 
                    src={isDark ? "/crystal/dark.webm" : "/crystal/light.webm"} 
                    type="video/webm"
                    className='z-5' 
                />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
