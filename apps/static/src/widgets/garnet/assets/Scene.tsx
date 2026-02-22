"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export default function ShardScene({ isDark }: { isDark: boolean }) {
    const crystalRef = useRef<THREE.Mesh>(null!);
    const innerGlassRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (innerGlassRef.current) {
            innerGlassRef.current.rotation.z = t * 0.1;
            innerGlassRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;

            const intensity = isDark ? 15 + Math.sin(t * 2) * 5 : 40;
            const light = innerGlassRef.current.children[0] as THREE.PointLight;
            if (light) light.intensity = intensity;
        }

        if (crystalRef.current) {
            crystalRef.current.rotation.y = t * 0.05;
        }
    });

    return (
        <>
            <Environment preset={isDark ? "studio" : "city"} />

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
                <group scale={0.7}>
                    <mesh ref={crystalRef} scale={[1, 2.4, 1]}>
                        <icosahedronGeometry args={[1.5, 0]} />
                        <MeshTransmissionMaterial
                            backside
                            samples={8}
                            resolution={256}
                            transmission={1}
                            roughness={isDark ? 0.05 : 0.02}
                            thickness={0.25}
                            ior={isDark ? 1.4 : 1.7}
                            color={isDark ? "#064e3b" : "#d1fae5"}
                            chromaticAberration={0.05}
                            anisotropy={0.1}
                        />
                    </mesh>

                    <mesh ref={innerGlassRef} scale={[0.8, 1.9, 0.8]}>
                        <icosahedronGeometry args={[0.9, 0]} />
                        <MeshTransmissionMaterial
                            samples={4}
                            resolution={128}
                            transmission={1}
                            thickness={0.1}
                            color={isDark ? "#10b981" : "#ffffff"}
                        />
                        <pointLight
                            distance={10}
                            color={isDark ? "#05ffd1" : "#10b981"}
                            decay={2}
                        />
                    </mesh>
                </group>
            </Float>
        </>
    );
}