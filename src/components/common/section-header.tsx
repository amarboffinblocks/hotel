import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  eyebrow?: string;
  align?: "start" | "center";
  className?: string;
  actions?: ReactNode;
};

export function SectionHeader({
  title,
  description,
  href,
  linkLabel,
  eyebrow,
  align = "start",
  className,
  actions,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-8 sm:mb-10",
        centered
          ? "text-center"
          : "flex flex-col justify-between gap-3 pb-2 sm:flex-row sm:items-end",
        className
      )}
    >
      <div className={cn("space-y-2", centered && "mx-auto max-w-xl")}>
        {eyebrow ? (
          <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-heading text-2xl font-semibold tracking-[-0.025em] text-foreground sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "text-xs leading-relaxed text-muted-foreground sm:text-sm",
              !centered && "max-w-xl"
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {actions
        ? actions
        : href && linkLabel
          ? (
              <Link
                href={href}
                className="group inline-flex shrink-0 items-center gap-2 self-start text-xs font-semibold tracking-wider text-foreground uppercase transition-colors duration-200 hover:text-primary sm:self-auto"
              >
                {linkLabel}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            )
          : null}
    </div>
  );
}
