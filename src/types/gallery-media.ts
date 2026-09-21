export type GalleryImage = {
  id: string;
  type: "image";
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type GalleryVideo = {
  id: string;
  type: "video";
  src: string;
  alt: string;
  poster?: string;
  width?: number;
  height?: number;
};

export type GalleryMedia = GalleryImage | GalleryVideo;

export function isGalleryVideo(item: GalleryMedia): item is GalleryVideo {
  return item.type === "video";
}

export function createImageMedia(
  src: string,
  alt: string,
  id?: string
): GalleryImage {
  return {
    id: id ?? src,
    type: "image",
    src,
    alt,
    width: 1600,
    height: 1067,
  };
}

export function createVideoMedia(input: {
  id?: string;
  src: string;
  alt: string;
  poster?: string;
}): GalleryVideo {
  return {
    id: input.id ?? input.src,
    type: "video",
    src: input.src,
    alt: input.alt,
    poster: input.poster,
    width: 1280,
    height: 720,
  };
}
