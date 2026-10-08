"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, RotateCcw, Search, Trash2, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/features/admin/api/client";
import { ConfirmDeleteDialog } from "@/features/admin/components/confirm-delete-dialog";
import { DataTable } from "@/features/admin/components/data-table";
import { PageHeader } from "@/features/admin/components/page-header";
import { ResourceForm } from "@/features/admin/components/resource-form";
import {
  useResourceList,
  useResourceMutations,
} from "@/features/admin/hooks/use-resource-api";
import type {
  FormValues,
  Identifiable,
  ResourceDefinition,
} from "@/features/admin/lib/types";

type ResourceManagerProps<T extends Identifiable> = {
  resource: ResourceDefinition<T>;
  description?: string;
};

type EditorState<T extends Identifiable> =
  | { mode: "closed" }
  | { mode: "create"; values: FormValues }
  | { mode: "edit"; item: T; values: FormValues };

export function ResourceManager<T extends Identifiable>({
  resource,
  description,
}: ResourceManagerProps<T>) {
  const listQuery = useResourceList<T>(resource.key);
  const { create, update, remove } = useResourceMutations<T>(resource.key);
  const resetSeed = useMutation({
    mutationFn: () => api.resetSeed(),
    onSuccess: () => listQuery.refetch(),
  });

  const items = listQuery.data ?? [];
  const ready = listQuery.isSuccess;
  const saving =
    create.isPending || update.isPending || remove.isPending || resetSeed.isPending;

  const [editor, setEditor] = useState<EditorState<T>>({ mode: "closed" });
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);
  const [query, setQuery] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      resource.getItemTitle(item).toLowerCase().includes(q)
    );
  }, [items, query, resource]);

  const formId = "resource-editor-form";
  const countLabel = ready
    ? `${filtered.length}${query ? ` of ${items.length}` : ""} ${
        items.length === 1
          ? resource.labels.singular.toLowerCase()
          : resource.labels.plural.toLowerCase()
      }`
    : listQuery.isLoading
      ? "Loading…"
      : "Unavailable";

  function openCreate() {
    setFormError(null);
    setEditor({ mode: "create", values: resource.emptyValues() });
  }

  function openEdit(item: T) {
    setFormError(null);
    setEditor({
      mode: "edit",
      item,
      values: resource.toFormValues(item),
    });
  }

  function setField(name: string, value: string | number | boolean) {
    setEditor((prev) => {
      if (prev.mode === "closed") return prev;
      return { ...prev, values: { ...prev.values, [name]: value } };
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (editor.mode === "closed") return;
    setFormError(null);

    try {
      if (editor.mode === "create") {
        const payload = resource.fromFormValues(editor.values);
        const { id: _omit, ...body } = payload;
        await create.mutateAsync(body as Omit<T, "id"> & { id?: string });
      } else {
        const payload = resource.fromFormValues(editor.values, editor.item);
        await update.mutateAsync({
          ...payload,
          id: editor.item.id,
        } as Partial<T> & { id: string });
      }
      setEditor({ mode: "closed" });
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Could not save changes."
      );
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={resource.labels.plural}
        description={
          description ??
          `Edit ${resource.labels.plural.toLowerCase()} stored in MongoDB via the API.`
        }
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={saving}
              onClick={() => resetSeed.mutate()}
            >
              <RotateCcw data-icon="inline-start" />
              Reset seed
            </Button>
            <Button type="button" size="sm" onClick={openCreate} disabled={saving}>
              <Plus data-icon="inline-start" />
              Add {resource.labels.singular}
            </Button>
          </>
        }
      />

      {listQuery.isError ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {(listQuery.error as Error).message}. Is the API running on{" "}
          <code className="text-xs">NEXT_PUBLIC_API_URL</code>?
        </p>
      ) : null}

      <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground tabular-nums">{countLabel}</p>
        <label className="relative block w-full sm:max-w-xs">
          <span className="sr-only">
            Search {resource.labels.plural.toLowerCase()}
          </span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${resource.labels.plural.toLowerCase()}…`}
            className="h-10 w-full rounded-md border border-border bg-background pr-3 pl-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
          />
        </label>
      </div>

      <DataTable
        columns={resource.columns}
        data={filtered}
        emptyMessage={
          ready
            ? query
              ? "No matches for your search."
              : `No ${resource.labels.plural.toLowerCase()} yet. Add one to get started.`
            : listQuery.isLoading
              ? "Loading…"
              : "Could not load data."
        }
        rowActions={(row) => (
          <div className="inline-flex items-center gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Edit ${resource.getItemTitle(row)}`}
              onClick={() => openEdit(row)}
            >
              <Pencil />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Delete ${resource.getItemTitle(row)}`}
              onClick={() => setDeleteTarget(row)}
            >
              <Trash2 className="text-destructive" />
            </Button>
          </div>
        )}
      />

      <Dialog
        open={editor.mode !== "closed"}
        onOpenChange={(open) => {
          if (!open) setEditor({ mode: "closed" });
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="flex max-h-[min(92vh,880px)] w-full max-w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden rounded-lg p-0 shadow-none ring-1 ring-border sm:max-w-3xl"
        >
          <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
            <DialogHeader className="gap-1.5 space-y-0">
              <DialogTitle className="font-heading text-xl font-medium tracking-tight normal-case">
                {editor.mode === "edit"
                  ? `Edit ${resource.labels.singular}`
                  : `Add ${resource.labels.singular}`}
              </DialogTitle>
              <DialogDescription className="text-sm">
                {editor.mode === "edit"
                  ? `Update details for ${resource.getItemTitle(editor.item)}.`
                  : `Create a new ${resource.labels.singular.toLowerCase()} for the marketing site.`}
              </DialogDescription>
            </DialogHeader>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Close"
              className="shrink-0"
              onClick={() => setEditor({ mode: "closed" })}
            >
              <X />
            </Button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
            {editor.mode !== "closed" ? (
              <ResourceForm
                id={formId}
                fields={resource.fields}
                values={editor.values}
                onChange={setField}
                onSubmit={handleSubmit}
              />
            ) : null}
            {formError ? (
              <p className="mt-4 text-sm text-destructive" role="alert">
                {formError}
              </p>
            ) : null}
          </div>

          <DialogFooter className="gap-2 border-t border-border bg-muted/20 px-6 py-4 sm:justify-between">
            <p className="hidden text-xs text-muted-foreground sm:block">
              Required fields marked with *
            </p>
            <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditor({ mode: "closed" })}
              >
                Cancel
              </Button>
              <Button type="submit" form={formId} disabled={saving}>
                {saving
                  ? "Saving…"
                  : editor.mode === "edit"
                    ? "Save changes"
                    : `Create ${resource.labels.singular.toLowerCase()}`}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title={`Delete ${deleteTarget ? resource.getItemTitle(deleteTarget) : resource.labels.singular}?`}
        onConfirm={() => {
          if (deleteTarget) remove.mutate(deleteTarget.id);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
