import {SmokeBackground} from "@/pages/test/Waves";

export default function SmokeDemo() {
    return (
        <div className="relative w-full h-125 overflow-hidden rounded-xl border bg-black">
            <SmokeBackground smokeColor="#39FF14" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">

            </div>
        </div>
    );
}