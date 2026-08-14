import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export default function Info() {
    return (
        <div className='relative z-10 w-full max-w-5xl mx-auto px-40 xs:px-6 md:px-12 lg:px-20 bg-background/30 backdrop-blur-md border border-background/20 shadow-xl rounded-2xl'>
            <div className="max-w-4xl hover:bg-(--dark-bg)/10 p-5 xs:p-6 md:p-10 border border-transparent rounded-xl transition-all ease-in-out duration-300 text-(--foreground)">
                <h1 className="text-3xl xs:text-4xl md:text-6xl mb-5 xs:mb-7 font-semibold tracking-tight leading-tight">
                    Everything To Make Your Business Grow
                </h1>

                <p className="text-base xs:text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl">
                    Accept payments, manage financial data, customize, grow your revenue, all in a single solution. Make your ambitions come true.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap mt-6 xs:mt-8 gap-3 xs:gap-4 md:gap-10">
                    <Link href="/signup" className="flex text-white items-center justify-center gap-3 xs:gap-5 bg-emerald-700 px-4 xs:px-8 py-3 xs:py-4 rounded-md cursor-pointer border border-emerald-700 hover:bg-transparent hover:text-emerald-700 font-bold transition-all text-sm xs:text-base">
                        Get Started <ChevronRight size={18} className="xs:w-5 xs:h-5" />
                    </Link>

                    <Link href="/oauth" className="flex items-center justify-center gap-3 xs:gap-5 bg-(--foreground) px-4 xs:px-8 py-3 xs:py-4 rounded-md text-(--background) border border-(--foreground) hover:bg-transparent hover:text-(--foreground) font-bold transition-all text-sm xs:text-base">
                        <span className="truncate">Sign Up With Google</span>
                        <Image
                            src="/google-logo.png"
                            width={18}
                            height={18}
                            alt="Google"
                            className="xs:w-[22px] xs:h-[22px]"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}
