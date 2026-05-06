
import { ReactNode } from "react";

export default function RadialBg({ children }: { children?: ReactNode }) {
    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-slate-50 dark:bg-(--background) transition-colors duration-500">
            <div 
                className="absolute top-0 right-0 w-2/3 h-full opacity-50 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen pointer-events-none"
                style={{
                    background: `
                        radial-gradient(at 80% 20%, #10b981 0px, transparent 50%),
                        radial-gradient(at 100% 0%, #047857 0px, transparent 50%),
                        radial-gradient(at 60% 0%, #6ee7b7 0px, transparent 50%)
                    `,
                    filter: "blur(80px)",
                }}
            />

            <div className="absolute inset-0 pointer-events-none">
                <svg
                    width="100%"
                    height="100%"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-[0.10] dark:opacity-[0.05]"
                >
                    <defs>
                        <pattern
                            id="diagonal-lines"
                            x="0"
                            y="0"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(-15)"
                        >
                            <line
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="40"
                                stroke="#10b981"
                                strokeWidth="1.5"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
                </svg>
            </div>

            <div 
                className="absolute -bottom-24 -left-24 w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-10 pointer-events-none"
                style={{
                    background: "radial-gradient(circle, #059669 0%, transparent 70%)",
                    filter: "blur(100px)",
                }}
            />

            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-emerald-500/10 dark:from-emerald-900/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    )
}