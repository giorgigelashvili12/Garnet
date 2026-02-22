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