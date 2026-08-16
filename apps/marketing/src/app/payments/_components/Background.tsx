"use client";

import GlowBeam from '@/shared/ui/GlowBeam'
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

export default function Background() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="absolute inset-0 z-0 bg-transparent" />;

    const isDark = resolvedTheme === "dark";

    return (
        <div className="relative w-full min-h-160 md:min-h-screen overflow-hidden gradient bg-transparent">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <GlowBeam
                    angle={180}
                    thickness={0.08}
                    wiggle={0.4}
                    colorA="var(--color-a)"
                    colorMid="var(--color-mid)"
                    colorB="var(--color-b)"
                    glowIntensity={isDark ? 0.8 : 0.5}
                    speed={1.2}
                />
            </div>
            
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <GlowBeam 
                    angle={181}
                    thickness={0.12}
                    wiggle={0.1}
                    colorA="var(--color-a)"
                    colorMid="var(--color-mid)"
                    colorB="var(--color-b)"
                    glowIntensity={isDark ? 0.5 : 0.8}
                    speed={0.8}
                />
            </div>
        </div>
    )
}
