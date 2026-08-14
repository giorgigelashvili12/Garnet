"use client";

import Bash from '@/shared/ui/Bash';
import React, { useState } from 'react';
import { 
    FaNodeJs, 
    FaPhp, 
    FaGolang, 
    FaRust, 
    FaJava, 
    FaPython 
} from "react-icons/fa6";
  
import { 
    SiDotnet, 
    SiRuby 
} from "react-icons/si";

const icons = [
    { Icon: FaNodeJs, color: "#339933", name: "Node.js", type: "npm", command: "npm install garnet" },
    { Icon: SiDotnet, color: "#512BD4", name: ".NET", type: "dotnet", command: "dotnet add package Garnet" },
    { Icon: FaPhp, color: "#777BB4", name: "PHP", type: "composer", command: "composer require garnet" },
    { Icon: FaGolang, color: "#00ADD8", name: "Golang", type: "go", command: "go get github.com/garnet/garnet-go/v1" },
    { Icon: FaRust, color: "#000000", name: "Rust", type: "cargo", command: "cargo add garnet" },
    { Icon: SiRuby, color: "#CC342D", name: "Ruby", type: "gem", command: "gem install garnet" },
    { Icon: FaJava, color: "#007396", name: "Java", type: "gradle", command: "implementation 'com.garnet:garnet'" },
    { Icon: FaPython, color: "#3776AB", name: "Python", type: "pip", command: "pip install garnet" },
];

export default function Technologies() {
    const [selectedTech, setSelectedTech] = useState(icons[0]);

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto py-6 bg-background">
            <h1 className='text-4xl font-medium'>Technologies</h1>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 dark:bg-zinc-800 px-10 py-2 rounded-xl">
                {icons.map(item => {
                    const isSelected = selectedTech.name === item.name;

                    return (
                        <button 
                            key={item.name} 
                            onClick={() => setSelectedTech(item)}
                            className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl transition-all duration-200 cursor-pointer min-w-[88px] dark:hover:bg-zinc-700 ${
                                isSelected
                                ? "border-b-2 border-emerald-600 rounded-b-none dark:bg-zinc-600/50"
                                : "border-b-2"
                            }`}
                        >
                            <item.Icon className="w-8 h-8" style={{ color: item.color }} />
                            <span className="text-xs font-semibold tracking-wide">
                                {item.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="w-full flex justify-center">
                <Bash type={selectedTech.type} command={selectedTech.command} />
            </div>
        </div>
    );
}
