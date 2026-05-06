
export type Step = 0 | 1 | 2 | 3 | 4;
 
import { ReactNode } from "react";

export interface NodeProps {
  label?: string;
  sublabel?: string;
  active: boolean;
  delay?: number;
  className?: string;
  children?: ReactNode;
}
 
export interface ArrowProps {
  active: boolean;
  delay?: number;
  direction?: "left" | "down";
}

const ACTIVE_BG   = "var(--active-bg)";
const ACTIVE_TEXT = "var(--active-text)";
const ACCENT      = "var(--accent)";
const GRAY_BG     = "var(--gray-bg)";
const GRAY_TEXT   = "var(--gray-text)";
const GRAY_BORDER = "var(--gray-border)";
export const STEPS: { label: string; sub: string }[] = [
  { label: "Idle",           sub: "System ready" },
  { label: "Phase 1",        sub: "An incoming request to your server" },
  { label: "Phase 2",        sub: "Processing request and sending it to the processor" },
  { label: "Phase 3",        sub: "Based on request needs, it hits other services with B2B passes" },
  { label: "Phase 4",        sub: "Request is fullfilled." },
];

export { ACTIVE_BG, ACTIVE_TEXT, ACCENT, GRAY_BG, GRAY_TEXT, GRAY_BORDER };
