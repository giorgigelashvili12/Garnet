"use client";

import Link from 'next/link'

export default function Footer() {
  const footerData = [
    {
      title: "Product",
      links: [
        { label: "Overview", href: "#" },
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Hardware", href: "#" },
        { label: "Integrations", href: "#" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Small Business", href: "#" },
        { label: "Enterprise", href: "#" },
        { label: "Restaurants", href: "#" },
        { label: "Retail", href: "#" },
        { label: "E-commerce", href: "#" },
      ],
    },
    {
      title: "Developers",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "SDKs", href: "#" },
        { label: "System Status", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "Guides", href: "#" },
        { label: "Community", href: "#" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Sales", href: "#" },
        { label: "Support", href: "#" },
        { label: "Press", href: "#" },
        { label: "Partners", href: "#" },
        { label: "Contact Us", href: "#" },
      ],
    },
  ];

  return (
    <footer className="py-16 bg-slate-50 dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {footerData.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold tracking-wider text-slate-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-slate-200 dark:border-zinc-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Garnet Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500 dark:text-slate-400">
            <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}