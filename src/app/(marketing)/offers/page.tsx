import type { Metadata } from "next";

import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { CtaBanner } from "@/components/marketing/home/cta-banner";
import { ServicesSection } from "@/components/marketing/home/services-section";
import { OfferCard } from "@/components/marketing/offers/offer-card";
import { RoomsFaqSection } from "@/components/marketing/rooms/rooms-faq-section";
import { pageHeroImages } from "@/data/content";
import { offers } from "@/data/offers";

export const metadata: Metadata = {
  title: "Special Offers",
};

export default function OffersPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages"
        title="Special Offers & Packages"
        description="Curated stay experiences with exclusive inclusions and privileges."
        image={pageHeroImages.offers}
      />

      <div className="bg-background py-12 sm:py-14 lg:py-16">
        <Container>
          <div className="space-y-6">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} variant="horizontal" />
            ))}
          </div>
        </Container>
      </div>

      <ServicesSection />
      <RoomsFaqSection />
      <CtaBanner />
    </>
  );
}
