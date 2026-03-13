import IssuingCard from "@/shared/widgets/issuing/IssuingCard";
import {useDict} from "@/shared/hooks/useDict";

export function IssuingWeb() {
    const dict = useDict();

    const activities = [
        { date: dict.charts.IssuingWeb.dates.one, desc: dict.charts.IssuingWeb.desc.one, amount: "-$320.50" },
        { date: dict.charts.IssuingWeb.dates.two, desc: dict.charts.IssuingWeb.desc.two, amount: "-$50.45" },
        { date: dict.charts.IssuingWeb.dates.three, desc: dict.charts.IssuingWeb.desc.three, amount: "-$50.45" },
    ];

    return (
        <div className="dark:bg-zinc-900 bg-white py-6 lg:py-10 px-4 md:px-8 w-full flex flex-col lg:flex-row gap-10 lg:gap-0 select-none">
            <div className="flex-1 lg:px-10 order-2 lg:order-1">
                <div className="flex flex-col gap-2 border border-gray-300 dark:border-zinc-800 p-6 mb-8 rounded-xl bg-gray-50/50 dark:bg-zinc-800/30">
                    <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">{dict.charts.IssuingWeb.title}</span>
                    <span className="text-3xl md:text-4xl font-semibold dark:text-white">$1,805.87</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{dict.charts.IssuingWeb.price} $153.46</span>
                </div>

                <div className="w-full font-sans">
                    <h2 className="text-[#1a2b4b] text-xl font-bold mb-4 dark:text-white">{dict.charts.IssuingWeb.subtitle}</h2>

                    <div className="flex justify-between border-b border-gray-100 dark:border-zinc-800 pb-2 text-[10px] md:text-xs tracking-wider font-bold text-gray-400">
                        <span className="w-16 md:w-20">{dict.charts.IssuingWeb.tableAssets.one}</span>
                        <span className="flex-1 px-4">{dict.charts.IssuingWeb.tableAssets.two}</span>
                        <span className="w-20 md:w-24 text-right">{dict.charts.IssuingWeb.tableAssets.three}</span>
                    </div>

                    <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                        {activities.map((item, index) => (
                            <div key={index} className="flex justify-between py-4 text-xs md:text-sm items-center hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors px-1">
                                <span className="w-16 md:w-20 text-gray-500 dark:text-gray-400">{item.date}</span>
                                <span className="flex-1 px-4 font-medium text-[#1a2b4b] dark:text-white truncate">
                                    {item.desc}
                                </span>
                                <span className="w-20 md:w-24 text-right font-semibold text-[#1a2b4b] dark:text-white">
                                    {item.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-auto flex items-start justify-center lg:justify-end lg:pt-14 lg:px-10 order-1 lg:order-2">
                <div className="sticky top-6 lg:top-10 w-full max-w-85">
                    <IssuingCard />
                </div>
            </div>
        </div>
    );
}