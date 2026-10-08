import type { FormValues, ResourceDefinition } from "@/features/admin/lib/types";
import { services, type Service } from "@/data/content";

function formatServiceNumber(value: string, fallbackIndex: number) {
  const trimmed = value.trim();
  if (trimmed) {
    const digits = trimmed.replace(/\D/g, "");
    if (digits) return digits.padStart(2, "0").slice(-2);
    return trimmed;
  }
  return String(fallbackIndex).padStart(2, "0");
}

function emptyServiceValues(): FormValues {
  return {
    number: "",
    title: "",
    description: "",
  };
}

export const servicesResource: ResourceDefinition<Service> = {
  key: "services",
  storageKey: "grandview.admin.services",
  labels: { singular: "Service", plural: "Services" },
  seed: () => structuredClone(services),
  getItemTitle: (item) => item.title,
  emptyValues: emptyServiceValues,
  toFormValues: (item) => ({
    number: item.number,
    title: item.title,
    description: item.description,
  }),
  fromFormValues: (values, existing) => {
    const title = String(values.title).trim();
    const rawNumber = String(values.number ?? "");
    const fallback = existing
      ? Number.parseInt(existing.number, 10) || 1
      : 1;

    return {
      id: existing?.id,
      number: formatServiceNumber(rawNumber, fallback),
      title,
      description: String(values.description).trim(),
    };
  },
  columns: [
    {
      id: "number",
      header: "No.",
      cell: (row) => (
        <span className="font-heading text-lg font-medium text-primary tabular-nums">
          {row.number}
        </span>
      ),
      className: "w-[4.5rem]",
    },
    {
      id: "service",
      header: "Service",
      cell: (row) => (
        <div className="min-w-0">
          <p className="truncate font-medium">{row.title}</p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
            {row.description}
          </p>
        </div>
      ),
    },
  ],
  fields: [
    {
      name: "number",
      label: "Number",
      type: "text",
      required: true,
      placeholder: "01",
      hint: "Display label shown on the site (e.g. 01, 02).",
      section: "Basics",
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
      section: "Basics",
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
