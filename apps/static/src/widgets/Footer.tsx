"use client";

import Link from 'next/link'

const footerData = [
  {
    title: "Products",
    links: [
      { label: "Point of sale", href: "#" },
      { label: "Payments", href: "#" },
      { label: "Websites", href: "#" },
      { label: "Invoicing", href: "#" },
      { label: "Marketing", href: "#" },
      { label: "Loyalty", href: "#" },
      { label: "Banking", href: "#" },
      { label: "Capital", href: "#" },
      { label: "Checkout", href: "#" },
      { label: "Subscriptions", href: "#" },
      { label: "Terminal", href: "#" },
      { label: "Usage-based billing", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Enterprises", href: "#" },
      { label: "Startups", href: "#" },
      { label: "Food & Beverage", href: "#" },
      { label: "Retail", href: "#" },
      { label: "Ecommerce", href: "#" },
      { label: "SaaS", href: "#" },
      { label: "Marketplaces", href: "#" },
      { label: "Professional Services", href: "#" },
      { label: "Hospitality", href: "#" },
      { label: "Creator economy", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API reference", href: "#" },
      { label: "API status", href: "#" },
      { label: "Libraries and SDKs", href: "#" },
      { label: "Developer blog", href: "#" },
      { label: "Developer Platform", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Customer stories", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Square Community", href: "#" },
      { label: "Privacy and terms", href: "#" },
      { label: "Cookie settings", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Support", href: "#" },
      { label: "Customer support: 1 (855) 700-6000", href: "tel:18557006000" },
      { label: "Sales: 1 (833) 959-5325", href: "tel:18339595325" },
      { label: "About Square", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press & Media", href: "#" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-white py-16 dark:bg-slate-950 z-1000">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {footerData.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-slate-200 pt-8 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Garnet Inc. All rights reserved. 
            Various trademarks held by their respective owners.
          </p>
        </div>
      </div>
    </footer>
  )
}
