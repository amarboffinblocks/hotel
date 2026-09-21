import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { pageHeroImages } from "@/data/content";

export const metadata: Metadata = { title: "Contact" };

const phoneHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Concierge"
        title="Contact"
        description="Reach our team for reservations, events, or any assistance during your stay."
        image={pageHeroImages.contact}
      />

      <div className="bg-background py-12 sm:py-14 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="font-heading text-2xl tracking-tight text-foreground sm:text-3xl">
                Send a message
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Form is UI-only for Phase 1 — we will connect it to the backend
                later.
              </p>

              <form className="mt-8 space-y-4" action="#">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full rounded-sm border border-input bg-white px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button type="button" className="w-full sm:w-auto">
                    Send Message
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full gap-2 sm:w-auto"
                  >
                    <a href={phoneHref}>
                      <Phone className="size-4" />
                      Call {siteConfig.phone}
                    </a>
                  </Button>
                </div>
              </form>

              <ul className="mt-10 space-y-4 border-t border-[#E8DCCB]/70 pt-8 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span className="text-muted-foreground">
                    {siteConfig.address}
                    <br />
                    {siteConfig.city}
                  </span>
                </li>
                <li>
                  <a
                    href={phoneHref}
                    className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Phone className="size-4 shrink-0 text-primary" aria-hidden />
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Mail className="size-4 shrink-0 text-primary" aria-hidden />
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative min-h-[320px] overflow-hidden rounded-sm border border-[#E8DCCB] bg-muted sm:min-h-[420px] lg:min-h-full lg:flex-1">
                <iframe
                  title="The Grandview location map"
                  src="https://maps.google.com/maps?q=New%20Delhi%2C%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 h-full w-full border-0 grayscale-[20%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <Button asChild size="lg" className="w-full gap-2 lg:hidden">
                <a href={phoneHref}>
                  <Phone className="size-4" />
                  Direct Call
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
