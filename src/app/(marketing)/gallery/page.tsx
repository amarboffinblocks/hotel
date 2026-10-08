import type { Metadata } from "next";

import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { GalleryMediaSection } from "@/components/marketing/gallery/gallery-media-section";
import { CtaBanner } from "@/components/marketing/home/cta-banner";
import { ServicesSection } from "@/components/marketing/home/services-section";
import { RoomsFaqSection } from "@/components/marketing/rooms/rooms-faq-section";
import { pageHeroImages } from "@/data/content";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Visuals"
        title="Gallery"
        description="A visual preview of rooms, offers, and experiences — click any image or film to view fullscreen."
        image={pageHeroImages.gallery}
      />

      <div className="bg-background py-12 sm:py-14 lg:py-16">
        <Container>
          <GalleryMediaSection />
        </Container>
      </div>

      <ServicesSection />
      <RoomsFaqSection />
      <CtaBanner />
    </>
  );
}
