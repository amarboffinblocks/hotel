"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AdminMobileNav } from "@/features/admin/components/admin-sidebar";
import { adminNav } from "@/config/admin";
import { siteConfig } from "@/config/site";

function useAdminBreadcrumb() {
  const pathname = usePathname();
  const current =
    adminNav.find((item) =>
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(item.href)
    ) ?? adminNav[0];

  const isRoot = current.href === "/admin" && pathname === "/admin";

  return { current, isRoot };
}

export function AdminTopbar() {
  const { current, isRoot } = useAdminBreadcrumb();

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <AdminMobileNav />

        <nav
          className="flex min-w-0 flex-1 items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase"
          aria-label="Breadcrumb"
        >
          <Link
            href="/admin"
            className="transition-colors hover:text-foreground"
          >
            Admin
          </Link>
          <ChevronRight className="size-3.5 shrink-0 opacity-40" aria-hidden />
          <span className="truncate text-foreground">
            {isRoot ? "Overview" : current.label}
          </span>
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/" target="_blank" rel="noreferrer">
              <ExternalLink data-icon="inline-start" />
              Website
            </Link>
          </Button>
          <div className="ml-1 hidden items-center gap-2.5 rounded-full border border-border bg-muted/40 py-1 pr-3 pl-1 md:flex">
            <span className="flex size-7 items-center justify-center rounded-full bg-[oklch(0.22_0.03_155)] text-[10px] font-semibold tracking-wide text-primary">
              AD
            </span>
            <span className="text-xs font-medium text-foreground">
              {siteConfig.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
