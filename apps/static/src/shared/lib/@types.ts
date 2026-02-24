export interface AtomProps {
    symbol: string;
    electrons: number;
    fields?: number;
    color?: string;
    className?: string;
}

export interface WaveProps {
    className?: string;
    quality?: 'low' | 'high'
}

export interface SubmoduleProps {
    isDark: boolean;
    position: [number, number, number];
    label: string;
    sublabel: string;
    isMobile: boolean;
}
export interface DotWaveProps {
    color?: string;
    opacity?: number;
    dotSize?: number;
}

interface StepDetail {
    id: string;
    title: string;
    content: () => React.ReactNode;
}

export interface Step {
    id: string;
    title: string;
    desc: string;
    children: StepDetail;
}

export interface AccountData {
    id: string;
    name: string;
    status: "Enabled" | "In review" | "Rejected";
    balance: string;
}

export interface TickProps {
    target: number;
    start: number;
    steps: number[];
    pause?: number;
    delay?: number;
    isCurrency?: boolean;
}

export interface ProgressBarProps {
    timeline: number[];
    delays: number[];
}