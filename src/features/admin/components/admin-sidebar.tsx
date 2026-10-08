"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BedDouble,
  CircleHelp,
  ConciergeBell,
  ExternalLink,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  Star,
  Tag,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { adminNav } from "@/config/admin";
import { siteConfig } from "@/config/site";
import { setAdminToken } from "@/features/admin/api/client";
import { logoutAction } from "@/features/admin/auth/session-logout";
import { cn } from "@/lib/utils";

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  "bed-double": BedDouble,
  tag: Tag,
  "concierge-bell": ConciergeBell,
  images: Images,
  "circle-help": CircleHelp,
  star: Star,
} as const;

function NavLinks({
  onNavigate,
  dense = false,
}: {
  onNavigate?: () => void;
  dense?: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5" aria-label="Admin">
      <p
        className={cn(
          "mb-2 px-3 text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase",
          dense && "px-2.5"
        )}
      >
        Manage
      </p>
      {adminNav.map((item) => {
        const Icon = iconMap[item.icon];
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium tracking-wide transition-colors",
              dense && "px-2.5",
              active
                ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                : "text-white/55 hover:bg-white/[0.06] hover:text-white/90"
            )}
          >
            {active ? (
              <span
                className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-primary"
                aria-hidden
              />
            ) : null}
            <Icon
              className={cn(
                "size-[17px] shrink-0 transition-colors",
                active ? "text-primary" : "text-white/40 group-hover:text-white/70"
              )}
              aria-hidden
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBrand() {
  return (
    <Link
      href="/admin"
      className="group flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      aria-label={`${siteConfig.name} Admin`}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/25 transition-colors group-hover:bg-primary/20">
        <svg
          className="size-4 stroke-[1.5]"
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
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[11px] font-semibold tracking-[0.22em] text-white uppercase">
          {siteConfig.name}
        </span>
        <span className="mt-0.5 block text-[11px] tracking-wide text-white/45">
          Operations console
        </span>
      </span>
    </Link>
  );
}

function SidebarFooter({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="space-y-3 border-t border-white/10 px-3 py-4">
      <div className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-3 py-2.5 ring-1 ring-white/5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[11px] font-semibold tracking-wide text-primary">
          AD
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-white">
            Administrator
          </span>
          <span className="block truncate text-[11px] text-white/40">
            Full access
          </span>
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white/90"
        >
          <ExternalLink className="size-3.5 shrink-0" aria-hidden />
          View website
        </Link>
        <form
          action={async () => {
            setAdminToken(null);
            await logoutAction();
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white/90"
          >
            <LogOut className="size-3.5 shrink-0" aria-hidden />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}

function SidebarChrome({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex h-14 items-center px-5">
        <SidebarBrand />
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <NavLinks onNavigate={onNavigate} />
      </div>
      <SidebarFooter onNavigate={onNavigate} />
    </div>
  );
}

export function AdminSidebar() {
  return (
    <aside
      className="hidden w-[16.5rem] shrink-0 flex-col text-white lg:flex"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.22 0.03 155) 0%, oklch(0.16 0.025 155) 100%)",
      }}
    >
      <SidebarChrome />
    </aside>
  );
}

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="border-border/80 bg-background"
      >
        {open ? <X /> : <Menu />}
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute inset-y-0 left-0 flex w-[min(100%,18rem)] flex-col text-white shadow-2xl"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.22 0.03 155) 0%, oklch(0.16 0.025 155) 100%)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigation"
          >
            <div className="absolute top-3.5 right-3 z-10">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X />
              </Button>
            </div>
            <SidebarChrome onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
