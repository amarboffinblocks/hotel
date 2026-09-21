import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  light?: boolean;
};

export function Logo({ className, light = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label={siteConfig.fullName}
    >
      <div className="flex items-center justify-center text-primary">
        <svg
          className="h-7 w-7 stroke-[1.5]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            "text-[11px] font-medium leading-none tracking-[0.18em] sm:text-[15px] sm:tracking-[0.25em]",
            light ? "text-white" : "text-foreground"
          )}
        >
          THE GRANDVIEW
        </span>
        <span className="mt-1 text-[8px] font-medium tracking-[0.28em] text-primary sm:text-[9px] sm:tracking-[0.35em]">
          HOTEL & RESORT
        </span>
      </div>
    </Link>
  );
}
