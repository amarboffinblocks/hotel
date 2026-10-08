import type { FormValues, ResourceDefinition } from "@/features/admin/lib/types";
import { faqs, type Faq } from "@/data/faqs";

function emptyFaqValues(): FormValues {
  return {
    question: "",
    answer: "",
    sortOrder: 0,
    published: true,
  };
}

export const faqsResource: ResourceDefinition<Faq> = {
  key: "faqs",
  storageKey: "grandview.admin.faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  seed: () => structuredClone(faqs),
  getItemTitle: (item) => item.question,
  emptyValues: emptyFaqValues,
  toFormValues: (item) => ({
    question: item.question,
    answer: item.answer,
    sortOrder: item.sortOrder,
    published: item.published,
  }),
  fromFormValues: (values, existing) => ({
    id: existing?.id,
    question: String(values.question).trim(),
    answer: String(values.answer).trim(),
    sortOrder: Number(values.sortOrder ?? 0),
    published: Boolean(values.published),
  }),
  columns: [
    {
      id: "order",
      header: "No.",
      cell: (row) => (
        <span className="font-heading text-lg font-medium text-primary tabular-nums">
          {String(row.sortOrder + 1).padStart(2, "0")}
        </span>
      ),
      className: "w-[4.5rem]",
    },
    {
      id: "faq",
      header: "Question",
      cell: (row) => (
        <div className="min-w-0">
          <p className="truncate font-medium">{row.question}</p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
            {row.answer}
            {!row.published ? (
              <span className="text-destructive"> · Hidden</span>
            ) : null}
          </p>
        </div>
      ),
    },
  ],
  fields: [
    {
      name: "question",
      label: "Question",
      type: "text",
      required: true,
      span: 2,
      section: "Content",
    },
    {
      name: "answer",
      label: "Answer",
      type: "textarea",
      required: true,
      rows: 4,
      span: 2,
      section: "Content",
    },
    {
      name: "sortOrder",
      label: "Sort order",
      type: "number",
      required: true,
      section: "Settings",
      hint: "Lower numbers appear first.",
    },
    {
      name: "published",
      label: "Published on website",
      type: "checkbox",
      span: 2,
      section: "Settings",
      hint: "Uncheck to hide this FAQ from the site.",
    },
  ],
};
