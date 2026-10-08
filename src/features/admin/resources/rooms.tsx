import { Badge } from "@/components/ui/badge";
import { Thumbnail } from "@/features/admin/components/thumbnail";
import { linesToText, textToLines } from "@/features/admin/lib/lines";
import { slugify } from "@/features/admin/lib/slugify";
import type { FormValues, ResourceDefinition } from "@/features/admin/lib/types";
import { formatInr, rooms, type Room } from "@/data/rooms";

function emptyRoomValues(): FormValues {
  return {
    name: "",
    slug: "",
    view: "",
    guests: 2,
    sizeSqFt: 300,
    bedType: "King bed",
    pricePerNight: 8000,
    image: "",
    description: "",
    longDescription: "",
    highlights: "",
    amenities: "",
    included: "",
    gallery: "",
    popular: false,
  };
}

export const roomsResource: ResourceDefinition<Room> = {
  key: "rooms",
  storageKey: "grandview.admin.rooms",
  labels: { singular: "Room", plural: "Rooms" },
  seed: () => structuredClone(rooms),
  getItemTitle: (item) => item.name,
  emptyValues: emptyRoomValues,
  toFormValues: (item) => ({
    name: item.name,
    slug: item.slug,
    view: item.view,
    guests: item.guests,
    sizeSqFt: item.sizeSqFt,
    bedType: item.bedType,
    pricePerNight: item.pricePerNight,
    image: item.image,
    description: item.description,
    longDescription: item.longDescription,
    highlights: linesToText(item.highlights),
    amenities: linesToText(item.amenities),
    included: linesToText(item.included),
    gallery: linesToText(item.gallery),
    popular: Boolean(item.popular),
  }),
  fromFormValues: (values, existing) => {
    const name = String(values.name).trim();
    const slug = String(values.slug).trim() || slugify(name);
    return {
      id: existing?.id,
      name,
      slug,
      view: String(values.view).trim(),
      guests: Number(values.guests) || 1,
      sizeSqFt: Number(values.sizeSqFt) || 0,
      bedType: String(values.bedType).trim(),
      pricePerNight: Number(values.pricePerNight) || 0,
      image: String(values.image).trim(),
      description: String(values.description).trim(),
      longDescription: String(values.longDescription).trim(),
      highlights: textToLines(values.highlights),
      amenities: textToLines(values.amenities),
      included: textToLines(values.included),
      gallery: textToLines(values.gallery),
      popular: Boolean(values.popular) || undefined,
      video: existing?.video,
    };
  },
  columns: [
    {
      id: "room",
      header: "Room",
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
      id: "view",
      header: "View",
      cell: (row) => row.view,
      className: "hidden md:table-cell",
    },
    {
      id: "guests",
      header: "Guests",
      cell: (row) => row.guests,
      className: "hidden sm:table-cell",
    },
    {
      id: "price",
      header: "Price",
      cell: (row) => formatInr(row.pricePerNight),
    },
    {
      id: "status",
      header: "Flag",
      cell: (row) =>
        row.popular ? <Badge variant="secondary">Popular</Badge> : "—",
      className: "hidden lg:table-cell",
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
      name: "view",
      label: "View",
      type: "text",
      required: true,
      section: "Basics",
    },
    {
      name: "bedType",
      label: "Bed type",
      type: "text",
      required: true,
      section: "Basics",
    },
    {
      name: "guests",
      label: "Guests",
      type: "number",
      required: true,
      section: "Details",
    },
    {
      name: "sizeSqFt",
      label: "Size (sq ft)",
      type: "number",
      required: true,
      section: "Details",
    },
    {
      name: "pricePerNight",
      label: "Price / night (INR)",
      type: "number",
      required: true,
      section: "Details",
    },
    {
      name: "popular",
      label: "Mark as popular",
      type: "checkbox",
      hint: "Show popular badge on the marketing site.",
      span: 2,
      section: "Details",
    },
    {
      name: "image",
      label: "Cover image",
      type: "image",
      required: true,
      span: 2,
      section: "Media",
      folder: "grandview/rooms",
      hint: "JPG, PNG, or WebP · max 8MB",
    },
    {
      name: "gallery",
      label: "Gallery",
      type: "image-gallery",
      span: 2,
      section: "Media",
      folder: "grandview/rooms/gallery",
      hint: "Drop multiple images or click Add · max 8MB each",
    },
    {
      name: "description",
      label: "Short description",
      type: "textarea",
      required: true,
      rows: 2,
      section: "Copy",
    },
    {
      name: "longDescription",
      label: "Long description",
      type: "textarea",
      required: true,
      rows: 3,
      section: "Copy",
    },
    {
      name: "highlights",
      label: "Highlights",
      type: "lines",
      hint: "One highlight per line",
      rows: 3,
      section: "Features",
    },
    {
      name: "amenities",
      label: "Amenities",
      type: "lines",
      hint: "One amenity per line",
      rows: 3,
      section: "Features",
    },
    {
      name: "included",
      label: "Included",
      type: "lines",
      hint: "One item per line",
      rows: 3,
      section: "Features",
    },
  ],
};
