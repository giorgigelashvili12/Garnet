"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/shared/ui/button";
import Logo from "@/shared/ui/logo";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const { setTheme, resolvedTheme } = useTheme();
    const nav = useRouter();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        const handleGlobalClick = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveTab(null); };
        if (activeTab) document.addEventListener("mousedown", handleGlobalClick);
        return () => { window.removeEventListener("scroll", handleScroll); document.removeEventListener("mousedown", handleGlobalClick); };
    }, [activeTab]);

    const handleMouseEnter = (tab: string) => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setActiveTab(tab); };
    if (!mounted) return null;

    return (
        <nav ref={navRef} onMouseLeave={() => { timeoutRef.current = setTimeout(() => setActiveTab(null), 1500); }} className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 border-b ${scrolled || activeTab ? "bg-white/95 dark:bg-(--dark-bg)/90 border-slate-200 dark:border-slate-800/70 py-6 shadow-xl backdrop-blur-md" : "bg-transparent border-transparent py-6 shadow-none"}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Logo/>

                <div className="hidden md:flex items-center gap-2">
                    {["Products", "Developers", "Resources", "Pricing"].map((item) => (
                        <button key={item} onMouseEnter={() => handleMouseEnter(item.toLowerCase())} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${activeTab === item.toLowerCase() ? "text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"}`}>{item}</button>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="p-2 cursor-pointer rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-slate-700 transition-all">{resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}</button>

                    <Link href="/login" className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Log in</Link>

                    <Button onClick={() => nav.push("/api")} className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20">Get Started</Button>
                </div>
            </div>
            <div className={`absolute top-full left-0 right-0 w-full border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out shadow-2xl overflow-hidden ${activeTab ? "max-h-125 opacity-100 visible bg-white dark:bg-(--dark-bg)" : "max-h-0 opacity-0 invisible"}`}>
                <div className="max-w-7xl mx-auto px-6 py-12">

                    {activeTab === "products" && (
                        <div className="grid grid-cols-4 gap-12 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="col-span-1">
                                <h3 className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-6">Security Suite</h3>
                                <ul className="space-y-4">
                                    <li className="group cursor-pointer"><p className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">Shield Pro</p><p className="text-xs text-slate-500 dark:text-slate-400">Advanced DDoS protection</p></li>
                                    <li className="group cursor-pointer"><p className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">Sentinel</p><p className="text-xs text-slate-500 dark:text-slate-400">AI Threat detection</p></li>
                                </ul>
                            </div>
                            <div className="col-span-2 bg-slate-50 dark:bg-(--dark-bg)/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Explore our Infrastructure</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm leading-relaxed">Scale your applications globally on our zero-trust network with edge computing capabilities.</p>
                                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl">View Roadmap</Button>
                            </div>
                        </div>
                    )}

                    {activeTab === "developers" && (
                        <div className="grid grid-cols-3 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="p-8 bg-emerald-500 rounded-3xl text-white shadow-xl shadow-emerald-500/20">
                                <h2 className="text-2xl font-black mb-2">Documentation</h2>
                                <p className="opacity-90 mb-6 text-sm">Integrate Soteria into your stack in under 5 minutes with our SDKs.</p>
                                <Button variant="secondary" className="bg-white text-emerald-500 hover:bg-slate-100 rounded-xl">Start Building</Button>
                            </div>
                            <div className="col-span-2 grid grid-cols-2 gap-4">
                                <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-(--dark-bg) transition-all cursor-pointer group">
                                    <p className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500">API Reference</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Full endpoint documentation for developers.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}