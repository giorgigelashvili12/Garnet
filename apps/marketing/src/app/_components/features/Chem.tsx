"use client";

import React, { useState, useEffect } from 'react';
import Crystal from '../assets/Crystal';
import { Atom } from '@/shared/ui/Atom';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export default function Chem() {
	const [isMobile, setIsMobile] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const products = [
		{
			name: "Sillicon",
			atom: "Si",
			electrons: 14,
			fields: 3,
			color: "#059669",
			position: { top: "20%", left: "10%" },
			content: (
				<div className="flex flex-col gap-1 text-left">
					<span className="font-semibold text-xl text-slate-900 dark:text-white">Payments</span>
					<span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed pr-12">
						Sell your products digitally, globally. Leave the rest for Garnet to handle.
					</span>
					<Link href="" className="underline hover:text-emerald-600 transition-all text-sm mt-2">
						Read About Payments
					</Link>
				</div>
			),
		},
		{
			name: "Oxygen",
			atom: "O",
			electrons: 8,
			fields: 2,
			color: "#0284c7",
			position: { top: "20%", right: "10%" },
			content: (
				<div className="flex flex-col gap-1 text-left">
					<span className="font-semibold text-xl text-slate-900 dark:text-white">Finances</span>
					<span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed pr-12">
						Exact tool designed to manage money with Financial Accounts.
					</span>
					<Link href="" className="underline hover:text-emerald-600 transition-all text-sm mt-2">
						Read About Finances
					</Link>
				</div>
			),
		},
		{
			name: "Chromium",
			atom: "Cr",
			electrons: 24,
			fields: 4,
			color: "#ca8a04",
			position: { bottom: "12%", left: "10%" },
			content: (
				<div className="flex flex-col gap-1 text-left">
					<span className="font-semibold text-xl text-slate-900 dark:text-white">Associations</span>
					<span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed pr-12">
						Designed to orchestrate identity verification and complex multi-party payments.
					</span>
					<Link href="" className="underline hover:text-emerald-600 transition-all text-sm mt-2">
						Read About Associations
					</Link>
				</div>
			),
		},
		{
			name: "Manganese",
			atom: "Mn",
			electrons: 25,
			fields: 4,
			color: "#9333ea",
			position: { bottom: "12%", right: "10%" },
			content: (
				<div className="flex flex-col gap-1 text-left">
					<span className="font-semibold text-xl text-slate-900 dark:text-white">Revenue</span>
					<span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed pr-12">
						Launch fast and improve revenue capture with billing software&apos;s
					</span>
					<Link href="" className="underline hover:text-emerald-600 transition-all text-sm mt-2">
						Read About Revenue
					</Link>
				</div>
			),
		},
		{
			name: "Aluminum",
			atom: "Al",
			electrons: 13,
			fields: 3,
			color: "#78716c",
			position: { top: "90%", left: "45%", transform: "translateX(-50%)" },
			content: (
				<div className="flex flex-col gap-1 text-left">
					<span className="font-semibold text-xl text-slate-900 dark:text-white">Hardware</span>
					<span className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed pr-12">
						Grow your business locally, make your name rule the streets.
					</span>
					<Link href="" className="underline hover:text-emerald-600 transition-all text-sm mt-2">
						Read About Hardware
					</Link>
				</div>
			),
		},
	];

	return (
		<div className='relative flex flex-col justify-center items-center mt-12 sm:mt-32 min-h-[600px] w-full px-4'>
			<h1 className='text-3xl md:text-5xl lg:text-6xl font-normal tracking-tighter mb-10 md:mb-15 text-center'>
				From The <span className='text-green-500'>Element</span>, To The <span className='text-emerald-500'>Universe</span>
			</h1>

			{isMobile ? (
				<div className='flex flex-col gap-4 w-full max-w-xl mx-auto mt-4'>
					{products.map((item) => (
						<div
							key={item.name}
							className='relative overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-lg backdrop-blur-xl bg-opacity-95 dark:bg-opacity-90'
						>
							<div className='absolute top-3 right-3 scale-75 pointer-events-none'>
								<Atom
									symbol={item.atom}
									electrons={item.electrons}
									fields={item.fields}
									color={item.color}
									className='drop-shadow-lg'
								/>
							</div>
							{item.content}
						</div>
					))}
				</div>
			) : (
				<>
					<div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer select-none">
						<Crystal className="max-[760px]:-mt-12 max-[400px]:scale-75 max-[400px]:-top-12 max-[774px]:scale-100 max-[774px]:top-0" />
					</div>

					<AnimatePresence>
						{open && products.map((item, i) => (
							<motion.div
								key={item.name}
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0, opacity: 0 }}
								transition={{ type: 'spring', stiffness: 120, damping: 12, delay: i * 0.05 }}
								className='absolute z-50 pointer-events-auto'
								style={item.position}
							>
								<HoverCard>
									<HoverCardTrigger delay={0} closeDelay={100}>
										<motion.div whileHover={{ scale: 1.1 }} className='flex flex-col items-center gap-4 cursor-pointer group'>
											<div className='scale-150 lg:scale-200'>
												<Atom symbol={item.atom} electrons={item.electrons} fields={item.fields} color={item.color} className='drop-shadow-lg max-[768px]:scale-300'/>
											</div>
											<span className='text-[10px] tracking-[0.2em] text-slate-500 dark:text-slate-300 font-bold bg-white/5 px-2 py-1 rounded backdrop-blur-md'>
												{item.name}
											</span>
										</motion.div>
									</HoverCardTrigger>
									<HoverCardContent side='top' align='center' sideOffset={15} className='z-100 p-0 border-none bg-transparent shadow-none w-70'>
										<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-2xl backdrop-blur-xl bg-opacity-95 dark:bg-opacity-90 relative">
											{item.content}
											<div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-800" />
										</motion.div>
									</HoverCardContent>
								</HoverCard>
							</motion.div>
						))}
					</AnimatePresence>
				</>
			)}

            <Crystal className="hidden max-[774px]:block" />
		</div>
	);
}