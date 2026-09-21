import Link from "next/link";

import { Container } from "@/components/common/container";
import { Logo } from "@/components/common/logo";
import {
  footerExploreLinks,
  footerGuestLinks,
  footerLegalLinks,
  siteConfig,
} from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="bg-[#0e1c17] text-white/70" id="contact">
      <Container className="pt-12 pb-7 sm:pt-14 lg:pt-16 lg:pb-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 md:grid-cols-12 md:gap-8 md:pb-12 lg:gap-10">
          <div className="space-y-4 md:col-span-5 lg:col-span-6">
            <Logo light />
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              Refined stays, exceptional dining, and celebrations crafted with
              care.
            </p>
            <div className="flex flex-col gap-1 text-sm text-white/65 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-primary"
              >
                {siteConfig.phone}
              </a>
              <span className="hidden text-white/25 sm:inline" aria-hidden>
                ·
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-primary"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-2 md:gap-6 lg:col-span-6 lg:gap-10">
            <FooterNav title="Explore" links={footerExploreLinks} />
            <FooterNav title="Stay" links={footerGuestLinks.slice(0, 4)} />
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-[11px] tracking-wide text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{siteConfig.copyright}</p>
          <nav
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
            aria-label="Legal"
          >
            {footerLegalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}

function FooterNav({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-3.5 text-[11px] font-semibold tracking-[0.2em] text-white uppercase">
        {title}
      </h4>
      <ul className="space-y-2.5 text-sm text-white/60">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
