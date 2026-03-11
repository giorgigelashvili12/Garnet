"use client";

import React, { useEffect, useRef, memo } from "react";
import Hls from "hls.js";

const BackgroundVideo = memo(() => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const src = "https://stream.mux.com/hUT6X11m1Vkw1QMxPOLgI761x2cfpi9bHFbi5cNg4014.m3u8";

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hls: Hls | null = null;

        const startPlayback = () => {
            video.play().catch((err) => {
                console.warn("Autoplay prevented by browser policies:", err);
            });
        };

        if (Hls.isSupported()) {
            hls = new Hls({
                capLevelToPlayerSize: true,
                autoStartLoad: true,
            });

            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                hls?.on(Hls.Events.MANIFEST_PARSED, startPlayback);
            });

            hls.on(Hls.Events.ERROR, (_, data) => {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            hls?.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            hls?.recoverMediaError();
                            break;
                        default:
                            hls?.destroy();
                            break;
                    }
                }
            });
        }
        else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = src;
            video.addEventListener("loadedmetadata", startPlayback);
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, []);

    return (
        <video
            ref={videoRef}
            muted
            autoPlay
            loop
            playsInline
            className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
            style={{ filter: "brightness(0.6)" }}
        />
    );
});

BackgroundVideo.displayName = "BackgroundVideo";

export default BackgroundVideo;