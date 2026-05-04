"use client";

import { useState, useEffect, useRef, useCallback, startTransition, memo } from "react";
import dynamic from "next/dynamic";

const DeliveryScene = dynamic(() => import("@/shared/components/Delivery/assets/DelvieryScene"), { ssr: false });
const StageControls = dynamic(() => import("@/shared/components/Delivery/assets/StageControls"), { ssr: false });
import { STAGES } from "@/shared/components/Delivery/libs/delivery";

export default function Map() {
    const STAGE_DURATIONS: number[] = [2000, 1600, 2800, 2200, 99_999];
    
    const [stageIdx, setStageIdx] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimer = () => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        if (!autoPlay) return;
        clearTimer();
        timerRef.current = setTimeout(() => {
            setStageIdx((i) => Math.min(i + 1, STAGES.length - 1));
        }, STAGE_DURATIONS[stageIdx]);
        return clearTimer;
    }, [stageIdx, autoPlay]);

    const handleStageChange = useCallback((idx: number) => {
        clearTimer();
        setAutoPlay(false);
        startTransition(() => { setStageIdx(idx); });
    }, []);

    const handleReplay = useCallback(() => {
        clearTimer();
        startTransition(() => {
            setStageIdx(0);
            setAutoPlay(true);
        });
    }, []);

    return (
        <>
            <DeliveryScene stageIdx={stageIdx} />
            <StageControls
                current={stageIdx}
                onChange={handleStageChange}
                onReplay={handleReplay}
            />
        </>
    )
}