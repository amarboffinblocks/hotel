import { experiences, heroContent } from "@/data/content";
import { offers } from "@/data/offers";
import { rooms } from "@/data/rooms";

export type GalleryItemType = "image" | "video";

export type GalleryItem = {
  id: string;
  type: GalleryItemType;
  src: string;
  alt: string;
  poster?: string;
  sortOrder: number;
  published: boolean;
};

/** Seed / fallback items matching the previous static gallery composition */
export const galleryItems: GalleryItem[] = (() => {
  const items: GalleryItem[] = [];
  let order = 0;

  items.push({
    id: "property-film",
    type: "video",
    src: heroContent.videoSrc,
    alt: "The Grandview property film",
    poster: heroContent.backgroundImage,
    sortOrder: order++,
    published: true,
  });

  for (const room of rooms) {
    items.push({
      id: `room-${room.slug}`,
      type: "image",
      src: room.image,
      alt: room.name,
      sortOrder: order++,
      published: true,
    });
    if (room.video) {
      items.push({
        id: `room-video-${room.slug}`,
        type: "video",
        src: room.video.src,
        alt: room.video.alt ?? `${room.name} tour`,
        poster: room.video.poster,
        sortOrder: order++,
        published: true,
      });
    }
  }

  for (const offer of offers) {
    items.push({
      id: `offer-${offer.slug}`,
      type: "image",
      src: offer.image,
      alt: offer.name,
      sortOrder: order++,
      published: true,
    });
  }

  for (const experience of experiences) {
    items.push({
      id: `experience-${experience.id}`,
      type: "image",
      src: experience.image,
      alt: experience.title,
      sortOrder: order++,
      published: true,
    });
  }

  return items;
})();
