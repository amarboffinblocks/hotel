import { Thumbnail } from "@/features/admin/components/thumbnail";
import type { FormValues, ResourceDefinition } from "@/features/admin/lib/types";
import { reviews, type Review } from "@/data/reviews";

function emptyReviewValues(): FormValues {
  return {
    name: "",
    city: "",
    quote: "",
    rating: 5,
    avatar: "",
  };
}

export const reviewsResource: ResourceDefinition<Review> = {
  key: "reviews",
  storageKey: "grandview.admin.reviews",
  labels: { singular: "Review", plural: "Reviews" },
  seed: () => structuredClone(reviews),
  getItemTitle: (item) => item.name,
  emptyValues: emptyReviewValues,
  toFormValues: (item) => ({
    name: item.name,
    city: item.city,
    quote: item.quote,
    rating: item.rating,
    avatar: item.avatar,
  }),
  fromFormValues: (values, existing) => ({
    id: existing?.id,
    name: String(values.name).trim(),
    city: String(values.city).trim(),
    quote: String(values.quote).trim(),
    rating: Math.min(5, Math.max(1, Number(values.rating) || 5)),
    avatar: String(values.avatar).trim(),
  }),
  columns: [
    {
      id: "guest",
      header: "Guest",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Thumbnail src={row.avatar} alt={row.name} className="rounded-full" />
          <div className="min-w-0">
            <p className="truncate font-medium">{row.name}</p>
            <p className="truncate text-xs text-muted-foreground">{row.city}</p>
          </div>
        </div>
      ),
    },
    {
      id: "rating",
      header: "Rating",
      cell: (row) => `${row.rating}/5`,
    },
    {
      id: "quote",
      header: "Quote",
      cell: (row) => (
        <span className="line-clamp-2 max-w-lg text-muted-foreground">
          “{row.quote}”
        </span>
      ),
      className: "hidden md:table-cell",
    },
  ],
  fields: [
    {
      name: "name",
      label: "Guest name",
      type: "text",
      required: true,
      section: "Guest",
    },
    {
      name: "city",
      label: "City",
      type: "text",
      required: true,
      section: "Guest",
    },
    {
      name: "rating",
      label: "Rating (1–5)",
      type: "number",
      required: true,
      section: "Guest",
    },
    {
      name: "avatar",
      label: "Avatar",
      type: "image",
      required: true,
      span: 2,
      section: "Guest",
      folder: "grandview/reviews",
      hint: "Upload guest photo · JPG/PNG/WebP · max 8MB",
    },
    {
      name: "quote",
      label: "Quote",
      type: "textarea",
      required: true,
      rows: 4,
      section: "Review",
    },
  ],
};
