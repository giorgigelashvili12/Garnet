"use client";

import { useState, useEffect, memo } from "react";
import { useInView } from "react-intersection-observer";
import { Node, Arrow, PulseRing } from "@/shared/widgets/garnet-adapter/Business";
import { STEPS, ACTIVE_BG, ACCENT, Step } from "@/shared/@types";
import RadialBg from "@/shared/ui/RadialBg";
import Image from "next/image";
import Logo from "@/shared/ui/logo";
import Link from "next/link";

import { useDict } from "@/shared/hooks/useDict";

const MemoNode = memo(Node);
const MemoArrow = memo(Arrow);
const MemoPulse = memo(PulseRing);

export default function GarnetAdapter() {
  const [step, setStep] = useState<Step>(0);
  const [playing, setPlaying] = useState(false);

  const dict = useDict();
  const t = dict.features.adapter;

  const translatedSteps = [
    { label: "Idle", sub: "" },
    { label: "Phase 1", sub: t.phase1 },
    { label: "Phase 2", sub: t.phase2 },
    { label: "Phase 3", sub: t.phase3 },
    { label: "Phase 4", sub: t.phase4 },
  ];

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && step === 0) {
      setPlaying(true);
    }
  }, [inView]);

  useEffect(() => {
    if (!playing || step >= 4) {
      if (step >= 4) setPlaying(false);
      return;
    }
    const delay = step === 0 ? 1600 : 2600;
    const t = setTimeout(() => setStep((s) => (s + 1) as Step), delay);
    return () => clearTimeout(t);
  }, [playing, step]);

  const reset = () => { setStep(0); setPlaying(false); };
  const play = () => { setStep(0); setPlaying(true); };

  const s = step;
  const isS1 = s >= 1;
  const isS2 = s >= 2;
  const isS3 = s >= 3;

  return (
    <RadialBg>
      <div ref={ref} className="flex flex-col items-center justify-center p-8 min-h-screen rounded-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
            {t.title}
          </h1>
          <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 tracking-widest px-4">
            {t.subtitle}
          </p>
        </div>

        <div className="w-full overflow-x-auto pb-8 scrollbar-hide">
          <div className="flex items-center justify-center min-w-[800px] gap-0 mb-10 h-[300px] scale-90 md:scale-100 origin-center">
            {inView && (
              <>
                <div className="flex flex-col gap-4 mr-2">
                  {["Business / Service 1", "Business / Service 2", "Business / Service 3"].map((lbl, i) => (
                    <div key={lbl} className="relative">
                      <MemoNode label={lbl} active={isS3} delay={0.05 * i} className="w-40 h-16 shadow-sm" />
                      <MemoPulse active={isS3} />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 mr-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-16 flex items-center">
                      <MemoArrow active={isS3} delay={0.05 * i} />
                    </div>
                  ))}
                </div>

                <div className="relative mx-4">
                  <MemoNode active={isS2} className="w-44 h-36 border-emerald-500/50 shadow-emerald-500/10">
                    <div className="flex flex-col items-center gap-2">
                      <Logo className="w-12 h-12" hideText />
                      <span className="text-sm font-bold">Garnet</span>
                      <span className="text-[10px] opacity-75">{t.nodeProcessor}</span>
                    </div>
                  </MemoNode>
                  <MemoPulse active={isS2} />
                </div>

                <div className="mx-2">
                  <MemoArrow active={isS2} />
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center mb-2 h-10 justify-end">
                    {isS1 && (
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 animate-in fade-in slide-in-from-bottom-1 duration-500">
                        {t.incoming}
                      </span>
                    )}
                    <MemoArrow active={isS1} direction="down" />
                  </div>

                  <div className="relative">
                    <MemoNode label={t.nodeYourService} active={isS1} className="w-44 h-28" />
                    <MemoPulse active={isS1} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="h-12 flex items-center justify-center mb-8 px-4 w-full max-w-md">
          {s > 0 && (
            <p key={s} className="text-xl font-semibold text-center dark:text-emerald-300 text-emerald-800 animate-in fade-in slide-in-from-bottom-2 duration-700">
              {translatedSteps[s].sub}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={play}
            disabled={playing}
            className="group cursor-pointer relative px-8 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 overflow-hidden shadow-xl"
            style={{ backgroundColor: playing ? "var(--gray-border)" : ACCENT }}
          >
            <span className="relative z-10">{playing ? t.syncing : t.runFlow}</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={reset}
            className="px-8 py-3 cursor-pointer rounded-xl text-sm font-bold border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all active:scale-95"
          >
            {t.reset}
          </button>
        </div>
        <div className="flex gap-3 mt-10">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-700 ${i <= s ? "scale-150 shadow-[0_0_8px_var(--accent)]" : "scale-100 opacity-30"
                }`}
              style={{ backgroundColor: i <= s ? ACCENT : "var(--gray-border)" }}
            />
          ))}
        </div>

        <div>
          <Link href="/docs/garnet-adapter">
            <button className="px-8 mt-10 py-3 cursor-pointer text-sm font-bold border-b-2 text-emerald-900 hover:scale-105 dark:text-emerald-200 hover:border-emerald-900 dark:hover:border-emerald-200">
              {t.readMore}
            </button>
          </Link>
        </div>
      </div>
    </RadialBg>
  );
}