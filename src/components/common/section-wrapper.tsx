import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const spacingMap = {
  none: "",
  tight: "py-10 sm:py-14 lg:py-16",
  default: "py-12 sm:py-16 lg:py-20",
  loose: "py-14 sm:py-16 lg:py-24",
} as const;

type SectionWrapperProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  spacing?: keyof typeof spacingMap;
};

export function SectionWrapper({
  children,
  id,
  className,
  spacing = "default",
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn(spacingMap[spacing], className)}>
      {children}
    </section>
  );
}
