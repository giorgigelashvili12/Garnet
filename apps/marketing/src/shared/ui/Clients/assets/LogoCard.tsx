import { cn } from "@/lib/utils";
import { Logo } from "./Companies";
import { PixelCanvas } from "./PixelCanvas";

export function LogoCard({ logo }: { logo: Logo }) {
    const { Svg, multicolor, brandLight, brandDark, height, pixelColors, row, col } = logo;

    return (
        <div
            className={cn(
                "group relative grid place-items-center overflow-hidden bg-card cursor-pointer select-none isolate",
                "transition-shadow duration-300 hover:z-[2]",
                "[--brand:var(--brand-light)] dark:[--brand:var(--brand-dark)]",
                "hover:shadow-[0_8px_24px_-8px_color-mix(in_srgb,var(--brand)_25%,transparent),0_0_0_1px_color-mix(in_srgb,var(--brand)_40%,transparent)]"
            )}
            style={
                {
                    "--brand-light": brandLight,
                    "--brand-dark": brandDark ?? brandLight,
                    gridRow: row,
                    gridColumn: col,
                } as React.CSSProperties
            }
        >
            <PixelCanvas colors={pixelColors} gap={5} speed={30} />
            <Svg
                className={cn(
                    "relative z-[1] w-auto max-w-[65%] transition-all duration-300 group-hover:scale-[1.06]",
                    multicolor
                        ? cn(
                            "grayscale opacity-50 dark:brightness-0 dark:invert",
                            "group-hover:grayscale-0 group-hover:opacity-100",
                            "dark:group-hover:brightness-100 dark:group-hover:invert-0"
                        )
                        :
                        "text-muted-foreground/60 group-hover:text-[var(--brand)]"
                )}
                style={{ height: `${height}px`, maxHeight: `${height}px` }}
            />
        </div>
    );
}
