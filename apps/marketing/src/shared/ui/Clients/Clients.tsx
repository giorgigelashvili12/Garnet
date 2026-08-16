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
			className="w-full bg-background -my-10 md:-my-20 -mt-20 md:-mt-40 rounded-xl"
			style={{ fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif" }}
		>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 max-w-[1160px] mx-auto gap-px bg-border border border-border rounded-xl overflow-hidden auto-rows-[80px] sm:auto-rows-[96px]">
				{COMPANIES.map((logo) => (
					<LogoCard key={logo.name} logo={logo} />
				))}

				<div className="order-first lg:order-none col-span-2 sm:col-span-3 row-span-3 sm:row-span-3 lg:col-start-2 lg:col-span-3 lg:row-start-2 lg:row-span-2 flex flex-col items-center justify-center gap-3 sm:gap-5 bg-card p-6 lg:p-0 text-center">
					<Image
						src="/logo.png"
						alt="Garnet"
						width={60}
						height={60}
						className="w-10 h-10 sm:w-15 sm:h-15"
					/>

					<h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-foreground max-w-[516px] leading-tight tracking-tight px-2 sm:px-4">
						{heading}
					</h2>

					<Link
						href="/associations"
						className="flex gap-1 items-center bg-emerald-500 px-6 sm:px-8 py-1.5 sm:py-2 text-sm sm:text-base text-white rounded-xl hover:bg-emerald-600 transition-all"
					>
						<span>View More</span>
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</div>
		</section>
	);
};
