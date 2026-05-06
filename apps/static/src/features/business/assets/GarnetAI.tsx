"use client";

import PhoneUI from "@/shared/widgets/business/PhoneUI";
import { useDict } from "@/shared/hooks/useDict";

export default function GarnetAI() {
    const dict = useDict();
    const t = dict.business.ai;

    return (
        <section className="relative min-h-[80vh] w-full overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
                    <div className="z-10 order-2 lg:order-1 lg:max-w-xl">
                        <div className="mb-6 inline-flex items-center rounded-full bg-linear-to-r from-purple-500/10 to-pink-500/10 px-3 py-1 text-sm font-bold tracking-tight text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                            {t.badge}
                        </div>
                        <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:leading-[1.1]">
                            {t.title}
                        </h2>
                        <p className="text-lg leading-8 text-slate-300 md:text-xl">
                            {t.desc}
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <button className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-xs hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                                {t.btnTrial}
                            </button>
                            <button className="text-sm font-semibold leading-6 text-white hover:text-slate-300">
                                {t.btnDemo} <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </div>

                    <div className="relative order-1 flex justify-center lg:order-2 mb-12 lg:mb-0">
                        <div className="absolute -inset-4 rounded-[3rem] bg-emerald-500/20 blur-[500px]" aria-hidden="true" />
                        <div className="relative h-[500px] w-full max-w-[300px] scale-90 sm:h-[600px] sm:max-w-[350px] lg:h-[700px] lg:scale-100">
                            <PhoneUI />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-32" aria-hidden="true">
                <svg viewBox="0 0 1024 1024" className="absolute top-1/2 left-1/2 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0">
                    <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.15" />
                    <defs>
                        <radialGradient id="gradient">
                            <stop stopColor="#7775D6" />
                            <stop offset="1" stopColor="#E935C1" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        </section>
    );
}
