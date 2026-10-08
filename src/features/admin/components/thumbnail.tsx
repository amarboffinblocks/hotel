import { cn } from "@/lib/utils";

type ThumbnailProps = {
  src: string;
  alt: string;
  className?: string;
};

/** Plain img so admin can preview any remote URL without next.config allowlists */
export function Thumbnail({ src, alt, className }: ThumbnailProps) {
  if (!src) {
    return (
      <div className={cn("size-10 shrink-0 rounded-md bg-muted", className)} />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- admin CMS previews arbitrary URLs
    <img
      src={src}
      alt={alt}
      className={cn(
        "size-10 shrink-0 rounded-md object-cover bg-muted",
        className
      )}
    />
  );
}
