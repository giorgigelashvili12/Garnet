"use client";

import Image from "next/image"

export const TableTerminal = () => {
    return (
        <div className="relative w-full h-full">
            <Image
                src="/business/table-terminal.png"
                alt="Table Terminal Preview"
                fill
                className="object-contain"
            />
        </div>
    )
}

export const TerminalCase = () => {
    return (
        <div className="relative w-full h-full">
            <Image
                src="/business/terminal-case.png"
                alt="Terminal Case Preview"
                fill
                className="object-contain"
            />
        </div>
    )
}

export const TerminalStand = () => {
    return (
        <div className="relative w-full h-full">
            <Image
                src="/business/stand-terminal.png"
                alt="Terminal Stand Preview"
                fill
                className="object-contain"
            />
        </div> 
    )
}

export const WallMount = () => {
    return (
        <div className="relative w-full h-full">
            <Image
                src="/business/wall-terminal.png"
                alt="Wall Mount Preview"
                fill
                className="object-contain"
            />
        </div>
    )
}

export const OnTableTerminal = () => {
    return (
        <div className="relative w-full h-full">
            <Image
                src="/business/ontable-terminal.png"
                alt="On Table Terminal Preview"
                fill
                className="object-contain"
            />
        </div>
    )
}