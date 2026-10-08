"use client";

import {
  BedDouble,
  CircleHelp,
  ConciergeBell,
  Images,
  Star,
  Tag,
} from "lucide-react";

import { StatsCard } from "@/features/admin/components/stats-card";
import { useResourceList } from "@/features/admin/hooks/use-resource-api";
import type { Service } from "@/data/content";
import type { Faq } from "@/data/faqs";
import type { GalleryItem } from "@/data/gallery";
import type { Offer } from "@/data/offers";
import type { Review } from "@/data/reviews";
import type { Room } from "@/data/rooms";

export function AdminOverview() {
  const rooms = useResourceList<Room>("rooms");
  const offers = useResourceList<Offer>("offers");
  const services = useResourceList<Service>("services");
  const gallery = useResourceList<GalleryItem>("gallery");
  const faqs = useResourceList<Faq>("faqs");
  const reviews = useResourceList<Review>("reviews");

  const roomCount = rooms.data?.length ?? "—";
  const offerCount = offers.data?.length ?? "—";
  const serviceCount = services.data?.length ?? "—";
  const galleryCount = gallery.data?.length ?? "—";
  const faqCount = faqs.data?.length ?? "—";
  const reviewCount = reviews.data?.length ?? "—";

  const total =
    (rooms.data?.length ?? 0) +
    (offers.data?.length ?? 0) +
    (services.data?.length ?? 0) +
    (gallery.data?.length ?? 0) +
    (faqs.data?.length ?? 0) +
    (reviews.data?.length ?? 0);

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Content powered by MongoDB ·{" "}
        <span className="text-foreground/80">{total} records</span>
        <span className="mx-2 text-border">|</span>
        <span>Phase 3 · Express API</span>
      </p>

      <section>
        <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-border pb-3">
          <h2 className="font-heading text-xl font-medium tracking-tight text-foreground">
            Inventory
          </h2>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Select a module
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatsCard
            title="Rooms"
            value={roomCount}
            description="Types, pricing, amenities, and galleries"
            href="/admin/rooms"
            icon={BedDouble}
          />
          <StatsCard
            title="Offers"
            value={offerCount}
            description="Packages featured across the marketing site"
            href="/admin/offers"
            icon={Tag}
          />
          <StatsCard
            title="Services"
            value={serviceCount}
            description="Hotel services on marketing pages"
            href="/admin/services"
            icon={ConciergeBell}
          />
          <StatsCard
            title="Gallery"
            value={galleryCount}
            description="Images and videos on the Gallery page"
            href="/admin/gallery"
            icon={Images}
          />
          <StatsCard
            title="FAQs"
            value={faqCount}
            description="Questions shown across marketing pages"
            href="/admin/faqs"
            icon={CircleHelp}
          />
          <StatsCard
            title="Reviews"
            value={reviewCount}
            description="Guest testimonials shown on the homepage"
            href="/admin/reviews"
            icon={Star}
          />
        </div>
      </section>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Start the API with <code className="text-foreground">npm run dev:api</code>,
        seed with <code className="text-foreground">npm run seed</code>, then manage
        content here. Images upload via Cloudinary when credentials are set.
      </p>
    </div>
  );
}
