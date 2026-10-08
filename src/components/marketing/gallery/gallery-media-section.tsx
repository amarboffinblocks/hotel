"use client";

import { useQuery } from "@tanstack/react-query";

import { MediaGalleryGrid } from "@/components/common/media-gallery-grid";
import { galleryItems as seedGallery, type GalleryItem } from "@/data/gallery";
import { api } from "@/features/admin/api/client";
import { resourceQueryKey } from "@/features/admin/hooks/use-resource-api";
import {
  createImageMedia,
  createVideoMedia,
  type GalleryMedia,
} from "@/types/gallery-media";

function toGalleryMedia(items: GalleryItem[]): GalleryMedia[] {
  return items
    .filter((item) => item.published !== false)
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item) => {
      if (item.type === "video") {
        return createVideoMedia({
          id: item.id,
          src: item.src,
          alt: item.alt,
          poster: item.poster,
        });
      }
      return createImageMedia(item.src, item.alt, item.id);
    });
}

export function GalleryMediaSection() {
  const { data } = useQuery({
    queryKey: resourceQueryKey("gallery"),
    queryFn: () => api.list<GalleryItem>("gallery"),
    placeholderData: seedGallery,
  });

  const items = toGalleryMedia(data ?? seedGallery);

  return <MediaGalleryGrid items={items} />;
}
