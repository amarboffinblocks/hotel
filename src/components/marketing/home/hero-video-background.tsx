"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type HeroVideoBackgroundProps = {
  poster: string;
  src: string;
  className?: string;
};

export function HeroVideoBackground({
  poster,
  src,
  className,
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const tryPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || hasError) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      // Ignore — muted autoplay usually succeeds on retry
    }
  }, [hasError]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    void tryPlay();

    const onVisibility = () => {
      if (document.visibilityState === "visible") void tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [src, tryPlay]);

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden bg-stone-900", className)}
    >
      {/* Poster always under video */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${poster}')`,
          backgroundPosition: "center center",
        }}
        aria-hidden
      />

      {!hasError ? (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            isPlaying ? "opacity-100" : "opacity-0"
          )}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          onLoadedData={() => void tryPlay()}
          onCanPlay={() => void tryPlay()}
          onPlaying={() => setIsPlaying(true)}
          onError={() => setHasError(true)}
          aria-hidden
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/65" />
    </div>
  );
}
