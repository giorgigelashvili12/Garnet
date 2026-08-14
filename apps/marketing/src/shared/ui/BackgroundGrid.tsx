import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundGridProps {
  className?: string;
  gridColor?: string;
  gridWidth?: number;
  gridHeight?: number;
  showGlow?: boolean;
  glowColor?: string;
  glowRadius?: number;
}

export default function BackgroundGrid({
  className,
  gridColor = "#f0f0f0",
  gridWidth = 96,
  gridHeight = 64,
  showGlow = false,
  glowColor = "#d5c5ff",
  glowRadius = 800,
}: BackgroundGridProps) {
  const backgroundImage = showGlow
    ? `
        linear-gradient(to right, ${gridColor} 1px, transparent 1px),
        linear-gradient(to bottom, ${gridColor} 1px, transparent 1px),
        radial-gradient(circle ${glowRadius}px at 100% 200px, ${glowColor}, transparent)
      `
    : `
        linear-gradient(to right, ${gridColor} 1px, transparent 1px),
        linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
      `;

  const backgroundSize = showGlow
    ? `${gridWidth}px ${gridHeight}px, ${gridWidth}px ${gridHeight}px, 100% 100%`
    : `${gridWidth}px ${gridHeight}px, ${gridWidth}px ${gridHeight}px`;

  return (
    <div
      className={cn("absolute inset-0 pointer-events-none z-0", className)}
      style={{
        backgroundImage,
        backgroundSize,
      }}
    />
  );
}
