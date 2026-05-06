"use client";

import { memo } from "react";
import Map from "./Map";
import Browser from "@/shared/ui/browser";
import { 
    Home, 
    BarChart3, 
    Repeat, 
    User, 
    Box, 
    ShieldAlert, 
    Clock, 
    Layers, 
    Wallet, 
    FileText, 
    BarChart, 
    ChevronDown 
} from 'lucide-react';

import { useDict } from "@/shared/hooks/useDict";
import { SidebarItem, SidebarSection } from "@/shared/components/Sidebar/Exports";
import RadialBg from "@/shared/ui/RadialBg";

export default function SyncTrigger({onClick}: {onClick?: () => void}) {
    const dict = useDict();
    const t = dict.features.sync.trigger;

    const accounts = [
        { name: 'Vital Flow', country: 'Canada', balance: '$30,930.00', total: '$294,669.65', icon: '〰️' },
        { name: 'Sacred Space', country: 'UK', balance: '$1,552.00', total: '$7,887.54', icon: 'S' },
        { name: 'Jackson Hot Yoga', country: 'Australia', balance: '$335.00', total: '$3,650.36', icon: 'J' },
        { name: 'Harmony Flow', country: 'United States', balance: '$30,930.00', total: '$294,669.65', icon: '🌈' },
        { name: 'Daybreak Yoga', country: 'United States', balance: '$1,552.00', total: '$7,887.54', icon: '🧘' },
        { name: 'Balance at Brunch', country: 'Canada', balance: '$335.00', total: '$3,650.36', icon: 'B' },
        { name: 'Breathline Studio', country: 'United States', balance: '$2,245.00', total: '$8,608.00', icon: '☸️' },
    ];

    return (
        <div className="relative w-full -mt-40 min-h-screen overflow-hidden flex rounded-4xl border border-stone-200 hover:border-emerald-600 dark:border-slate-900 dark:hover:border-emerald-800">
            <div className="absolute inset-0 z-0 pointer-events-none text-left">
                <RadialBg/>
            </div>

            <div className="relative z-10 flex flex-col w-full max-w-7xl mx-auto h-screen items-center px-4 md:px-10 hover:scale-[1.02] md:hover:scale-105 transition-transform duration-500">
                <div className="flex-1 flex flex-col justify-start -mt-8 md:-mt-20 pr-0 md:pr-10 text-left">
                    <h1 className="text-3xl md:text-5xl text-center mt-20 md:mt-40 font-medium text-slate-900 dark:text-slate-50 mb-4 md:mb-6 leading-tight max-w-sm">
                        {t.title}
                    </h1>
                </div>

                <div className="flex-1 flex justify-center md:justify-end scale-[0.4] sm:scale-55 lg:scale-75 -mt-48 md:-mt-20 origin-top">
                    <div className="w-[850px] min-w-[850px] h-[550px] md:h-[650px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.15)] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <Browser url="quickmarket.com/admin">
                <div className="w-full bg-white dark:bg-slate-950 font-sans flex h-full">
                    <div className="w-44 h-full bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800 flex flex-col py-6 select-none font-sans">
                        <div className="space-y-0.5">
                            <SidebarItem icon={Home} label={t.sidebar.home} />
                            <SidebarItem icon={BarChart3} label={t.sidebar.balances} />
                            <SidebarItem icon={Repeat} label={t.sidebar.transactions} />
                            <SidebarItem icon={User} label={t.sidebar.directory} />
                            <SidebarItem icon={Box} label={t.sidebar.catalog} />
                        </div>

                        <SidebarSection title={t.sidebar.shortcuts}>
                            <SidebarItem icon={ShieldAlert} label={t.sidebar.fraud} />
                            <SidebarItem 
                                icon={Clock} 
                                label={t.sidebar.connected} 
                                active={true} 
                                isShortcut={true}
                            />
                        </SidebarSection>

                        <SidebarSection title={t.sidebar.products}>
                            <SidebarItem icon={Layers} label={t.sidebar.connect} hasChevron={true} />
                            <SidebarItem icon={Wallet} label={t.sidebar.payments} hasChevron={true} />
                            <SidebarItem icon={FileText} label={t.sidebar.billing} hasChevron={true} />
                            <SidebarItem icon={BarChart} label={t.sidebar.reporting} hasChevron={true} />
                        </SidebarSection>
                    </div>

                    <div className="px-8 py-10 w-full dark:bg-slate-950">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-8">{t.table.title}</h2>
        
                        <div className="w-full">
                            <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr] px-4 py-3 border-b border-emerald-100 dark:border-slate-800 text-sm font-bold text-slate-800 dark:text-slate-200">
                                <div>{t.table.accounts}</div>
                                <div>{t.table.country}</div>
                                <div className="text-right">{t.table.balance}</div>
                                <div className="text-right">{t.table.total}</div>
                            </div>

                            <div className="flex flex-col">
                                {accounts.map((acc, index) => (
                                    <div 
                                        key={index} 
                                        className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr] items-center px-4 py-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-emerald-50/30 dark:hover:bg-slate-800/30 transition-colors group"
                                    >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                            {acc.icon}
                                        </div>
                                        <span className="font-bold text-slate-900 dark:text-slate-100">{acc.name}</span>
                                    </div>

                                    <div className="text-slate-500 dark:text-slate-400 font-medium">
                                        {acc.country}
                                    </div>

                                    <div className="text-right text-slate-500 dark:text-slate-400 font-medium">
                                        {acc.balance}
                                    </div>

                                    <div className="text-right text-slate-500 dark:text-slate-400 font-medium">
                                        {acc.total}
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                </Browser>
                    </div>
                </div>
            </div>
        </div>
    );
}
