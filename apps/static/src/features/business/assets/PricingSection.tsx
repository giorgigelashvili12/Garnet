import Link from 'next/link'
import { Button } from '@/shared/widgets/business/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { Check } from 'lucide-react'

export default function Pricing() {
    return (
        <section className="py-16 md:py-32 text-white">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h1 className="text-center text-4xl font-semibold lg:text-5xl">Pricing that Scales with You</h1>
                    <p>Simple, transparent pricing for businesses of all sizes.</p>
                </div>

                <div className="mt-8 grid gap-6 [--color-card:var(--color-muted)] md:mt-20 md:grid-cols-3 dark:[--color-muted:var(--color-zinc-900)]">
                    <Card className="bg-muted flex flex-col border border-slate-600 bg-slate-700">
                        <CardHeader>
                            <CardTitle className="font-medium">Free</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">$0 / mo</span>
                            <CardDescription className="text-sm">Per editor</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />
                            <ul className="list-outside space-y-3 text-sm">
                                {['Payment Processing', 'Dashboard Analytics', 'Email Support', 'POS or Checkout Page'].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="mt-auto">
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/signup">Get Started</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="bg-muted relative border border-slate-200 bg-slate-700">
                        <span className="absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-gradient-to-br from-green-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">Popular</span>
                        <div className="flex flex-col ">
                            <CardHeader>
                                <CardTitle className="font-medium">Pro</CardTitle>
                                <span className="my-3 block text-2xl font-semibold">$19 / mo</span>
                                <CardDescription className="text-sm">Per editor</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <hr className="border-dashed" />
                                <ul className="list-outside space-y-3 text-sm">
                                    {['Everything in Free Plan', 'Lower Processing Fees', 'Basic Automation', 'Larger Team Members', 'Better Analytics', 'Faster Support', 'Integrations'].map((item, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <Check className="size-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href="/signup">Get Started</Link>
                                </Button>
                            </CardFooter>
                        </div>
                    </Card>

                    <Card className="bg-muted flex flex-col bg-slate-700 border border-slate-600">
                        <CardHeader>
                            <CardTitle className="font-medium">Startup</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">$29 / mo</span>
                            <CardDescription className="text-sm">Per editor</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />
                            <ul className="list-outside space-y-3 text-sm">
                                {['Everything in Pro Plan', 'Advanced Analytics', 'Live Support', 'Unlimited Team Members', 'Custom Branding', 'Advanced Automation'].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="mt-auto">
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/signup">Get Started</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}
