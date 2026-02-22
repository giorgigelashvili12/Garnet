"use client";

import Link from "next/link";
import Image from "next/image";
import {ChevronRight} from "lucide-react";
import {useTheme} from 'next-themes';
import {useEffect, useState} from "react";

import Hero from "@/pages/hero/Hero";
import Chem from "@/pages/chem/Chem";
import Intro from "@/pages/intro/Intro";

export default function HomePage() {
    return (
        <div className="">
            <Hero/>

            <div className='relative w-full overflow-x-clip bg-(--background)'>
                <div className='pt-50'><Intro/></div>

                <Chem />
            </div>
        </div>
    )
}