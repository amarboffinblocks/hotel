"use client";

import { useCallback, useState } from "react";

import { MediaLightbox } from "@/components/common/media-lightbox";
import type { GalleryMedia } from "@/types/gallery-media";

export function useMediaLightbox(items: GalleryMedia[]) {
  const [index, setIndex] = useState(-1);

  const openAt = useCallback((nextIndex: number) => {
    setIndex(nextIndex);
  }, []);

  const close = useCallback(() => {
    setIndex(-1);
  }, []);

  const lightbox = (
    <MediaLightbox
      items={items}
      index={index}
      onClose={close}
      onIndexChange={setIndex}
    />
  );

  return {
    index,
    open: index >= 0,
    openAt,
    close,
    lightbox,
  };
}
