"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useDict } from "@/shared/hooks/useDict";

interface TextScrambleProps {
  text: string;
  className?: string;
}

export function TextScramble({ text, className = "" }: TextScrambleProps) {
  const dict = useDict();

  const CHARS_EN = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
  const CHARS_DE = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜßabcdefghijklmnopqrstuvwxyzäöü0123456789!@#$%&*";
  const CHARS_KA = "აბგდევზთიკლმნოპჟრსტუფქღყშცძწხჯჰ0123456789!@#$%&*";

  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const frameRef = useRef(0);

  const getCharSet = useCallback(() => {
    const locale = dict?.locale;
    if (locale === "ge") return CHARS_KA;
    if (locale === "de") return CHARS_DE;
    return CHARS_EN;
  }, [dict?.locale]);

  const scramble = useCallback(() => {
    setIsScrambling(true);
    frameRef.current = 0;
    const duration = text.length * 3;
    const charSet = getCharSet();

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      frameRef.current++;

      const progress = frameRef.current / duration;
      const revealedLength = Math.floor(progress * text.length);

      const newText = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealedLength) return text[i];
          return charSet[Math.floor(Math.random() * charSet.length)];
        })
        .join("");

      setDisplayText(newText);

      if (frameRef.current >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 15);
  }, [text, getCharSet]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    scramble();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      className={`group relative inline-flex flex-col cursor-pointer select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="relative">
        {displayText.split("").map((char, i) => (
          <span
            key={i}
            className={`inline-block transition-all duration-150 ${
              isScrambling && char !== text[i] ? "text-emerald-500 scale-110" : "text-foreground dark:text-white"
            }`}
            style={{
              transitionDelay: `${i * 10}ms`,
              whiteSpace: "pre"
            }}
          >
            {char}
          </span>
        ))}
      </span>

      <span
        className={`absolute -inset-4 rounded-lg bg-emerald-500/5 transition-opacity duration-300 -z-10 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}