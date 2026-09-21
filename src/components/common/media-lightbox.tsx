"use client";

import { useCallback, useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import { LightboxNextImage } from "@/components/common/lightbox-next-image";
import { toLightboxSlides } from "@/lib/gallery-media";
import type { GalleryMedia } from "@/types/gallery-media";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type MediaLightboxProps = {
  items: GalleryMedia[];
  index: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
};

export function MediaLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: MediaLightboxProps) {
  const slides = useMemo(() => toLightboxSlides(items), [items]);
  const open = index >= 0;

  const handleView = useCallback(
    ({ index: nextIndex }: { index: number }) => {
      onIndexChange?.(nextIndex);
    },
    [onIndexChange]
  );

  if (items.length === 0) return null;

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={Math.max(index, 0)}
      slides={slides}
      plugins={[Video, Zoom, Counter, Thumbnails]}
      animation={{ fade: 280, swipe: 320 }}
      controller={{ closeOnBackdropClick: true }}
      carousel={{ finite: false, preload: 2, imageFit: "contain" }}
      video={{
        autoPlay: true,
        controls: true,
        playsInline: true,
        // Browsers block unmuted autoplay; start muted so play works immediately.
        muted: true,
      }}
      counter={{ container: { style: { top: "unset", bottom: 0 } } }}
      thumbnails={{
        position: "bottom",
        border: 0,
        borderRadius: 2,
        padding: 8,
        gap: 8,
        imageFit: "cover",
      }}
      zoom={{ maxZoomPixelRatio: 2.5, scrollToZoom: true }}
      render={{ slide: LightboxNextImage }}
      on={{ view: handleView }}
      styles={{
        container: { backgroundColor: "rgba(14, 28, 23, 0.94)" },
        thumbnailsContainer: { backgroundColor: "rgba(14, 28, 23, 0.92)" },
      }}
    />
  );
}
