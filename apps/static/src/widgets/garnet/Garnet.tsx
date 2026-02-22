"use client";

import {useState, useEffect} from "react";
import {Canvas} from '@react-three/fiber';
import {PerspectiveCamera, OrbitControls} from "@react-three/drei";
import ShardScene from "@/widgets/garnet/assets/Scene";

export default function Garnet() {
    const [isDark, setDark] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setDark(document.documentElement.classList.contains('dark'));
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className='relative h-screen w-full bg-(--background) transition-colors duration-1000 overflow-hidden'>
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                <div className={`w-180 h-180 rounded-full blur-[140px] transition-all duration-1000 ${
                    isDark ? "bg-emerald-900/20 opacity-60 scale-100" : 'bg-emerald-20/40 opacity-80 scale-110'
                }`}/>
            </div>

            <Canvas dpr={[1, 2]} gl={{antialias: true, alpha: true, powerPreference: 'high-performance'}}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45}/>

                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5} />

                <ShardScene isDark={isDark} />
            </Canvas>
        </div>
    )
}