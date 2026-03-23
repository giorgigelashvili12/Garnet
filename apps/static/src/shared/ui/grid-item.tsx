import { cn } from "@/shared/lib/utils";
import { GridItemProps } from "@/shared/lib/@types";
import { GlowingEffect } from "@/shared/ui/glowing-effect";

export const GridItem = ({ area, icon, title, description, children }: GridItemProps) => {
    return (
        <li className={cn("min-h-56 list-none", area)}>
            <div className="relative bg-white dark:bg-(--dark-bg)/20 h-full rounded-[1.25rem] md:rounded-3xl px-6 pb-5">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={4}
                />
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-background">
                    <div className="relative flex flex-1 flex-col justify-between">
                        <div className="space-y-4">
                            {icon && (
                                <div className="w-fit rounded-lg border-[0.75px] bg-muted">
                                    {icon}
                                </div>
                            )}
                            <div className="space-y-3">
                                <h3 className="pt-0.5 text-xl leading-5.5 font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-7.5 text-balance text-foreground">
                                    {title}
                                </h3>
                                <p className="font-sans text-sm leading-4.5 md:text-base md:leading-5.5 text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {children && (
                            <div className="relative mt-auto w-full pt-4">
                                {children}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
};