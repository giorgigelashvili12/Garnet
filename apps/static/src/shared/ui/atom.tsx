import { useState, useEffect } from "react";

import {AtomProps} from "@/shared/lib/@types";

export const Atom = ({symbol, electrons, fields = 3, color = "#000000", className = "",}: AtomProps) => {
    const [rotation, setRotation] = useState(0);
    const size = 100;
    const center = size / 2;

    useEffect(() => {
        let frame: number;
        const animate = () => {
            setRotation((prev) => prev + 0.02);
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <div className={`inline-block ${className}`}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle cx={center} cy={center} r="10" fill={color} />
                <text
                    x={center}
                    y={center}
                    dy="0.3em"
                    textAnchor="middle"
                    fill="white"
                    className="text-[8px] font-bold select-none font-mono"
                >
                    {symbol}
                </text>

                {[...Array(fields)].map((_, i) => (
                    <circle
                        key={`field-${i}`}
                        cx={center}
                        cy={center}
                        r={15 + i * 10}
                        fill="none"
                        stroke={color}
                        strokeWidth="0.5"
                        strokeDasharray="2 2"
                        className="opacity-40"
                    />
                ))}

                {[...Array(electrons)].map((_, i) => {
                    const orbitIndex = i % fields;
                    const speedFactor = 1 + orbitIndex * 0.5;
                    const radius = 15 + orbitIndex * 10;

                    const electronsInThisOrbit = Math.ceil(electrons / fields);
                    const angle =
                        (i * 2 * Math.PI) / electronsInThisOrbit + rotation * speedFactor;

                    const x = center + radius * Math.cos(angle);
                    const y = center + radius * Math.sin(angle);

                    return (
                        <circle key={`electron-${i}`} cx={x} cy={y} r="1.5" fill={color} />
                    );
                })}
            </svg>
        </div>
    );
};
