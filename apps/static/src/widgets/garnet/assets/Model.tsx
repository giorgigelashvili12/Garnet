"use client";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Environment, MeshTransmissionMaterial, OrbitControls, Float, Html, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function SubModule({ isDark, position, label, sublabel }: any) {
    return (
        <group position={position}>
            <Float speed={4} rotationIntensity={2} floatIntensity={2}>
                <mesh scale={0.15}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color={isDark ? "#10b981" : "#05ffd1"} emissive={isDark ? "#10b981" : "#34d399"} emissiveIntensity={2} roughness={0} metalness={0.9} />
                </mesh>
                <pointLight color={isDark ? "#10b981" : "#05ffd1"} intensity={2} distance={3} />
                <Html distanceFactor={8} position={[0.5, 0, 0]}>
                    <div className="flex flex-col bg-white/10 dark:bg-black/40 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/20 whitespace-nowrap">
                        <span className="text-[10px] font-black uppercase text-emerald-500">{label}</span>
                        <span className="text-[8px] text-slate-400 font-bold uppercase">{sublabel}</span>
                    </div>
                </Html>
            </Float>
        </group>
    );
}

function ShardModel({ isDark }: { isDark: boolean }) {
    const innerGlassRef = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (innerGlassRef.current) {
            innerGlassRef.current.rotation.z = t * 0.2;
            innerGlassRef.current.rotation.y = Math.sin(t * 0.5) * 0.4;
        }
    });
    return (
        <group scale={0.8}>
            <mesh scale={[1, 2.4, 1]}>
                <icosahedronGeometry args={[1.5, 0]} />
                <MeshTransmissionMaterial transmission={1} thickness={0.5} roughness={0} ior={1.5} chromaticAberration={0.2} backside={true} color={isDark ? "#d1fae5" : "#ffffff"} attenuationDistance={10} attenuationColor={isDark ? "#10b981" : "#d1fae5"} samples={16} resolution={512} />
            </mesh>
            <mesh ref={innerGlassRef} scale={[0.8, 1.9, 0.8]}>
                <icosahedronGeometry args={[0.9, 0]} />
                <meshBasicMaterial color={isDark ? "#05ffd1" : "#10b981"} transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

export default function GarnetCanvas() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    return (
        <div className="h-screen w-full bg-transparent flex items-center justify-center relative">
            <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                <Environment preset="city" />
                <ambientLight intensity={isDark ? 0.2 : 0.5} />
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ShardModel isDark={isDark} />
                    <SubModule isDark={isDark} position={[2, 1, 0]} label="Security" sublabel="Shield Pro" />
                    <SubModule isDark={isDark} position={[-2, -1.5, 0]} label="Threat" sublabel="Sentinel AI" />
                </Float>
                <ContactShadows position={[0, -3.5, 0]} opacity={isDark ? 0.3 : 0.1} scale={15} blur={2.5} far={4} />
            </Canvas>
        </div>
    );
}