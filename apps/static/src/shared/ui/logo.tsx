import Link from "next/link";
import Image from "next/image";

interface LogoProps {
    className?: string;
    hideText?: boolean;
}

export default function Logo({ className = "", hideText = false }: LogoProps) {
    const content = (
        <div className={`flex items-center gap-3 group ${className}`}>
            <Image src="/crystal-1.png" alt="Logo" width={40} height={40} className="transition-transform group-hover:scale-110" />
            {!hideText && <span className="font-black tracking-tighter text-2xl text-slate-900 dark:text-white">Garnet</span>}
        </div>
    );

    if (hideText) return content;

    return (
        <Link href="/">
            {content}
        </Link>
    );
}