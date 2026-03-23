import {GridItem} from "@/shared/ui/grid-item";
import {Box, Settings, Sparkles, Lock, Search} from "lucide-react";
import AgentCommerce from "@/features/agent-commerce/AgentCommerce";

import Billing from "@/features/billing/Billing";
import React from "react";
import {useDict} from "@/shared/hooks/useDict";

export default function Section() {
    const dict = useDict();
    const trigger = dict?.billing?.trigger;

    return (
        <ul className="grid grid-cols-1 md:grid-cols-12 auto-rows-fr px-70 -mt-20 gap-4">
            <GridItem area="md:[grid-area:1/1/4/8]">
                <h1 className="text-xl md:text-3xl font-medium tracking-tighter text-slate-900 dark:text-white leading-[1.1] mb-20">
                    {trigger?.title}
                </h1>

                <Billing/>
            </GridItem>

            <GridItem area="md:[grid-area:1/8/4/13]">
                <h1 className='text-xl md:text-3xl font-medium tracking-tighter text-slate-900 dark:text-white leading-[1.1] mb-23'>{dict.charts.AgentCommerce.title}</h1>

                <AgentCommerce/>
            </GridItem>
        </ul>
    )
}