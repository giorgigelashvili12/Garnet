"use client";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Environment, MeshTransmissionMaterial, OrbitControls, Float, Html, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";
import {SubmoduleProps} from "@/shared/lib/@types";

function SubModule({isDark, position, label, sublabel, isMobile }: SubmoduleProps) {
    return (
        <group position={position}>
            <Float speed={isMobile ? 1.5 : 4} rotationIntensity={isMobile ? 0.5 : 2} floatIntensity={isMobile ? 1 : 2}>
                <mesh scale={0.15}>
                    <sphereGeometry args={[1, isMobile ? 12 : 32, isMobile ? 12 : 32]} />
                    <meshStandardMaterial
                        color={isDark ? "#10b981" : "#05ffd1"}
                        emissive={isDark ? "#10b981" : "#34d399"}
                        emissiveIntensity={isMobile ? 0.5 : 2}
                        roughness={0.2}
                        metalness={0.9}
                    />
                </mesh>
                {!isMobile && <pointLight color={isDark ? "#10b981" : "#05ffd1"} intensity={2} distance={3} />}
                {/*@ts-expect-error mito*/}
                <Html distanceFactor={8} position={[0.5, 0, 0]} occlude="blended">
                    <div className="flex flex-col bg-white/10 dark:bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 whitespace-nowrap pointer-events-none">
                        <span className="text-[10px] font-black uppercase text-emerald-500">{label}</span>
                        <span className="text-[8px] text-slate-400 font-bold uppercase">{sublabel}</span>
                    </div>
                </Html>
            </Float>
        </group>
    );
}

function ShardModel({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) {
    const innerGlassRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (innerGlassRef.current) {
            innerGlassRef.current.rotation.z = t * 0.15;
            innerGlassRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
        }
    });

    return (
        <group scale={isMobile ? 0.65 : 0.8}>
            <mesh scale={[1, 2.4, 1]}>
                <icosahedronGeometry args={[1.5, 0]} />
                {isMobile ? (
                    <meshStandardMaterial
                        color={isDark ? "#064e3b" : "#d1fae5"}
                        transparent
                        opacity={0.8}
                        metalness={1}
                        roughness={0.1}
                    />
                ) : (
                    <MeshTransmissionMaterial
                        transmission={1}
                        thickness={0.5}
                        roughness={0}
                        ior={1.2}
                        chromaticAberration={0.1}
                        backside={true}
                        color={isDark ? "#d1fae5" : "#ffffff"}
                        attenuationDistance={10}
                        attenuationColor={isDark ? "#10b981" : "#d1fae5"}
                        samples={16}
                        resolution={512}
                    />
                )}
            </mesh>
            <mesh ref={innerGlassRef} scale={[0.8, 1.9, 0.8]}>
                <icosahedronGeometry args={[0.9, 0]} />
                <meshBasicMaterial
                    color={isDark ? "#05ffd1" : "#10b981"}
                    transparent
                    opacity={isMobile ? 0.2 : 0.3}
                />
            </mesh>
        </group>
    );
}

export default function GarnetCanvas() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className="h-full w-full bg-transparent flex items-center justify-center relative">
            <Canvas
                dpr={isMobile ? 1 : [1, 1.5]}
                gl={{
                    antialias: !isMobile,
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true,
                }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={isMobile ? 45 : 35} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />

                {!isMobile && <Environment preset="city" />}

                <ambientLight intensity={isDark ? 0.3 : 0.7} />
                {!isMobile && <directionalLight position={[5, 5, 5]} intensity={1} />}

                <Float speed={isMobile ? 1 : 2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ShardModel isDark={isDark} isMobile={isMobile} />
                    <SubModule isDark={isDark} position={[2, 1, 0]} label="Security" sublabel="Shield Pro" isMobile={isMobile} />
                    <SubModule isDark={isDark} position={[-2, -1.5, 0]} label="Threat" sublabel="Sentinel AI" isMobile={isMobile} />
                </Float>

                {!isMobile && (
                    <ContactShadows
                        position={[0, -3.5, 0]}
                        opacity={isDark ? 0.3 : 0.1}
                        scale={15}
                        blur={2.5}
                        far={4}
                    />
                )}
            </Canvas>
        </div>
    );
}