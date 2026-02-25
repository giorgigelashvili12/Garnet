"use client";

import Link from "next/link";
import Image from "next/image";
import {ChevronRight} from "lucide-react";
import {useTheme} from 'next-themes';
import {useEffect, useState} from "react";

import Hero from "@/pages/hero/Hero";
import Chem from "@/pages/chem/Chem";
import Intro from "@/pages/intro/Intro";
import Payments from "@/pages/payments/Payments";
import Issuing from "@/pages/issuing/Issuing";

export default function HomePage() {
    return (
        <div className="bg-(--background)">
            <Hero/>

            <div className='relative w-full overflow-x-clip bg-(--background)'>
                <div className='pt-50'><Intro/></div>

                <Chem />
                <Payments />

                <div className='lg:px-70 md:px-10 sm:px-10 [@media(max-width:620px)]:px-5 py-40'>
                    <Issuing/>
                </div>
            </div>
        </div>
    )
}