"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";

import { Container } from "@/components/common/container";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { marketingMoreNav, marketingNav } from "@/config/site";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const moreActive = marketingMoreNav.some((item) =>
    isActivePath(pathname, item.href)
  );

  return (
    <header className="absolute inset-x-0 top-0 z-50 w-full bg-gradient-to-b from-black/70 via-black/35 to-transparent">
      <Container className="flex h-16 items-center justify-between sm:h-20 lg:h-24">
        <Logo light />

        <nav className="hidden items-center gap-6 text-[13px] tracking-wide text-white/90 lg:flex xl:gap-7">
          {marketingNav.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  "relative py-1 transition-colors hover:text-primary",
                  active &&
                    "text-white after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-primary"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "relative inline-flex items-center gap-1 py-1 outline-none transition-colors hover:text-primary",
                moreActive &&
                  "text-white after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-primary"
              )}
            >
              More
              <ChevronDown className="size-3.5 opacity-80" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-40 rounded-sm border-[#E8DCCB] bg-white p-1 shadow-lg"
            >
              {marketingMoreNav.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "cursor-pointer rounded-sm px-3 py-2 text-sm",
                      isActivePath(pathname, item.href) &&
                        "bg-muted font-medium text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden lg:inline-flex">
            <Link href="/rooms">BOOK NOW</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-white lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-muted">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <Logo />
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1 px-4">
                {marketingNav.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className="rounded-sm px-2 py-2.5 text-sm font-medium tracking-wide text-foreground hover:bg-white hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <p className="mt-3 px-2 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  More
                </p>
                {marketingMoreNav.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className="rounded-sm px-2 py-2.5 text-sm font-medium tracking-wide text-foreground hover:bg-white hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild>
                  <Link href="/rooms">BOOK NOW</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
