"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Play } from "lucide-react";

import { useMediaLightbox } from "@/components/common/use-media-lightbox";
import type { Room } from "@/data/rooms";
import { getMediaThumbnail } from "@/lib/gallery-media";
import { cn } from "@/lib/utils";
import {
  createImageMedia,
  createVideoMedia,
  isGalleryVideo,
  type GalleryMedia,
} from "@/types/gallery-media";

type RoomGalleryProps = {
  room: Room;
};

function getRoomGalleryItems(room: Room): GalleryMedia[] {
  const images = room.gallery.map((src, index) =>
    createImageMedia(src, `${room.name} — view ${index + 1}`, `${room.slug}-${index}`)
  );

  if (!room.video) return images;

  const videoItem = createVideoMedia({
    id: `${room.slug}-video`,
    src: room.video.src,
    poster: room.video.poster,
    alt: room.video.alt ?? `${room.name} tour`,
  });

  // Place video as the second item so the first still leads as hero photo.
  return [images[0], videoItem, ...images.slice(1)].filter(Boolean) as GalleryMedia[];
}

export function RoomGallery({ room }: RoomGalleryProps) {
  const items = getRoomGalleryItems(room);
  const [hero, ...rest] = items;
  const sideItems = rest.slice(0, 3);
  const { openAt, lightbox } = useMediaLightbox(items);

  if (!hero) return null;

  return (
    <>
      <div className="grid gap-2 sm:gap-3 lg:grid-cols-[1.55fr_1fr] lg:gap-3">
        <GalleryTile
          item={hero}
          index={0}
          onOpen={openAt}
          priority
          className="aspect-16/10 sm:aspect-2/1 lg:aspect-auto lg:min-h-128"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />

        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-1 lg:grid-rows-3">
          {sideItems.map((item, index) => (
            <GalleryTile
              key={item.id}
              item={item}
              index={index + 1}
              onOpen={openAt}
              className="aspect-4/3 lg:aspect-auto lg:min-h-0"
              sizes="(max-width: 1024px) 33vw, 28vw"
            />
          ))}
        </div>
      </div>
      {lightbox}
    </>
  );
}

type GalleryTileProps = {
  item: GalleryMedia;
  index: number;
  onOpen: (index: number) => void;
  className?: string;
  sizes: string;
  priority?: boolean;
};

function GalleryTile({
  item,
  index,
  onOpen,
  className,
  sizes,
  priority,
}: GalleryTileProps) {
  const isVideo = isGalleryVideo(item);
  const thumb = getMediaThumbnail(item);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "group relative overflow-hidden rounded-sm bg-muted text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        className
      )}
      aria-label={
        isVideo ? `Play video: ${item.alt}` : `View image: ${item.alt}`
      }
    >
      <Image
        src={thumb}
        alt={item.alt}
        fill
        priority={priority}
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes={sizes}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
      {isVideo ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition group-hover:scale-105 sm:size-12">
            <Play className="size-4 fill-current sm:size-5" />
          </span>
        </span>
      ) : null}
    </motion.button>
  );
}
