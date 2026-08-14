"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Sun, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import { productsData, navItems, developersData, developerGuides, developerResources, solutionsByAi, solutionsByBusiness, solutionsByOrganizations, resourcesLearn, resourcesSupport, resourcesCompany } from "./constants/sections";
import { ThemeToggle } from "@/shared/config/theme-provider";

const Languages = () => (
	<div className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
		<Globe size={18} />
		<span>EN</span>
	</div>
);

export default function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [activeTab, setActiveTab] = useState<string | null>(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [mobileActiveTab, setMobileActiveTab] = useState<string | null>(null);
	const [isInHardwareSection, setIsInHardwareSection] = useState(false);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const navRef = useRef<HTMLDivElement>(null);
	const nav = useRouter();

	useEffect(() => {
		setMounted(true);

		const handleScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsInHardwareSection(entry.isIntersecting);
			},
			{
				threshold: 0.1,
				rootMargin: "-80px 0px 0px 0px",
			}
		);

		const businessSection = document.getElementById("business-section");

		if (businessSection) {
			observer.observe(businessSection);
		}

		const handleGlobalClick = (e: MouseEvent) => {
			if (navRef.current && !navRef.current.contains(e.target as Node)) {
				setActiveTab(null);
			}
		};

		if (activeTab) {
			document.addEventListener("mousedown", handleGlobalClick);
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);

			if (businessSection) {
				observer.unobserve(businessSection);
			}

			document.removeEventListener("mousedown", handleGlobalClick);
		};
	}, [activeTab]);

	const handleMouseEnter = (key: string, hasDropdown?: boolean) => {
		if (window.innerWidth >= 768) {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			if (hasDropdown) {
				setActiveTab(key);
			} else {
				setActiveTab(null);
			}
		}
	};

	const handleMouseLeave = () => {
		if (window.innerWidth >= 768) {
			timeoutRef.current = setTimeout(() => setActiveTab(null), 150);
		}
	};

	const toggleMobileTab = (tab: string) => {
		setMobileActiveTab(mobileActiveTab === tab ? null : tab);
	};

	if (!mounted) {
		return null;
	}

	return (
		<nav
			ref={navRef}
			onMouseLeave={handleMouseLeave}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
				isInHardwareSection
					? "bg-slate-800 border-slate-700 py-4 shadow-xl text-white"
					: scrolled || activeTab || mobileMenuOpen
						? "bg-white/95 dark:bg-[#030a08]/90 border-slate-200 dark:border-slate-800/70 py-4 shadow-xl backdrop-blur-md"
						: "bg-transparent border-transparent py-6 shadow-none"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
				<Logo />

				<div className="hidden md:flex items-center gap-1">
					{navItems.map((item) => (
						<div
							key={item.key}
							onMouseEnter={() =>
								handleMouseEnter(item.key, item.hasDropdown)
							}
						>
							{item.href ? (
								<Link
									href={item.href}
									className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors block ${
										isInHardwareSection
											? "text-slate-300 hover:text-white"
											: "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
									}`}
								>
									{item.label}
								</Link>
							) : (
								<button
									className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
										activeTab === item.key
											? "text-emerald-400 bg-white/10"
											: isInHardwareSection
												? "text-slate-300 hover:text-white"
												: "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
									}`}
								>
									{item.label}
									<ChevronDown
										size={14}
										className={`transition-transform duration-200 ${
											activeTab === item.key ? "rotate-180" : ""
										}`}
									/>
								</button>
							)}
						</div>
					))}
				</div>

				<div className="flex items-center gap-2 md:gap-4">
					<div className="hidden sm:block cursor-pointer">
						<Languages />
					</div>

					<ThemeToggle />

					<div className="hidden sm:block">
						<Link
							href="/login"
							className={`text-sm font-semibold transition-colors px-1 sm:px-2 ${
								isInHardwareSection
									? "text-slate-400 hover:text-white"
									: "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
							}`}
						>
							Log in
						</Link>
					</div>

					<Button
						onClick={() => nav.push("/api")}
						className="hidden sm:flex bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
					>
						Get started
					</Button>

					<button
						className={`md:hidden p-2 ${
							isInHardwareSection
								? "text-white"
								: "text-slate-600 dark:text-slate-300"
						}`}
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			<div
				className={`hidden md:block absolute top-full left-0 right-0 w-full border-b transition-all duration-300 ease-in-out shadow-2xl overflow-hidden ${
					activeTab
						? "max-h-125 opacity-100 visible"
						: "max-h-0 opacity-0 invisible"
				} ${
					isInHardwareSection
						? "bg-slate-800 border-slate-700"
						: "bg-white dark:bg-[#030a08] border-slate-200 dark:border-slate-800"
				}`}
			>
				<div className="max-w-7xl mx-auto px-6 py-8 animate-in fade-in slide-in-from-top-2 duration-300">
					{activeTab === "products" && (
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
							{productsData.map((category) => (
								<div key={category.title}>
									<h3 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">
										{category.title}
									</h3>

									<ul className="space-y-3">
										{category.items.map((item) => (
											<li key={item.name}>
												<Link
													href={item.url}
													onClick={() => setActiveTab(null)}
													className="group/item block rounded-lg transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 p-1.5"
												>
													<div className="text-sm font-semibold text-emerald-500 group-hover/item:text-emerald-500">
														{item.name}
													</div>

													<div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
														{item.description}
													</div>
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					)}

					{activeTab === "developers" && (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							<div>
								<h1 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">Documentation</h1>
								{developersData.map(category => (
    								<div key={category.title}>
       									 <ul>
            								{category.items.map(item => (
                								<li key={item.name} className="my-0.5 text-emerald-500 hover:text-emerald-800">
                    								<Link
                        								href={item.url}
                        								onClick={() => setActiveTab(null)}
                        								className="group flex gap-1 items-center font-medium"
                    								>
                        								<div>
                            								{item.name}
                       									</div>

                        								<ArrowRight className="w-4.5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    								</Link>
                								</li>
            								))}
        								</ul>
   									</div>
								))}
							</div>

							<div>
								<h1 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">Guides</h1>
								{developerGuides.map(item => (
									<div key={item.title}>
										<ul>
											<li className="my-0.5 text-emerald-500 hover:text-emerald-800">
												<Link
													href={item.url}
													onClick={() => setActiveTab(null)}
													className="group flex gap-1 items-center font-medium"
												>
													{item.title}

													<ArrowRight className="w-4.5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
												</Link>
											</li>
										</ul>
									</div>
								))}
							</div>

							<div>
								<h1 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">Resources</h1>
								{developerResources.map(item => (
									<div key={item.title}>
										<ul>
											<li className="my-0.5 text-emerald-500 hover:text-emerald-800">
												<Link
													href={item.url}
													onClick={() => setActiveTab(null)}
													className="group flex gap-1 items-center font-medium"
												>
													{item.title}

													<ArrowRight className="w-4.5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
												</Link>
											</li>
										</ul>
									</div>
								))}
							</div>
						</div>
					)}

					{activeTab === "solutions" && (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							<div>
								<h1 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">By Business</h1>
								{solutionsByBusiness.map(item => (
									<ul key={item.title}>
										<li className="my-0.5 text-emerald-500 hover:text-emerald-800">
                    						<Link
                        						href={item.url}
                        						onClick={() => setActiveTab(null)}
                        						className="group flex gap-1 items-center font-medium"
                    						>
                        						<div>
                            						{item.title}
                       							</div>

                        						<ArrowRight className="w-4.5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    						</Link>
                						</li>
									</ul>
								))}
							</div>

							<div>
								<h1 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">By Business</h1>
								{solutionsByOrganizations.map(item => (
									<ul key={item.title}>
										<li className="my-0.5 text-emerald-500 hover:text-emerald-800">
                    						<Link
                        						href={item.url}
                        						onClick={() => setActiveTab(null)}
                        						className="group flex gap-1 items-center font-medium"
                    						>
                        						<div>
                            						{item.title}
                       							</div>

                        						<ArrowRight className="w-4.5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    						</Link>
                						</li>
									</ul>
								))}
							</div>

							<div>
								<h1 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">By Business</h1>
								{solutionsByAi.map(item => (
									<ul key={item.title}>
										<li className="my-0.5 text-emerald-500 hover:text-emerald-800">
                    						<Link
                        						href={item.url}
                        						onClick={() => setActiveTab(null)}
                        						className="group flex gap-1 items-center font-medium"
                    						>
                        						<div>
                            						{item.title}
                       							</div>

                        						<ArrowRight className="w-4.5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    						</Link>
                						</li>
									</ul>
								))}
							</div>
						</div>
					)}

					{activeTab === "resources" && (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							<div>
								<h1 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">Learn</h1>
								{resourcesLearn.map(item => (
									<ul key={item.title}>
										<li className="my-0.5 text-emerald-500 hover:text-emerald-800">
											<Link
												href={item.url}
												onClick={() => setActiveTab(null)}
                        						className="group flex gap-1 items-center font-medium"
											>
												<div>
													{item.title}
												</div>

												<ArrowRight className="w-4.5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
											</Link>
										</li>
									</ul>
								))}
							</div>

							<div>
								<h1 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">Support</h1>
								{resourcesSupport.map(item => (
									<ul key={item.title}>
										<li className="my-0.5 text-emerald-500 hover:text-emerald-800">
											<Link
												href={item.url}
												onClick={() => setActiveTab(null)}
                        						className="group flex gap-1 items-center font-medium"
											>
												<div>
													{item.title}
												</div>

												<ArrowRight className="w-4.5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
											</Link>
										</li>
									</ul>
								))}
							</div>

							<div>
								<h1 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">Company</h1>
								{resourcesCompany.map(item => (
									<ul key={item.title}>
										<li className="my-0.5 text-emerald-500 hover:text-emerald-800">
											<Link
												href={item.url}
												onClick={() => setActiveTab(null)}
                        						className="group flex gap-1 items-center font-medium"
											>
												<div>
													{item.title}
												</div>

												<ArrowRight className="w-4.5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
											</Link>
										</li>
									</ul>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<div
				className={`md:hidden overflow-hidden transition-all duration-300 ${
					mobileMenuOpen
						? "max-h-screen opacity-100"
						: "max-h-0 opacity-0"
				}`}
			>
				<div className="max-w-7xl mx-auto px-4 py-6">
					{navItems.map((item) => (
						<div key={item.key} className="border-b border-slate-200 dark:border-slate-800">
							{item.href ? (
								<Link
									href={item.href}
									onClick={() => setMobileMenuOpen(false)}
									className="flex items-center justify-between py-4 text-sm font-semibold text-slate-700 dark:text-slate-200"
								>
									{item.label}
								</Link>
							) : (
								<button
									onClick={() => toggleMobileTab(item.key)}
									className="w-full flex items-center justify-between py-4 text-sm font-semibold text-slate-700 dark:text-slate-200"
								>
									{item.label}

									<ChevronDown
										size={16}
										className={`transition-transform ${
											mobileActiveTab === item.key ? "rotate-180" : ""
										}`}
									/>
								</button>
							)}

							{mobileActiveTab === item.key && item.key === "products" && (
								<div className="pb-4 pl-3">
									{productsData.map((category) => (
										<div key={category.title} className="mb-5">
											<h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
												{category.title}
											</h3>

											{category.items.map((item) => (
												<Link
													key={item.name}
													href={item.url}
													onClick={() => {
														setMobileMenuOpen(false);
														setMobileActiveTab(null);
													}}
													className="block py-2"
												>
													<div className="text-sm font-semibold text-emerald-500">
														{item.name}
													</div>

													<div className="text-xs text-slate-500 dark:text-slate-400">
														{item.description}
													</div>
												</Link>
											))}
										</div>
									))}
								</div>
							)}

							{mobileActiveTab === item.key &&
								item.key === "developers" && (
									<div className="pb-4 pl-3">
										<Link
											href="/api-reference"
											onClick={() => {
												setMobileMenuOpen(false);
												setMobileActiveTab(null);
											}}
											className="block py-2"
										>
											<div className="text-sm font-semibold text-emerald-500">
												API Reference
											</div>

											<div className="text-xs text-slate-500 dark:text-slate-400">
												Interactive REST API endpoints and SDKs.
											</div>
										</Link>
									</div>
								)}
						</div>
					))}
				</div>
			</div>
		</nav>
	);
}