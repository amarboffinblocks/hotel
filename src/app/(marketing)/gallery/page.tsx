import type { Metadata } from "next";

import { Container } from "@/components/common/container";
import { MediaGalleryGrid } from "@/components/common/media-gallery-grid";
import { PageHero } from "@/components/common/page-hero";
import { CtaBanner } from "@/components/marketing/home/cta-banner";
import { ServicesSection } from "@/components/marketing/home/services-section";
import { RoomsFaqSection } from "@/components/marketing/rooms/rooms-faq-section";
import { experiences, heroContent, pageHeroImages } from "@/data/content";
import { offers } from "@/data/offers";
import { rooms } from "@/data/rooms";
import {
  createImageMedia,
  createVideoMedia,
  type GalleryMedia,
} from "@/types/gallery-media";

export const metadata: Metadata = { title: "Gallery" };

function getGalleryItems(): GalleryMedia[] {
  const roomImages = rooms.flatMap((room) => [
    createImageMedia(room.image, room.name, `room-${room.slug}`),
    ...(room.video
      ? [
          createVideoMedia({
            id: `room-video-${room.slug}`,
            src: room.video.src,
            poster: room.video.poster,
            alt: room.video.alt ?? `${room.name} tour`,
          }),
        ]
      : []),
  ]);

  const offerImages = offers.map((offer) =>
    createImageMedia(offer.image, offer.name, `offer-${offer.slug}`)
  );

  const experienceImages = experiences.map((experience) =>
    createImageMedia(
      experience.image,
      experience.title,
      `experience-${experience.id}`
    )
  );

  const propertyFilm = createVideoMedia({
    id: "property-film",
    src: heroContent.videoSrc,
    poster: heroContent.backgroundImage,
    alt: "The Grandview property film",
  });

  return [propertyFilm, ...roomImages, ...offerImages, ...experienceImages];
}

export default function GalleryPage() {
  const items = getGalleryItems();

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
          <MediaGalleryGrid items={items} />
        </Container>
      </div>

      <ServicesSection />
      <RoomsFaqSection />
      <CtaBanner />
    </>
  );
}
