export const CapitalWidget = () => (
    <div className="relative w-full h-full flex justify-center items-end pt-12 pl-6">
        <div className="w-[110%] bg-white dark:bg-zinc-950 rounded-tl-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-5px_30px_rgba(0,0,0,0.2)] p-5 md:p-6 pr-10 flex flex-col gap-4 border border-slate-100 dark:border-zinc-800 bg-gradient-to-b from-white dark:from-zinc-950 to-slate-50/50 dark:to-zinc-900">
            <h3 className="font-semibold text-slate-900 dark:text-white text-[17px] mb-2">Capital</h3>
            
            <div className="flex gap-4 border-b border-slate-100 dark:border-zinc-800 pb-0">
                <span className="text-xs font-semibold text-slate-400 pb-2 cursor-pointer hover:text-slate-600 dark:hover:text-zinc-300 transition-colors">Overview</span>
                <span className="text-xs font-semibold text-emerald-600 border-b-[3px] border-emerald-600 pb-2 -mb-[2px]">Financing offers</span>
            </div>

            <div className="flex flex-col w-full text-[11px] mt-2">
                <div className="grid grid-cols-[3.5fr_2fr_2fr] pb-3 border-b border-slate-100 dark:border-zinc-800 text-slate-500 dark:text-zinc-500 font-semibold">
                    <div>Account</div>
                    <div>Offer amount</div>
                    <div>Offer accepted</div>
                </div>
                
                {[
                    {name: "Gleason Group", amount: "$400.00", accepted: "$200.00"},
                    {name: "Torp Group", amount: "$370.00", accepted: "$150.00"},
                    {name: "Lynch Inc", amount: "$120.00", accepted: "$100.00"},
                    {name: "Conroy Hammes", amount: "$680.00", accepted: "$400.00"},
                    {name: "Stehr LLC", amount: "$280.00", accepted: "$250.00"},
                    {name: "Larkin and Sons", amount: "$300.00", accepted: "$180.00"},
                    {name: "Prodigy Group", amount: "$220.00", accepted: "$150.00"}
                ].map((row, i) => (
                    <div key={i} className="grid grid-cols-[3.5fr_2fr_2fr] py-2.5 border-b border-slate-50 dark:border-zinc-900 font-medium whitespace-nowrap hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors">
                        <div className="text-slate-900 dark:text-zinc-200">{row.name}</div>
                        <div className="text-slate-500 dark:text-zinc-400">{row.amount}</div>
                        <div className="text-emerald-600/80 dark:text-emerald-500">{row.accepted}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
