"use client";

import Link from "next/link";
import Image from "next/image";
import {ChevronRight} from "lucide-react";
import {useTheme} from 'next-themes';
import { useRef } from "react";

import Hero from "@/features/hero/Hero";
import Chem from "@/features/chem/Chem";
import Intro from "@/features/intro/Intro";
import Payments from "@/features/payments/Payments";
import Issuing from "@/features/issuing/Issuing";
import Billing from "@/features/billing/Billing";
import Section from "@/pages/assets/Section";
import {ScrollProgress} from "@/shared/ui/scroll-progress";
import Crypto from "@/features/crypto/Crypto";
import Sync from "@/features/sync/Sync";
import Stats from "@/features/stats/Stats";
import GarnetAdapter from "@/features/garnet-adapter/GarnetAdapter";
import Business from "@/features/business/Business";
import Footer from "@/widgets/Footer";

export default function HomePage() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="bg-(--background) relative">
            <ScrollProgress
                className="fixed top-22 z-50 bg-[linear-gradient(90deg,rgba(42,155,104,1)_0%,rgba(87,199,133,1)_50%,rgba(109,237,83,1)_100%)] h-0.5"
            />

            <Hero/>

            <div className='relative w-full overflow-x-clip bg-(--background)'>
                <div className='pt-50'><Intro/></div>

                <Chem />
                <Payments />

                <div className='px-4 md:px-10 lg:px-40 xl:px-70 py-20 md:py-40'>
                    <Issuing/>
                </div>

                <Section/>

                <div className='px-4 md:px-10 lg:px-40 xl:px-70 -mt-20 md:-mt-35 py-20 md:py-40 flex flex-col gap-32 md:gap-50'>
                    <Crypto/>

                    <Sync/>

                    <Stats/>

                    {/* <GarnetAdapter/> */}
                </div>

                <div className="px-4 md:px-0 lg:px-20 xl:px-50 bg-slate-800">
                    <Business/>
                </div>

                {/*<GlowingEffectDemo />*/}
                {/*<AuroraBackgroundDemo />*/}
                {/*<SmokeDemo/>*/}
                {/*<CodeBlockDemo/>*/}
                {/*<CardActivity/>*/}

                <Footer/>
            </div>
        </div>
    )
}

// import React from "react";
// import {CodeBlock} from "@/shared/ui/code";
//
// function CodeBlockDemo() {
//     const code = `const DummyComponent = () => {
//   const [count, setCount] = React.useState(0);
//
//   const handleClick = () => {
//     setCount(prev => prev + 1);
//   };
//
//   return (
//     <div className="p-4 border rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Fights Counter</h2>
//       <p className="mb-2">Fight Club Fights Count: {count}</p>
//       <button
//         onClick={handleClick}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Increment
//       </button>
//     </div>
//   );
// };
// `;
//
//     return (
//         <div className="p-10 bg-zinc-950 min-h-screen">
//             <div className="max-w-3xl mx-auto w-full space-y-8">
//                 <h1 className="text-white text-2xl font-bold">Component Preview</h1>
//                 <CodeBlock
//                     language="jsx"
//                     filename="DummyComponent.jsx"
//                     highlightLines={[9, 13, 14, 18]}
//                     code={code}
//                 />
//             </div>
//         </div>
//     );
// }