"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Play } from "lucide-react";

import { useMediaLightbox } from "@/components/common/use-media-lightbox";
import { getMediaThumbnail } from "@/lib/gallery-media";
import { cn } from "@/lib/utils";
import type { GalleryMedia } from "@/types/gallery-media";
import { isGalleryVideo } from "@/types/gallery-media";

type MediaGalleryGridProps = {
  items: GalleryMedia[];
  className?: string;
  columnsClassName?: string;
  aspectClassName?: string;
};

export function MediaGalleryGrid({
  items,
  className,
  columnsClassName = "grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
  aspectClassName = "aspect-4/3",
}: MediaGalleryGridProps) {
  const { openAt, lightbox } = useMediaLightbox(items);

  if (items.length === 0) return null;

  return (
    <>
      <div className={cn("grid", columnsClassName, className)}>
        {items.map((item, index) => {
          const thumb = getMediaThumbnail(item);
          const isVideo = isGalleryVideo(item);

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => openAt(index)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className={cn(
                "group relative overflow-hidden rounded-sm border border-[#E8DCCB] bg-muted text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                aspectClassName
              )}
              aria-label={
                isVideo
                  ? `Play video: ${item.alt}`
                  : `View image: ${item.alt}`
              }
            >
              <Image
                src={thumb}
                alt={item.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />

              {isVideo ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition group-hover:scale-105 sm:size-14">
                    <Play className="size-5 fill-current sm:size-6" />
                  </span>
                </span>
              ) : null}

              <span className="absolute right-2.5 bottom-2.5 max-w-[80%] truncate rounded-sm bg-black/55 px-2 py-1 text-[10px] font-medium tracking-wide text-white uppercase backdrop-blur-sm">
                {item.alt}
              </span>
            </motion.button>
          );
        })}
      </div>
      {lightbox}
    </>
  );
}
