"use client";

import React, { useEffect, useRef } from "react";
import {Store} from "lucide-react";
import {useDict} from "@/shared/hooks/useDict";

export default function CardActivity() {
    const dict = useDict();

    return (
        <div className='bg-white py-10 flex flex-col gap-4 px-15 md:px-30 md:py-15 dark:bg-zinc-900 pointer-events-none select-none'>
            <div className='flex items-center gap-3'>
                <div className='bg-linear-to-r from-green-500 to-green-600 p-2 rounded-xl text-white'><Store/></div>
                <span className='text-xl font-medium'>{dict.charts.CardActivity.title}</span>
            </div>

            <div className='border border-stone-300 flex flex-col p-5 gap-1.5 rounded-sm bg-white dark:bg-zinc-800 dark:border-stone-700'>
                <span className='text-black/70 dark:text-white/80'>{dict.charts.CardActivity.text1}</span>
                <span className='text-3xl font-medium'>{dict.charts.CardActivity.text2}</span>
                <span className=''>{dict.charts.CardActivity.text3}</span>
            </div>

            <div className="w-full max-w-2xl bg-white p-8 rounded-xl border border-slate-100 shadow-sm select-none dark:bg-zinc-800 dark:border-stone-700">
                <h3 className="text-slate-900 font-semibold text-lg mb-6 dark:text-white">{dict.charts.CardActivity.text4}</h3>

                <div className="flex flex-col w-full">
                    <div className="flex items-center pb-3 gap-5 border-b border-slate-100">
                        <div className="w-1/4 font-medium text-slate-900 text-sm dark:text-white">{dict.charts.CardActivity.text5}</div>
                        <div className="w-1/4 font-medium text-slate-900 text-sm dark:text-white">{dict.charts.CardActivity.text6}</div>
                        <div className="w-1/4 font-medium text-slate-900 text-sm text-right dark:text-white">{dict.charts.CardActivity.text7}</div>
                    </div>

                    <div className="divide-y divide-slate-50">
                        <div className="flex items-center py-4 gap-5 group">
                            <div className="w-1/4 text-slate-500 text-sm dark:text-white">{dict.charts.CardActivity.text8}</div>
                            <div className="w-1/4 text-slate-500 text-sm dark:text-white pr-5">{dict.charts.CardActivity.text9}</div>
                            <div className="w-1/4 text-slate-900 text-sm text-right dark:text-white">{dict.charts.CardActivity.text10}</div>
                        </div>

                        <div className="flex items-center py-4 gap-5 group">
                            <div className="w-1/4 text-slate-500 text-sm dark:text-white">{dict.charts.CardActivity.text11}</div>
                            <div className="w-1/4 text-slate-500 text-sm dark:text-white">{dict.charts.CardActivity.text12}</div>
                            <div className="w-1/4 text-slate-900 text-sm text-right dark:text-white">{dict.charts.CardActivity.text13}</div>
                        </div>

                        <div className="flex items-center py-4 gap-5 group">
                            <div className="w-1/4 text-slate-500 text-sm dark:text-white">{dict.charts.CardActivity.text14}</div>
                            <div className="w-1/4 text-slate-500 text-sm dark:text-white">{dict.charts.CardActivity.text15}</div>
                            <div className="w-1/4 text-slate-900 text-sm text-right dark:text-white">{dict.charts.CardActivity.text17}</div>
                        </div>

                        <div className="flex items-center py-4 gap-5 group">
                            <div className="w-1/4 text-slate-500 text-sm dark:text-white">{dict.charts.CardActivity.text14}</div>
                            <div className="w-1/4 text-slate-500 text-sm dark:text-white">{dict.charts.CardActivity.text15}</div>
                            <div className="w-1/4 text-slate-900 text-sm text-right dark:text-white">{dict.charts.CardActivity.text16}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}