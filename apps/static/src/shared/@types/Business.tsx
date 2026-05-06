"use client";

import { TableTerminal, TerminalCase, TerminalStand, WallMount, OnTableTerminal } from "../components/Business/Exports";
import Image from "next/image";

export interface HardwareProduct {
  id: string;
  name: string;
  badge?: string;
  price: string;
  description: string;
  accentColor: string;
  component: React.ReactNode;
}

export const PRODUCTS: HardwareProduct[] = [
  {
    id: "table-terminal",
    name: "Garnet Register",
    // badge: "New!",
    price: "From $799",
    description: "All-in-one POS with a dedicated customer-facing display. No iPad required.",
    accentColor: "#2C2926",
    component: <TableTerminal/>,
  },
  {
    id: "terminal-case",
    name: "Garnet Terminal Case",
    price: "From $299",
    description: "Take orders and payments tableside. Sleek, portable, and powerful.",
    accentColor: "#2C2926",
    component: <TerminalCase/>,
  },
  {
    id: "terminal-stand",
    name: "Garnet Terminal Stand",
    price: "From $299",
    description: "All-in-one payments terminal with a built-in printer for receipts.",
    accentColor: "#2C2926",
    component: <TerminalStand/>,
  },
  {
    id: "wall-mount",
    name: "Garnet Wall Mount Terminal",
    price: "From $149",
    description: "Transform your iPad into a powerful point of sale. Swivel, tap, done.",
    accentColor: "#2C2926",
    component: <WallMount/>,
  },
  {
    id: "on-table-terminal",
    name: "Garnet Table Terminal",
    price: "From $149",
    description: "Transform your iPad into a powerful point of sale. Swivel, tap, done.",
    accentColor: "#2C2926",
    component: <OnTableTerminal/>,
  },
];

export interface ProductCardProps {
  product: HardwareProduct;
  index: number;
}

const HARDWARE = [
  {
    id: 1,
    category: "POS & Display",
    name: "Garnet Register",
    price: "$799",
    badge: "Best Seller",
    badgeColor: "#16a34a",
    desc: "All-in-one POS with a dedicated customer-facing display. No iPad required.",
    emoji: <div>
      <Image src="/business/table-terminal.png" alt="Register" width={120} height={120} className="bg-white mb-5 rounded-md" />
    </div>,
    link: "",
    tags: ["POS", "Payments", "Receipt"],
  },
];

const TYPING_TEXT = "Based on my café — 800 sq ft, 12 tables, takeaway counter — what hardware should I purchase?";

export { HARDWARE, TYPING_TEXT };
