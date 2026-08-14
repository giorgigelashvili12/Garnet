import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

const freePlan = [
    "Payment Processing",
    "Dashboard Analytics",
    "Email Support",
    "POS or Checkout Page",
];

const proPlan = [
    "Everything in Free Plan",
    "Lower processing fees",
    "Basic automation",
    "Larger team members",
    "Better analytics",
    "Faster support",
    "Integrations",
];

const startupPlan = [
    "Everything in Pro Plan",
    "Advanced analytics",
    "Live support",
    "Unlimited team members",
    "Custom branding",
    "Advanced automation",
];

export default function Pricing() {
    return (
        <section className="py-16 md:py-32 text-white">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-2xl space-y-4 text-center">
                    <h1 className="text-center text-4xl font-semibold lg:text-5xl">
                        Simple, transparent pricing
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Choose the plan that best fits your business needs.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3 items-stretch">
                    <Card className="flex flex-col border border-slate-600 bg-slate-700 text-white">
                        <CardHeader>
                            <CardTitle className="font-medium">Free</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">$0 / mo</span>
                            <CardDescription className="text-sm text-slate-300">Per editor</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <hr className="border-dashed border-slate-600" />
                            <ul className="list-outside space-y-3 text-sm">
                                {freePlan.map((item: string, index: number) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-4 text-emerald-400 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="mt-auto pt-6 bg-slate-700 border border-slate-600">
                            <Button variant="outline" className="w-full text-white bg-slate-700 border border-white rounded-xl cursor-pointer">
                                <Link href="/signup">Get Started</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="relative flex flex-col border-2 border-emerald-500/50 bg-slate-700 text-white overflow-visible shadow-xl">
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-green-400 px-4 py-1 rounded-full font-semibold text-xs tracking-wider text-black z-20 shadow-md whitespace-nowrap">
                            Popular
                        </span>
                        <CardHeader>
                            <CardTitle className="font-medium">Pro</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">$19 / mo</span>
                            <CardDescription className="text-sm text-slate-300">Per editor</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <hr className="border-dashed border-slate-600" />
                            <ul className="list-outside space-y-3 text-sm">
                                {proPlan.map((item: string, index: number) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-4 text-emerald-400 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="mt-auto pt-6 bg-slate-700 border border-slate-600">
                            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium cursor-pointer">
                                <Link href="/signup">Get Started</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="flex flex-col border border-slate-600 bg-slate-700 text-white">
                        <CardHeader>
                            <CardTitle className="font-medium">Startup</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">$29 / mo</span>
                            <CardDescription className="text-sm text-slate-300">Per editor</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <hr className="border-dashed border-slate-600" />
                            <ul className="list-outside space-y-3 text-sm">
                                {startupPlan.map((item: string, index: number) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-4 text-emerald-400 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="mt-auto pt-6 bg-slate-700 border border-slate-600">
                            <Button variant="outline" className="w-full text-white bg-slate-700 border border-white rounded-xl cursor-pointer">
                                <Link href="/signup">Get Started</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}