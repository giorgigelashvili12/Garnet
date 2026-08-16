"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/shared/components/Logo";
import Image from "next/image";
import Link from "next/link";
import { 
    FaNodeJs, 
    FaReact, 
    FaPhp, 
    FaGolang, 
    FaRust, 
    FaJava, 
    FaPython 
} from "react-icons/fa6";
  
import { 
    SiTypescript, 
    SiDotnet, 
    SiNestjs, 
    SiRuby 
} from "react-icons/si";
import Technologies from "./Technologies";

const fallbackUrls = [
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    "https://upload.wikimedia.org/wikipedia/commons/9/96/Among_Us_icon.png"
];

const iconConfigs = [
    { Icon: SiTypescript, color: "#3178C6" },
    { Icon: FaNodeJs, color: "#339933" },
    { Icon: FaReact, color: "#61DAFB" },
    { Icon: SiDotnet, color: "#512BD4" },
    { Icon: SiNestjs, color: "#E0234E" },
    { Icon: FaPhp, color: "#777BB4" },
    { Icon: FaGolang, color: "#00ADD8" },
    { Icon: FaRust, color: "#000000" },
    { Icon: SiRuby, color: "#CC342D" },
    { Icon: FaJava, color: "#007396" },
    { Icon: FaPython, color: "#3776AB" },
];

export default function FeatureSection() {
    const orbitCount = 3;
    const orbitGap = 8;
    const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

    return (
        <section className="relative max-w-6xl mx-auto my-12 pl-10 flex items-center justify-between h-[30rem] overflow-hidden max-[400px]:z-9">
            <style>{`
                @keyframes orbit-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>

            <div className="w-1/2 z-10 font-medium max-[400px]:bg-transparent">
                <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
                    Build your idea
                </h1>
                <p className="text-gray-500 dark:text-gray-300 mb-6 max-w-lg">
                    Garnet is available for your technologies
                </p>
                <div className="flex items-center gap-3">
                    <Button variant="default" className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer dark:text-white">
                        <Link href="" target="_blank">Get Started</Link>
                    </Button>
                    <Button variant="outline" className="cursor-pointe dark:bg-white dark:text-black dark:hover:text-white dark:hover:border dark:hover:border-white">Learn More</Button>
                </div>
            </div>

            <div className="relative w-1/2 h-full flex items-center justify-start overflow-hidden z-9">
                <div className="relative w-[50rem] h-[50rem] translate-x-[50%] flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-gray-800 shadow-lg flex items-center justify-center z-10">
                        <Image
                            src="/logo.png"
                            alt="Garnet"
                            width={60}
                            height={60}
                        />
                    </div>

                    {[...Array(orbitCount)].map((_, orbitIdx) => {
                        const size = `${12 + orbitGap * (orbitIdx + 1)}rem`;
                        const currentOrbitIcons = iconConfigs.slice(
                            orbitIdx * iconsPerOrbit,
                            orbitIdx * iconsPerOrbit + iconsPerOrbit
                        );
                        const angleStep = (2 * Math.PI) / currentOrbitIcons.length;
                        const duration = 20 + orbitIdx * 8;

                        return (
                            <div
                                key={orbitIdx}
                                className="absolute flex items-center justify-center pointer-events-none"
                                style={{ width: size, height: size }}
                            >
                                <div className="absolute inset-0 rounded-full border-2 border-dotted border-gray-300 dark:border-gray-600" />

                                <div
                                    className="absolute inset-0 rounded-full pointer-events-auto"
                                    style={{
                                        animation: `orbit-spin ${duration}s linear infinite`,
                                    }}
                                >
                                    {currentOrbitIcons.map((cfg, iconIdx) => {
                                        const angle = iconIdx * angleStep;
                                        const x = 50 + 50 * Math.cos(angle);
                                        const y = 50 + 50 * Math.sin(angle);

                                        return (
                                            <div
                                                key={iconIdx}
                                                className="absolute"
                                                style={{
                                                    left: `${x}%`,
                                                    top: `${y}%`,
                                                    transform: "translate(-50%, -50%)",
                                                }}
                                            >
                                                <div
                                                    className="bg-white dark:bg-gray-800 rounded-full p-2.5 shadow-md flex items-center justify-center border border-gray-100 dark:border-gray-700"
                                                    style={{
                                                        animation: `orbit-spin ${duration}s linear infinite reverse`,
                                                    }}
                                                >
                                                    {cfg.Icon ? (
                                                        <cfg.Icon className="w-7 h-7" style={{ color: cfg.color }} />
                                                    ) : (
                                                        <Image
                                                            src={cfg.img || fallbackUrls[0]}
                                                            alt="icon"
                                                            width={28}
                                                            height={28}
                                                            className="w-7 h-7 object-contain"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
