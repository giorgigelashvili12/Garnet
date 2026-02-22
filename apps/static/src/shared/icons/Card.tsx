"use client";

import { JSX } from "react";

export default function Card({className,}: { className?: string; }): JSX.Element {
    return (
        <div className={`flex flex-col gap-0.5 relative ${className || ""}`}>
            <div className="bg-slate-900 dark:bg-white py-0.5 px-3 rounded-t-sm" />
            <div className="relative">
                <div className="bg-slate-900 dark:bg-white py-1.5 px-3 rounded-b-sm" />
                <div className="bg-white dark:bg-slate-900 p-0.5 w-0.5 h-0.5 rounded-full absolute bottom-0.5 left-0.5" />
            </div>
        </div>
    );
}
