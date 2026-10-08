import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type StatsCardProps = {
  title: string;
  value: string | number;
  description?: string;
  href?: string;
  icon?: LucideIcon;
  className?: string;
};

export function StatsCard({
  title,
  value,
  description,
  href,
  icon: Icon,
  className,
}: StatsCardProps) {
  const inner = (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-md border border-border bg-card transition-colors",
        href &&
          "hover:border-[oklch(0.22_0.03_155)]/25 hover:bg-[oklch(0.985_0.005_95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      {/* Classic gold rule */}
      <span
        className="absolute inset-x-0 top-0 h-0.5 bg-primary/80 transition-opacity group-hover:bg-primary"
        aria-hidden
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            {title}
          </p>
          {Icon ? (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-[oklch(0.22_0.03_155)] text-primary">
              <Icon className="size-3.5" strokeWidth={1.75} aria-hidden />
            </span>
          ) : null}
        </div>

        <p className="mt-5 font-heading text-[2.75rem] leading-none font-medium tracking-tight text-foreground tabular-nums">
          {value}
        </p>

        {description ? (
          <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}

        {href ? (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[10px] font-semibold tracking-[0.2em] text-[oklch(0.22_0.03_155)] uppercase transition-colors group-hover:text-foreground">
            Manage
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        ) : null}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full min-h-[11.5rem]">
        {inner}
      </Link>
    );
  }

  return inner;
}
