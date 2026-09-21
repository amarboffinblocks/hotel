import type { Slide } from "yet-another-react-lightbox";

import type { GalleryMedia } from "@/types/gallery-media";
import { isGalleryVideo } from "@/types/gallery-media";

export function toLightboxSlides(items: GalleryMedia[]): Slide[] {
  return items.map((item) => {
    if (isGalleryVideo(item)) {
      return {
        type: "video" as const,
        width: item.width ?? 1280,
        height: item.height ?? 720,
        poster: item.poster,
        sources: [
          {
            src: item.src,
            type: "video/mp4",
          },
        ],
      };
    }

    return {
      src: item.src,
      alt: item.alt,
      width: item.width ?? 1600,
      height: item.height ?? 1067,
    };
  });
}

export function getMediaThumbnail(item: GalleryMedia): string {
  if (isGalleryVideo(item)) {
    return item.poster ?? item.src;
  }
  return item.src;
}
