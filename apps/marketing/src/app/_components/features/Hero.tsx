"use client";

import Header from "@/shared/components/Header/Header";
import { Waves } from "@/shared/ui/Waves";
import React from "react";
import Info from "../assets/Info";

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden bg-background px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-28 md:pb-16">
      <Header />

      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <Waves />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute inset-0 bg-radial-at-t from-emerald-500/10 via-transparent to-transparent md:hidden" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        <Info />
      </div>
    </div>
  );
}
