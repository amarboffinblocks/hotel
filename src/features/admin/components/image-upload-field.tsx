"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";

import { Label } from "@/components/ui/label";
import { api } from "@/features/admin/api/client";
import { linesToText, textToLines } from "@/features/admin/lib/lines";
import { cn } from "@/lib/utils";

const ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

type ImageUploadFieldProps = {
  id: string;
  label: string;
  value: string;
  required?: boolean;
  hint?: string;
  folder?: string;
  onChange: (url: string) => void;
};

export function ImageUploadField({
  id,
  label,
  value,
  required,
  hint,
  folder = "grandview/rooms",
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const result = await api.upload(file, folder);
      onChange(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function onDrop(event: React.DragEvent) {
    event.preventDefault();
    setDragging(false);
    if (uploading) return;
    void handleFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={id}
        className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase"
      >
        {label}
        {required ? (
          <span className="ml-0.5 text-destructive" aria-hidden>
            *
          </span>
        ) : null}
      </Label>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        disabled={uploading}
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      <input
        type="text"
        tabIndex={-1}
        aria-hidden
        required={required}
        value={value}
        onChange={() => undefined}
        className="sr-only"
      />

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (!uploading) inputRef.current?.click();
          }
        }}
        onClick={() => {
          if (!uploading) inputRef.current?.click();
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={onDrop}
        className={cn(
          "group relative flex min-h-[11.5rem] cursor-pointer overflow-hidden rounded-lg border transition-all outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          value
            ? "border-border bg-[oklch(0.22_0.03_155)]"
            : "border-dashed border-border/90 bg-[oklch(0.985_0.005_95)] hover:border-primary/60 hover:bg-primary/[0.04]",
          dragging && "border-primary bg-primary/8 scale-[1.01]",
          uploading && "pointer-events-none"
        )}
      >
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.16_0.025_155)]/80 via-[oklch(0.16_0.025_155)]/20 to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
            <div className="relative z-10 mt-auto flex w-full items-end justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
                  Cover ready
                </p>
                <p className="mt-0.5 truncate text-xs text-white/70">
                  Click to replace · or drop a new file
                </p>
              </div>
              <button
                type="button"
                aria-label="Remove cover image"
                className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-destructive hover:ring-destructive"
                onClick={(event) => {
                  event.stopPropagation();
                  onChange("");
                }}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="relative z-10 flex w-full flex-col items-center justify-center gap-3 px-6 py-8 text-center">
            <span
              className={cn(
                "flex size-12 items-center justify-center rounded-full transition-colors",
                "bg-[oklch(0.22_0.03_155)] text-primary ring-1 ring-primary/30",
                dragging && "bg-primary text-[oklch(0.22_0.03_155)]"
              )}
            >
              {uploading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <ImagePlus className="size-5" />
              )}
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">
                {uploading
                  ? "Uploading cover…"
                  : dragging
                    ? "Drop image to upload"
                    : "Drop cover image here"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                or{" "}
                <span className="font-medium text-[oklch(0.22_0.03_155)] underline decoration-primary/50 underline-offset-2">
                  browse files
                </span>
              </p>
            </div>
          </div>
        )}

        {uploading && value ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[oklch(0.16_0.025_155)]/55 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-2 rounded-md bg-white/95 px-3 py-2 text-xs font-medium text-foreground shadow-sm">
              <Loader2 className="size-3.5 animate-spin text-primary" />
              Uploading…
            </span>
          </div>
        ) : null}
      </div>

      <p className="text-xs text-muted-foreground">
        {hint ?? "JPG, PNG, or WebP · max 8MB"}
      </p>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type ImageGalleryUploadFieldProps = {
  id: string;
  label: string;
  value: string;
  required?: boolean;
  hint?: string;
  folder?: string;
  onChange: (value: string) => void;
};

export function ImageGalleryUploadField({
  id,
  label,
  value,
  required,
  hint,
  folder = "grandview/rooms/gallery",
  onChange,
}: ImageGalleryUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const urls = textToLines(value);

  async function handleFiles(fileList: FileList | null | File[]) {
    const files = fileList
      ? Array.from(fileList).filter((file) => file.type.startsWith("image/"))
      : [];
    if (!files.length) {
      setError("Please choose image files");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of files) {
        const result = await api.upload(file, folder);
        uploaded.push(result.url);
      }
      onChange(linesToText([...urls, ...uploaded]));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeAt(index: number) {
    onChange(linesToText(urls.filter((_, i) => i !== index)));
  }

  function onDrop(event: React.DragEvent) {
    event.preventDefault();
    setDragging(false);
    if (uploading) return;
    void handleFiles(event.dataTransfer.files);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <Label
          htmlFor={id}
          className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase"
        >
          {label}
          {required ? (
            <span className="ml-0.5 text-destructive" aria-hidden>
              *
            </span>
          ) : null}
        </Label>
        {urls.length > 0 ? (
          <span className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase tabular-nums">
            {urls.length} {urls.length === 1 ? "image" : "images"}
          </span>
        ) : null}
      </div>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={ACCEPT}
        multiple
        className="sr-only"
        disabled={uploading}
        onChange={(event) => handleFiles(event.target.files)}
      />

      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {urls.map((url, index) => (
          <li
            key={`${url}-${index}`}
            className="group relative aspect-4/3 overflow-hidden rounded-lg border border-border bg-[oklch(0.22_0.03_155)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="size-full object-cover" />
            <div className="absolute inset-0 bg-[oklch(0.16_0.025_155)]/0 transition-colors group-hover:bg-[oklch(0.16_0.025_155)]/45" />
            <button
              type="button"
              aria-label="Remove image"
              className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-md bg-white/95 text-foreground opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:bg-destructive hover:text-white"
              onClick={() => removeAt(index)}
            >
              <Trash2 className="size-3.5" />
            </button>
            <span className="absolute bottom-2 left-2 rounded bg-black/45 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-white/90 tabular-nums opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              {String(index + 1).padStart(2, "0")}
            </span>
          </li>
        ))}

        <li>
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            onDragEnter={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setDragging(false);
            }}
            onDrop={onDrop}
            className={cn(
              "flex aspect-4/3 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed transition-all",
              "bg-[oklch(0.985_0.005_95)] text-muted-foreground",
              "hover:border-primary/60 hover:bg-primary/[0.04] hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              dragging && "border-primary bg-primary/8 text-foreground",
              uploading && "pointer-events-none opacity-70"
            )}
          >
            {uploading ? (
              <Loader2 className="size-5 animate-spin text-primary" />
            ) : (
              <span className="flex size-9 items-center justify-center rounded-full bg-[oklch(0.22_0.03_155)] text-primary ring-1 ring-primary/25">
                <Upload className="size-4" />
              </span>
            )}
            <span className="text-[10px] font-semibold tracking-[0.16em] uppercase">
              {uploading ? "Uploading…" : dragging ? "Drop here" : "Add images"}
            </span>
          </button>
        </li>
      </ul>

      <p className="text-xs text-muted-foreground">
        {hint ?? "Drop multiple images or click to browse · max 8MB each"}
      </p>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const VIDEO_ACCEPT = "video/mp4,video/webm,video/quicktime";

type VideoUploadFieldProps = {
  id: string;
  label: string;
  value: string;
  required?: boolean;
  hint?: string;
  folder?: string;
  onChange: (url: string) => void;
};

export function VideoUploadField({
  id,
  label,
  value,
  required,
  hint,
  folder = "grandview/gallery/videos",
  onChange,
}: VideoUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setError("Please choose a video file");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const result = await api.upload(file, folder);
      onChange(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function onDrop(event: React.DragEvent) {
    event.preventDefault();
    setDragging(false);
    if (uploading) return;
    void handleFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={id}
        className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase"
      >
        {label}
        {required ? (
          <span className="ml-0.5 text-destructive" aria-hidden>
            *
          </span>
        ) : null}
      </Label>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={VIDEO_ACCEPT}
        className="sr-only"
        disabled={uploading}
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      <input
        type="text"
        tabIndex={-1}
        aria-hidden
        required={required}
        value={value}
        onChange={() => undefined}
        className="sr-only"
      />

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (!uploading) inputRef.current?.click();
          }
        }}
        onClick={() => {
          if (!uploading) inputRef.current?.click();
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={onDrop}
        className={cn(
          "group relative flex min-h-[9.5rem] cursor-pointer overflow-hidden rounded-lg border transition-all outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          value
            ? "border-border bg-[oklch(0.22_0.03_155)]"
            : "border-dashed border-border/90 bg-[oklch(0.985_0.005_95)] hover:border-primary/60 hover:bg-primary/[0.04]",
          dragging && "border-primary bg-primary/8",
          uploading && "pointer-events-none"
        )}
      >
        {value ? (
          <div className="relative z-10 flex w-full flex-col justify-end gap-3 p-4">
            <video
              src={value}
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 size-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.16_0.025_155)]/85 to-transparent" />
            <div className="relative flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
                  Video ready
                </p>
                <p className="mt-0.5 truncate text-xs text-white/70">
                  Click to replace · MP4 / WebM
                </p>
              </div>
              <button
                type="button"
                aria-label="Remove video"
                className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-destructive hover:ring-destructive"
                onClick={(event) => {
                  event.stopPropagation();
                  onChange("");
                }}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex w-full flex-col items-center justify-center gap-3 px-6 py-7 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-[oklch(0.22_0.03_155)] text-primary ring-1 ring-primary/30">
              {uploading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Upload className="size-5" />
              )}
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">
                {uploading
                  ? "Uploading video…"
                  : dragging
                    ? "Drop video to upload"
                    : "Drop video here"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                or{" "}
                <span className="font-medium text-[oklch(0.22_0.03_155)] underline decoration-primary/50 underline-offset-2">
                  browse files
                </span>
              </p>
            </div>
          </div>
        )}

        {uploading && value ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[oklch(0.16_0.025_155)]/55 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-2 rounded-md bg-white/95 px-3 py-2 text-xs font-medium text-foreground shadow-sm">
              <Loader2 className="size-3.5 animate-spin text-primary" />
              Uploading…
            </span>
          </div>
        ) : null}
      </div>

      <p className="text-xs text-muted-foreground">
        {hint ?? "MP4 or WebM · max 80MB · uploaded to Cloudinary"}
      </p>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
