import GarnetAI from "./assets/GarnetAI";
import HardwareSection from "./assets/HardwareSection";
import Outro from "./assets/Outro";
import Pricing from "./assets/PricingSection";

export default function Business() {
    return (
        <div id="business-section" className="bg-slate-800">
            <HardwareSection/>
            <GarnetAI/>
            <Pricing/>
            <Outro/>
        </div>
    )
}