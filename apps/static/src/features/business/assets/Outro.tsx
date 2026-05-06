import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import { ArrowRight } from 'lucide-react'
import { useDict } from "@/shared/hooks/useDict";

export default function Outro() {
    const dict = useDict();
    const t = dict.business.outro;

    return (
        <section className="relative overflow-hidden bg-slate-850 py-24 sm:py-32">
            <div 
                className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl" 
                aria-hidden="true"
            >
                <div 
                    className="aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-green-400 to-emerald-500 opacity-20" 
                    style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-3xl space-y-8 text-center">
                    <div className="space-y-4">
                        <span className="inline-block rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-slate-300 ring-1 ring-inset ring-slate-700/50">
                            {t.badge}
                        </span>
                        <h2 className="bg-linear-to-b from-white to-slate-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
                            {t.title}
                        </h2>
                        <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-slate-400">
                            {t.desc}
                        </p>
                    </div>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button 
                            asChild 
                            size="lg" 
                            className="h-12 px-8 text-base shadow-[0_0_20px_rgba(120,119,198,0.3)] transition-all hover:scale-105"
                        >
                            <Link href="/signup">
                                {t.btnStart}
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                        <Button 
                            asChild 
                            variant="ghost" 
                            size="lg" 
                            className="h-12 px-8 text-base text-white hover:bg-white/10"
                        >
                            <Link href="/contact">{t.btnSales}</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
