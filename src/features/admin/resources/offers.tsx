import { Thumbnail } from "@/features/admin/components/thumbnail";
import { slugify } from "@/features/admin/lib/slugify";
import type { FormValues, ResourceDefinition } from "@/features/admin/lib/types";
import { offers, type Offer } from "@/data/offers";

function emptyOfferValues(): FormValues {
  return {
    name: "",
    slug: "",
    description: "",
    priceLabel: "",
    priceNote: "",
    image: "",
  };
}

export const offersResource: ResourceDefinition<Offer> = {
  key: "offers",
  storageKey: "grandview.admin.offers",
  labels: { singular: "Offer", plural: "Offers" },
  seed: () => structuredClone(offers),
  getItemTitle: (item) => item.name,
  emptyValues: emptyOfferValues,
  toFormValues: (item) => ({
    name: item.name,
    slug: item.slug,
    description: item.description,
    priceLabel: item.priceLabel,
    priceNote: item.priceNote,
    image: item.image,
  }),
  fromFormValues: (values, existing) => {
    const name = String(values.name).trim();
    return {
      id: existing?.id,
      name,
      slug: String(values.slug).trim() || slugify(name),
      description: String(values.description).trim(),
      priceLabel: String(values.priceLabel).trim(),
      priceNote: String(values.priceNote).trim(),
      image: String(values.image).trim(),
    };
  },
  columns: [
    {
      id: "offer",
      header: "Offer",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Thumbnail src={row.image} alt={row.name} />
          <div className="min-w-0">
            <p className="truncate font-medium">{row.name}</p>
            <p className="truncate text-xs text-muted-foreground">{row.slug}</p>
          </div>
        </div>
      ),
    },
    {
      id: "price",
      header: "Price",
      cell: (row) => (
        <span>
          {row.priceLabel}{" "}
          <span className="text-muted-foreground">{row.priceNote}</span>
        </span>
      ),
    },
    {
      id: "description",
      header: "Description",
      cell: (row) => (
        <span className="line-clamp-2 max-w-md text-muted-foreground">
          {row.description}
        </span>
      ),
      className: "hidden md:table-cell",
    },
  ],
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      section: "Basics",
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      placeholder: "auto from name if empty",
      section: "Basics",
    },
    {
      name: "priceLabel",
      label: "Price label",
      type: "text",
      required: true,
      placeholder: "₹9,999",
      section: "Pricing",
    },
    {
      name: "priceNote",
      label: "Price note",
      type: "text",
      required: true,
      placeholder: "/ night",
      section: "Pricing",
    },
    {
      name: "image",
      label: "Image",
      type: "image",
      required: true,
      span: 2,
      section: "Media",
      folder: "grandview/offers",
      hint: "Upload offer image · JPG/PNG/WebP · max 8MB",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
      rows: 3,
      section: "Copy",
    },
  ],
};
