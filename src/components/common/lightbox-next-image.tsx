"use client";

import Image from "next/image";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
  type RenderSlideProps,
} from "yet-another-react-lightbox";

function getSlideSrc(slide: { src: unknown }): string {
  if (typeof slide.src === "string") return slide.src;
  if (
    slide.src &&
    typeof slide.src === "object" &&
    "src" in slide.src &&
    typeof (slide.src as { src: unknown }).src === "string"
  ) {
    return (slide.src as { src: string }).src;
  }
  return "";
}

export function LightboxNextImage({ slide, offset, rect }: RenderSlideProps) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();
  const { currentIndex } = useLightboxState();

  if (!isImageSlide(slide) || typeof slide.width !== "number" || typeof slide.height !== "number") {
    return undefined;
  }

  const cover = isImageFitCover(slide, imageFit);
  const width = !cover
    ? Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width))
    : rect.width;
  const height = !cover
    ? Math.round(Math.min(rect.height, (rect.width / slide.width) * slide.height))
    : rect.height;

  const src = getSlideSrc(slide);
  if (!src) return undefined;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt={slide.alt ?? ""}
        src={src}
        loading="eager"
        draggable={false}
        className="object-contain"
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / Math.max(window.innerWidth, 1)) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}
