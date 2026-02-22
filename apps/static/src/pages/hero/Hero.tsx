"use client";

import {SilkWaves} from "@/shared/ui/waves";
import Image from "next/image";
import Link from "next/link";
import {ChevronRight} from "lucide-react";

export default function Hero() {
    return (
        <div className='relative h-screen w-full flex items-center justify-center '>
            <div className='absolute inset-0 w-full h-full z-0 pointer-events-none'>
                <SilkWaves />
                <div className='absolute inset-0 bg-linear-to-b from-transparent via-transparent to-(--background)'/>
            </div>

            <div className='relative z-10 w-full lg:px-20 max-w-5xl mx-auto px-20 md:px-12'>
                <div className="max-w-4xl hover:bg-(--dark-bg)/10 p-10 border border-transparent rounded-xl transition-all ease-in-out duration-300 text-(--foreground)">
                    <h1 className="text-5xl md:text-6xl mb-7 font-semibold tracking-tight leading-tight">
                        Everything To Make Your Business Grow
                    </h1>

                    <p className="text-xl opacity-80 leading-relaxed max-w-2xl">
                        Accept payments, manage financial data, customize, grow your
                        revenue, <br className="hidden md:block" />
                        all in a single solution. Make your ambitions come true.
                    </p>

                    <div className="flex flex-wrap mt-8 gap-6 md:gap-10">
                        <Link
                            href="/signup"
                            className="flex text-white items-center gap-5 bg-emerald-700 px-8 py-4 rounded-md cursor-pointer border border-emerald-700 hover:bg-transparent hover:text-emerald-700 font-bold transition-all"
                        >
                            Get Started <ChevronRight size={20} />
                        </Link>

                        <Link
                            href="/oauth"
                            className="flex items-center gap-5 bg-(--foreground) px-8 py-4 rounded-md text-(--background) border border-(--foreground) hover:bg-transparent hover:text-(--foreground) font-bold transition-all"
                        >
                            Sign Up With Google
                            <Image
                                src="/google-logo.png"
                                width={22}
                                height={22}
                                alt="Google"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}