"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { COMPANIES } from "./assets/Companies";
import { LogoCard } from "./assets/LogoCard";

export type ComponentProps = {
    badge?: string;
    heading?: string;
};

export const Clients = ({
    heading = "Our Clients",
}: ComponentProps = {}) => {
    return (
        <section
            className="w-full bg-background -my-20 -mt-40 rounded-xl"
            style={{ fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif" }}
        >
            <div
                className="grid grid-cols-5 max-w-[1160px] mx-auto gap-px bg-border border border-border"
                style={{ gridTemplateRows: "repeat(4, 96px)" }}
            >
                {COMPANIES.map((logo) => (
                    <LogoCard key={logo.name} logo={logo} />
                ))}

                <div
                    className="flex flex-col items-center justify-center gap-5 bg-card"
                    style={{ gridColumn: "2 / span 3", gridRow: "2 / span 2" }}
                >
                    <Image
                        src="/logo.png"
                        alt="Garnet"
                        width={60}
                        height={60}
                    />

                    <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground max-w-[516px] leading-tight tracking-tight px-4">
                        {heading}
                    </h2>

                    <Link href="/associations" className="flex gap-1 items-center bg-emerald-500 px-8 py-0.5 text-white rounded-xl hover:bg-emerald-600 transition-all">
                        <span>View More</span>
                        <ArrowRight className="w-4 -mb-0.75" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
