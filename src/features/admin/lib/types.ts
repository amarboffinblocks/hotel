import type { ReactNode } from "react";

import type { ApiResourceKey } from "@/features/admin/api/client";

export type Identifiable = { id: string };

export type FormFieldType =
  | "text"
  | "textarea"
  | "number"
  | "url"
  | "checkbox"
  | "lines"
  | "image"
  | "image-gallery"
  | "video"
  | "select";

export type FormFieldOption = {
  label: string;
  value: string;
};

export type FormField = {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  rows?: number;
  options?: FormFieldOption[];
  /** Cloudinary folder for image/video uploads */
  folder?: string;
  /** Show field only when another field matches */
  visibleWhen?: { field: string; equals: string | number | boolean };
  /** Grid span: 1 = half (default for short fields), 2 = full width */
  span?: 1 | 2;
  /** Groups fields under a section heading in the form */
  section?: string;
};

export type ColumnDef<T> = {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
};

export type FormValues = Record<string, string | number | boolean>;

export type ResourceDefinition<T extends Identifiable> = {
  /** API collection key */
  key: ApiResourceKey;
  /** @deprecated Phase 2 localStorage key — kept for migration fallback */
  storageKey: string;
  labels: { singular: string; plural: string };
  seed: () => T[];
  columns: ColumnDef<T>[];
  fields: FormField[];
  getItemTitle: (item: T) => string;
  emptyValues: () => FormValues;
  toFormValues: (item: T) => FormValues;
  fromFormValues: (values: FormValues, existing?: T) => Omit<T, "id"> & { id?: string };
};
