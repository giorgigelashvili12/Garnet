"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import {
  productsData,
  navItems,
  developersData,
  developerGuides,
  developerResources,
  solutionsByAi,
  solutionsByBusiness,
  solutionsByOrganizations,
  resourcesLearn,
  resourcesSupport,
  resourcesCompany,
} from "./constants/sections";
import { ThemeToggle } from "@/shared/config/theme-provider";

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
    if (window.innerWidth >= 989) {
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
    if (window.innerWidth >= 989) {
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
      <div className="max-w-7xl mx-auto px-4 min-[760px]:px-6 flex items-center justify-between">
        <Logo />

        <div className="hidden min-[989px]:flex items-center gap-1">
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
                  className={`px-3 lg:px-4 py-2 text-sm font-semibold rounded-lg transition-colors block ${
                    isInHardwareSection
                      ? "text-slate-300 hover:text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  className={`px-3 lg:px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
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

        <div className="flex items-center gap-2 min-[989px]:gap-4">
          <ThemeToggle />

          <div className="hidden min-[760px]:block">
            <Link
              href="/login"
              className={`text-sm font-semibold transition-colors px-1 min-[760px]:px-2 ${
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
            className="hidden min-[760px]:flex bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            Get started
          </Button>

          <button
            aria-label="Toggle Navigation Menu"
            className={`min-[989px]:hidden p-2 rounded-lg transition-colors ${
              isInHardwareSection
                ? "text-white hover:bg-slate-700"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`hidden min-[989px]:block absolute top-full left-0 right-0 w-full border-b transition-all duration-300 ease-in-out shadow-2xl overflow-hidden ${
          activeTab
            ? "max-h-[32rem] opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } ${
          isInHardwareSection
            ? "bg-slate-800 border-slate-700"
            : "bg-white dark:bg-[#030a08] border-slate-200 dark:border-slate-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-8 animate-in fade-in slide-in-from-top-2 duration-300">
          {activeTab === "products" && (
            <div className="grid grid-cols-2 min-[989px]:grid-cols-3 lg:grid-cols-5 gap-6">
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
            <div className="grid grid-cols-1 min-[989px]:grid-cols-3 gap-8">
              <div>
                <h3 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">
                  Documentation
                </h3>
                {developersData.map((category) => (
                  <div key={category.title}>
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li
                          key={item.name}
                          className="text-emerald-500 hover:text-emerald-800"
                        >
                          <Link
                            href={item.url}
                            onClick={() => setActiveTab(null)}
                            className="group flex gap-1 items-center font-medium text-sm"
                          >
                            <span>{item.name}</span>
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">
                  Guides
                </h3>
                <ul className="space-y-2">
                  {developerGuides.map((item) => (
                    <li
                      key={item.title}
                      className="text-emerald-500 hover:text-emerald-800"
                    >
                      <Link
                        href={item.url}
                        onClick={() => setActiveTab(null)}
                        className="group flex gap-1 items-center font-medium text-sm"
                      >
                        <span>{item.title}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">
                  Resources
                </h3>
                <ul className="space-y-2">
                  {developerResources.map((item) => (
                    <li
                      key={item.title}
                      className="text-emerald-500 hover:text-emerald-800"
                    >
                      <Link
                        href={item.url}
                        onClick={() => setActiveTab(null)}
                        className="group flex gap-1 items-center font-medium text-sm"
                      >
                        <span>{item.title}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "solutions" && (
            <div className="grid grid-cols-1 min-[989px]:grid-cols-3 gap-8">
              <div>
                <h3 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">
                  By Business
                </h3>
                <ul className="space-y-2">
                  {solutionsByBusiness.map((item) => (
                    <li
                      key={item.title}
                      className="text-emerald-500 hover:text-emerald-800"
                    >
                      <Link
                        href={item.url}
                        onClick={() => setActiveTab(null)}
                        className="group flex gap-1 items-center font-medium text-sm"
                      >
                        <span>{item.title}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">
                  By Organizations
                </h3>
                <ul className="space-y-2">
                  {solutionsByOrganizations.map((item) => (
                    <li
                      key={item.title}
                      className="text-emerald-500 hover:text-emerald-800"
                    >
                      <Link
                        href={item.url}
                        onClick={() => setActiveTab(null)}
                        className="group flex gap-1 items-center font-medium text-sm"
                      >
                        <span>{item.title}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">
                  By AI
                </h3>
                <ul className="space-y-2">
                  {solutionsByAi.map((item) => (
                    <li
                      key={item.title}
                      className="text-emerald-500 hover:text-emerald-800"
                    >
                      <Link
                        href={item.url}
                        onClick={() => setActiveTab(null)}
                        className="group flex gap-1 items-center font-medium text-sm"
                      >
                        <span>{item.title}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="grid grid-cols-1 min-[989px]:grid-cols-3 gap-8">
              <div>
                <h3 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">
                  Learn
                </h3>
                <ul className="space-y-2">
                  {resourcesLearn.map((item) => (
                    <li
                      key={item.title}
                      className="text-emerald-500 hover:text-emerald-800"
                    >
                      <Link
                        href={item.url}
                        onClick={() => setActiveTab(null)}
                        className="group flex gap-1 items-center font-medium text-sm"
                      >
                        <span>{item.title}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">
                  Support
                </h3>
                <ul className="space-y-2">
                  {resourcesSupport.map((item) => (
                    <li
                      key={item.title}
                      className="text-emerald-500 hover:text-emerald-800"
                    >
                      <Link
                        href={item.url}
                        onClick={() => setActiveTab(null)}
                        className="group flex gap-1 items-center font-medium text-sm"
                      >
                        <span>{item.title}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-[15px] font-semibold tracking-wider text-slate-400">
                  Company
                </h3>
                <ul className="space-y-2">
                  {resourcesCompany.map((item) => (
                    <li
                      key={item.title}
                      className="text-emerald-500 hover:text-emerald-800"
                    >
                      <Link
                        href={item.url}
                        onClick={() => setActiveTab(null)}
                        className="group flex gap-1 items-center font-medium text-sm"
                      >
                        <span>{item.title}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`min-[989px]:hidden overflow-y-auto transition-all duration-300 ${
          mobileMenuOpen
            ? "max-h-[calc(100vh-5rem)] opacity-100 py-6"
            : "max-h-0 opacity-0 py-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          {navItems.map((item) => (
            <div
              key={item.key}
              className="border-b border-slate-200 dark:border-slate-800"
            >
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-500 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => toggleMobileTab(item.key)}
                  className="w-full flex items-center justify-between py-4 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-500 transition-colors"
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      mobileActiveTab === item.key ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}

              {mobileActiveTab === item.key && item.key === "products" && (
                <div className="pb-4 pl-3 space-y-4 animate-in fade-in duration-200">
                  {productsData.map((category) => (
                    <div key={category.title}>
                      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {category.title}
                      </h3>

                      <div className="space-y-1">
                        {category.items.map((p) => (
                          <Link
                            key={p.name}
                            href={p.url}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileActiveTab(null);
                            }}
                            className="block py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 px-2 transition-colors"
                          >
                            <div className="text-sm font-semibold text-emerald-500">
                              {p.name}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {p.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {mobileActiveTab === item.key && item.key === "developers" && (
                <div className="pb-4 pl-3 space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Documentation
                    </h3>
                    <div className="space-y-1">
                      {developersData.flatMap((d) =>
                        d.items.map((i) => (
                          <Link
                            key={i.name}
                            href={i.url}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileActiveTab(null);
                            }}
                            className="block py-1.5 text-sm font-medium text-emerald-500 hover:text-emerald-600 transition-colors"
                          >
                            {i.name}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Guides
                    </h3>
                    <div className="space-y-1">
                      {developerGuides.map((g) => (
                        <Link
                          key={g.title}
                          href={g.url}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileActiveTab(null);
                          }}
                          className="block py-1.5 text-sm font-medium text-emerald-500 hover:text-emerald-600 transition-colors"
                        >
                          {g.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Resources
                    </h3>
                    <div className="space-y-1">
                      {developerResources.map((r) => (
                        <Link
                          key={r.title}
                          href={r.url}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileActiveTab(null);
                          }}
                          className="block py-1.5 text-sm font-medium text-emerald-500 hover:text-emerald-600 transition-colors"
                        >
                          {r.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {mobileActiveTab === item.key && item.key === "solutions" && (
                <div className="pb-4 pl-3 space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      By Business
                    </h3>
                    <div className="space-y-1">
                      {solutionsByBusiness.map((s) => (
                        <Link
                          key={s.title}
                          href={s.url}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileActiveTab(null);
                          }}
                          className="block py-1.5 text-sm font-medium text-emerald-500 hover:text-emerald-600 transition-colors"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      By Organizations
                    </h3>
                    <div className="space-y-1">
                      {solutionsByOrganizations.map((s) => (
                        <Link
                          key={s.title}
                          href={s.url}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileActiveTab(null);
                          }}
                          className="block py-1.5 text-sm font-medium text-emerald-500 hover:text-emerald-600 transition-colors"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      By AI
                    </h3>
                    <div className="space-y-1">
                      {solutionsByAi.map((s) => (
                        <Link
                          key={s.title}
                          href={s.url}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileActiveTab(null);
                          }}
                          className="block py-1.5 text-sm font-medium text-emerald-500 hover:text-emerald-600 transition-colors"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {mobileActiveTab === item.key && item.key === "resources" && (
                <div className="pb-4 pl-3 space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Learn
                    </h3>
                    <div className="space-y-1">
                      {resourcesLearn.map((r) => (
                        <Link
                          key={r.title}
                          href={r.url}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileActiveTab(null);
                          }}
                          className="block py-1.5 text-sm font-medium text-emerald-500 hover:text-emerald-600 transition-colors"
                        >
                          {r.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Support
                    </h3>
                    <div className="space-y-1">
                      {resourcesSupport.map((r) => (
                        <Link
                          key={r.title}
                          href={r.url}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileActiveTab(null);
                          }}
                          className="block py-1.5 text-sm font-medium text-emerald-500 hover:text-emerald-600 transition-colors"
                        >
                          {r.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Company
                    </h3>
                    <div className="space-y-1">
                      {resourcesCompany.map((r) => (
                        <Link
                          key={r.title}
                          href={r.url}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileActiveTab(null);
                          }}
                          className="block py-1.5 text-sm font-medium text-emerald-500 hover:text-emerald-600 transition-colors"
                        >
                          {r.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="pt-6 mt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3 min-[760px]:hidden">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                nav.push("/api");
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl py-2.5 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              Get started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
