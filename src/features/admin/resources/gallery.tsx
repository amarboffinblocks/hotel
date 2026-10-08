import { Film, ImageIcon } from "lucide-react";

import { Thumbnail } from "@/features/admin/components/thumbnail";
import type { FormValues, ResourceDefinition } from "@/features/admin/lib/types";
import { galleryItems, type GalleryItem } from "@/data/gallery";

function emptyGalleryValues(): FormValues {
  return {
    type: "image",
    src: "",
    alt: "",
    poster: "",
    sortOrder: 0,
    published: true,
  };
}

export const galleryResource: ResourceDefinition<GalleryItem> = {
  key: "gallery",
  storageKey: "grandview.admin.gallery",
  labels: { singular: "Gallery item", plural: "Gallery" },
  seed: () => structuredClone(galleryItems),
  getItemTitle: (item) => item.alt,
  emptyValues: emptyGalleryValues,
  toFormValues: (item) => ({
    type: item.type,
    src: item.src,
    alt: item.alt,
    poster: item.poster ?? "",
    sortOrder: item.sortOrder,
    published: item.published,
  }),
  fromFormValues: (values, existing) => {
    const type = values.type === "video" ? "video" : "image";
    const poster = String(values.poster ?? "").trim();

    return {
      id: existing?.id,
      type,
      src: String(values.src).trim(),
      alt: String(values.alt).trim(),
      ...(type === "video" && poster ? { poster } : {}),
      sortOrder: Number(values.sortOrder ?? 0),
      published: Boolean(values.published),
    };
  },
  columns: [
    {
      id: "media",
      header: "Media",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Thumbnail
            src={row.type === "video" ? row.poster || row.src : row.src}
            alt={row.alt}
          />
          <div className="min-w-0">
            <p className="truncate font-medium">{row.alt}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground capitalize">
              {row.type === "video" ? (
                <Film className="size-3" />
              ) : (
                <ImageIcon className="size-3" />
              )}
              {row.type}
              {!row.published ? (
                <span className="text-destructive">· Hidden</span>
              ) : null}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "order",
      header: "Order",
      cell: (row) => (
        <span className="tabular-nums text-muted-foreground">{row.sortOrder}</span>
      ),
      className: "w-20",
    },
  ],
  fields: [
    {
      name: "type",
      label: "Media type",
      type: "select",
      required: true,
      section: "Basics",
      options: [
        { label: "Image", value: "image" },
        { label: "Video", value: "video" },
      ],
    },
    {
      name: "alt",
      label: "Caption / alt text",
      type: "text",
      required: true,
      section: "Basics",
      hint: "Shown on the gallery tile and used for accessibility.",
    },
    {
      name: "sortOrder",
      label: "Sort order",
      type: "number",
      required: true,
      section: "Basics",
      hint: "Lower numbers appear first.",
    },
    {
      name: "published",
      label: "Published on website",
      type: "checkbox",
      span: 2,
      section: "Basics",
      hint: "Uncheck to hide this item from the public gallery.",
    },
    {
      name: "src",
      label: "Image",
      type: "image",
      required: true,
      span: 2,
      section: "Media",
      folder: "grandview/gallery",
      visibleWhen: { field: "type", equals: "image" },
      hint: "JPG, PNG, or WebP · max 8MB",
    },
    {
      name: "src",
      label: "Video",
      type: "video",
      required: true,
      span: 2,
      section: "Media",
      folder: "grandview/gallery/videos",
      visibleWhen: { field: "type", equals: "video" },
      hint: "MP4 or WebM · max 80MB",
    },
    {
      name: "poster",
      label: "Poster image",
      type: "image",
      required: true,
      span: 2,
      section: "Media",
      folder: "grandview/gallery/posters",
      visibleWhen: { field: "type", equals: "video" },
      hint: "Thumbnail shown before the video plays",
    },
  ],
};
