"use client";

import { ChevronDown } from "lucide-react";
import { SidebarItemProps } from "@/shared/@types/Sidebar";
import { SidebarSectionProps } from "@/shared/@types/Sidebar";

export const SidebarItem = ({ icon: Icon, label, active = false, hasChevron = false, isShortcut = false }: SidebarItemProps) => (
    <div className={`flex items-center justify-between w-full px-3 py-2 cursor-pointer transition-colors group`}>
        <div className="flex items-center gap-3">
            <span className={`text-[15px] font-medium truncate ${
                active ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100'
            } ${isShortcut && active ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                {label}
            </span>
        </div>
        {hasChevron && <ChevronDown size={16} className="text-slate-400 dark:text-slate-500" />}
    </div>
);

export const SidebarSection = ({ title, children }: SidebarSectionProps) => (
    <div className="mt-8">
        <h3 className="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {title}
        </h3>
        <div className="space-y-0.5">
            {children}
        </div>
    </div>
);
