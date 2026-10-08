"use client";

import { useId, useMemo } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ImageGalleryUploadField,
  ImageUploadField,
  VideoUploadField,
} from "@/features/admin/components/image-upload-field";
import type { FormField, FormValues } from "@/features/admin/lib/types";
import { cn } from "@/lib/utils";

type ResourceFormProps = {
  fields: FormField[];
  values: FormValues;
  onChange: (name: string, value: string | number | boolean) => void;
  id?: string;
  onSubmit?: (event: React.FormEvent) => void;
};

function isFieldVisible(field: FormField, values: FormValues) {
  if (!field.visibleWhen) return true;
  return values[field.visibleWhen.field] === field.visibleWhen.equals;
}

function groupFields(fields: FormField[]) {
  const sections: { title: string | null; fields: FormField[] }[] = [];

  for (const field of fields) {
    const title = field.section ?? null;
    const last = sections[sections.length - 1];
    if (last && last.title === title) {
      last.fields.push(field);
    } else {
      sections.push({ title, fields: [field] });
    }
  }

  return sections;
}

function FieldControl({
  field,
  fieldId,
  value,
  onChange,
}: {
  field: FormField;
  fieldId: string;
  value: string | number | boolean | undefined;
  onChange: (name: string, value: string | number | boolean) => void;
}) {
  if (field.type === "checkbox") {
    return (
      <label
        htmlFor={fieldId}
        className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-muted/30 px-4 py-3.5 transition-colors hover:bg-muted/50"
      >
        <input
          id={fieldId}
          type="checkbox"
          className="mt-0.5 size-4 accent-primary"
          checked={Boolean(value)}
          onChange={(event) => onChange(field.name, event.target.checked)}
        />
        <span>
          <span className="block text-sm font-medium text-foreground">
            {field.label}
          </span>
          {field.hint ? (
            <span className="mt-1 block text-sm text-muted-foreground">
              {field.hint}
            </span>
          ) : null}
        </span>
      </label>
    );
  }

  if (field.type === "image") {
    return (
      <ImageUploadField
        id={fieldId}
        label={field.label}
        value={String(value ?? "")}
        required={field.required}
        hint={field.hint}
        folder={field.folder}
        onChange={(url) => onChange(field.name, url)}
      />
    );
  }

  if (field.type === "video") {
    return (
      <VideoUploadField
        id={fieldId}
        label={field.label}
        value={String(value ?? "")}
        required={field.required}
        hint={field.hint}
        folder={field.folder}
        onChange={(url) => onChange(field.name, url)}
      />
    );
  }

  if (field.type === "image-gallery") {
    return (
      <ImageGalleryUploadField
        id={fieldId}
        label={field.label}
        value={String(value ?? "")}
        required={field.required}
        hint={field.hint}
        folder={field.folder}
        onChange={(next) => onChange(field.name, next)}
      />
    );
  }

  if (field.type === "select") {
    return (
      <>
        <Label
          htmlFor={fieldId}
          className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase"
        >
          {field.label}
          {field.required ? (
            <span className="ml-0.5 text-destructive" aria-hidden>
              *
            </span>
          ) : null}
        </Label>
        <select
          id={fieldId}
          name={field.name}
          required={field.required}
          value={String(value ?? "")}
          onChange={(event) => onChange(field.name, event.target.value)}
          className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {(field.options ?? []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {field.hint ? (
          <p className="text-xs text-muted-foreground">{field.hint}</p>
        ) : null}
      </>
    );
  }

  return (
    <>
      <Label
        htmlFor={fieldId}
        className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase"
      >
        {field.label}
        {field.required ? (
          <span className="ml-0.5 text-destructive" aria-hidden>
            *
          </span>
        ) : null}
      </Label>
      {field.type === "textarea" || field.type === "lines" ? (
        <Textarea
          id={fieldId}
          name={field.name}
          required={field.required}
          placeholder={field.placeholder}
          rows={field.rows ?? (field.type === "lines" ? 3 : 3)}
          value={String(value ?? "")}
          onChange={(event) => onChange(field.name, event.target.value)}
          className="min-h-20 rounded-md border border-border bg-background px-3 py-2.5 text-sm"
        />
      ) : (
        <Input
          id={fieldId}
          name={field.name}
          type={
            field.type === "number"
              ? "number"
              : field.type === "url"
                ? "url"
                : "text"
          }
          required={field.required}
          placeholder={field.placeholder}
          value={value === undefined || value === null ? "" : String(value)}
          onChange={(event) =>
            onChange(
              field.name,
              field.type === "number"
                ? Number(event.target.value || 0)
                : event.target.value
            )
          }
          className="h-10 rounded-md border border-border bg-background px-3 text-sm"
        />
      )}
      {field.hint ? (
        <p className="text-xs text-muted-foreground">{field.hint}</p>
      ) : null}
    </>
  );
}

export function ResourceForm({
  fields,
  values,
  onChange,
  id,
  onSubmit,
}: ResourceFormProps) {
  const reactId = useId();
  const formId = id ?? reactId;
  const visibleFields = useMemo(
    () => fields.filter((field) => isFieldVisible(field, values)),
    [fields, values]
  );
  const sections = useMemo(() => groupFields(visibleFields), [visibleFields]);

  return (
    <form id={formId} className="space-y-7" onSubmit={onSubmit}>
      {sections.map((section, index) => (
        <section key={section.title ?? `section-${index}`} className="space-y-4">
          {section.title ? (
            <div className="flex items-center gap-3">
              <h3 className="shrink-0 text-[10px] font-semibold tracking-[0.2em] text-[oklch(0.22_0.03_155)] uppercase">
                {section.title}
              </h3>
              <span className="h-px flex-1 bg-border" aria-hidden />
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {section.fields.map((field) => {
              const fieldId = `${formId}-${field.name}`;
              const span =
                field.span ??
                (field.type === "textarea" ||
                field.type === "lines" ||
                field.type === "checkbox" ||
                field.type === "image" ||
                field.type === "image-gallery" ||
                field.type === "video"
                  ? 2
                  : 1);

              return (
                <div
                  key={`${field.name}-${field.type}-${String(field.visibleWhen?.equals ?? "all")}`}
                  className={cn(
                    "flex flex-col gap-1.5",
                    span === 2 && "sm:col-span-2"
                  )}
                >
                  <FieldControl
                    field={field}
                    fieldId={fieldId}
                    value={values[field.name]}
                    onChange={onChange}
                  />
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </form>
  );
}
