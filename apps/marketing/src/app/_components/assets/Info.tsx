import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export default function Info() {
	return (
		<div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-10 md:py-12 bg-background/30 backdrop-blur-md border border-background/20 shadow-xl rounded-2xl">
			<div className="w-full max-w-4xl p-2 sm:p-6 md:p-8 border border-transparent rounded-xl transition-all duration-300 text-foreground">
				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 font-semibold tracking-tight leading-tight">
					Everything To Make Your Business Grow
				</h1>

				<p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-80 leading-relaxed max-w-2xl">
					Accept payments, manage financial data, customize, grow your revenue, all in a single solution. Make your ambitions come true.
				</p>

				<div className="flex flex-col sm:flex-row items-stretch sm:items-center mt-6 sm:mt-8 gap-3 sm:gap-4 md:gap-6">
					<Link
						href="/signup"
						className="flex items-center justify-center gap-2 sm:gap-3 bg-emerald-700 text-white px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-md cursor-pointer border border-emerald-700 hover:bg-transparent hover:text-emerald-700 font-bold transition-all text-sm sm:text-base w-full sm:w-auto"
					>
						Get Started <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
					</Link>

					<Link
						href="/oauth"
						className="flex items-center justify-center gap-2 sm:gap-3 bg-foreground text-background px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-md border border-foreground hover:bg-transparent hover:text-foreground font-bold transition-all text-sm sm:text-base w-full sm:w-auto"
					>
						<span className="truncate">Sign Up With Google</span>
						<Image
							src="/google-logo.png"
							width={22}
							height={22}
							alt="Google"
							className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}
