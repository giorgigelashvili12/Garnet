import { Button } from '@/components/ui/button'
import Gorgia from '@/shared/components/Payments/Interface/Gorgia'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
    return (
        <div className='z-11 flex items-center gap-15'>
            <div className='flex flex-col gap-5 text-left'>
                <h1 className='text-5xl font-medium'>Accept payments globally anywhere, anytime</h1>

                <p className='text-gray-600'>Accept payments over multiple currencies all around the world to grow your revenue.</p>

                <Link href="dashboard.garnet.com" className='cursor-pointer'>
                    <Button className="bg-emerald-500 px-5 rounded-xl hover:bg-emerald-600 cursor-pointer">
                        Start <ArrowRight />
                    </Button>
                </Link>
            </div>

            <div>
                <div><Gorgia /></div>
            </div>
        </div>
    )
}
