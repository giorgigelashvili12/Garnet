"use client";

import Link from 'next/link'
import { useDict } from "@/shared/hooks/useDict";

export default function Footer() {
  const dict = useDict();
  const t = dict.footer;

  const footerData = [
    {
      title: t.sections.products,
      links: [
        { label: t.links.pos, href: "#" },
        { label: t.links.payments, href: "#" },
        { label: t.links.websites, href: "#" },
        { label: t.links.invoicing, href: "#" },
        { label: t.links.marketing, href: "#" },
        { label: t.links.loyalty, href: "#" },
        { label: t.links.banking, href: "#" },
        { label: t.links.capital, href: "#" },
        { label: t.links.checkout, href: "#" },
        { label: t.links.subscriptions, href: "#" },
        { label: t.links.terminal, href: "#" },
        { label: t.links.usage, href: "#" },
      ],
    },
    {
      title: t.sections.solutions,
      links: [
        { label: t.links.enterprises, href: "#" },
        { label: t.links.startups, href: "#" },
        { label: t.links.food, href: "#" },
        { label: t.links.retail, href: "#" },
        { label: t.links.ecommerce, href: "#" },
        { label: t.links.saas, href: "#" },
        { label: t.links.marketplaces, href: "#" },
        { label: t.links.services, href: "#" },
        { label: t.links.hospitality, href: "#" },
        { label: t.links.creator, href: "#" },
      ],
    },
    {
      title: t.sections.developers,
      links: [
        { label: t.links.docs, href: "#" },
        { label: t.links.apiRef, href: "#" },
        { label: t.links.apiStatus, href: "#" },
        { label: t.links.libraries, href: "#" },
        { label: t.links.devBlog, href: "#" },
        { label: t.links.devPlatform, href: "#" },
      ],
    },
    {
      title: t.sections.resources,
      links: [
        { label: t.links.pricing, href: "#" },
        { label: t.links.guides, href: "#" },
        { label: t.links.stories, href: "#" },
        { label: t.links.blog, href: "#" },
        { label: t.links.community, href: "#" },
        { label: t.links.privacy, href: "#" },
        { label: t.links.cookies, href: "#" },
      ],
    },
    {
      title: t.sections.contact,
      links: [
        { label: t.links.support, href: "#" },
        { label: t.links.customerSupport, href: "tel:18557006000" },
        { label: t.links.salesSupport, href: "tel:18339595325" },
        { label: t.links.about, href: "#" },
        { label: t.links.careers, href: "#" },
        { label: t.links.press, href: "#" },
      ],
    },
  ];

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
            &copy; {new Date().getFullYear()} Garnet Inc. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
