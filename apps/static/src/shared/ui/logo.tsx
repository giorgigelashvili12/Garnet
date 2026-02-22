import Link from "next/link";
import Image from "next/image";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-3 group">
            {/*<div className="w-8 h-8 rounded-lg flex items-center justify-center font-black transition-transform group-hover:scale-110 bg-emerald-500 text-white">S</div>*/}
            <Image src="/crystal-1.png" alt="Logo" width={40} height={40} />

            <span className="font-black tracking-tighter text-2xl text-slate-900 dark:text-white">Garnet</span>
        </Link>
    )
}