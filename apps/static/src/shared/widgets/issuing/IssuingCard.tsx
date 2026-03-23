import {SmokeBackground} from "@/shared/icons/Waves";
import {Chip} from "@/shared/icons/Chip";

export default function IssuingCard() {
    return (
        <div className="relative w-85 h-53.75 overflow-hidden rounded-xl bg-white dark:bg-black border border-white/10 shadow-2xl pointer-events-none select-none">
            <SmokeBackground smokeColor="#39a102" />

            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                <div className="flex justify-between items-start">
                    <div className='mt-15'>
                        <Chip/>
                    </div>
                    <span className="text-md font-bold tracking-widest">Quick Market</span>
                </div>

                <div className="text-xs">
                    <p>Giorgi Gelashvili</p>
                </div>
            </div>
        </div>
    );
}