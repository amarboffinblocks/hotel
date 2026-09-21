import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { CtaBanner } from "@/components/marketing/home/cta-banner";
import { RelatedRoomsSection } from "@/components/marketing/rooms/related-rooms-section";
import { RoomAmenitiesSection } from "@/components/marketing/rooms/room-amenities-section";
import { RoomBookingCard } from "@/components/marketing/rooms/room-booking-card";
import { RoomGallery } from "@/components/marketing/rooms/room-gallery";
import { RoomIncludedSection } from "@/components/marketing/rooms/room-included-section";
import { RoomOverview } from "@/components/marketing/rooms/room-overview";
import { RoomPoliciesSection } from "@/components/marketing/rooms/room-policies-section";
import { RoomsFaqSection } from "@/components/marketing/rooms/rooms-faq-section";
import {
  formatInr,
  getRelatedRooms,
  getRoomBySlug,
  rooms,
} from "@/data/rooms";

type RoomPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return { title: "Room" };
  return {
    title: room.name,
    description: room.description,
  };
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  const relatedRooms = getRelatedRooms(room.slug);

  return (
    <>
      <PageHero
        eyebrow={room.view}
        title={room.name}
        description={`${formatInr(room.pricePerNight)} / night · ${room.guests} guests · ${room.sizeSqFt} sq ft · ${room.bedType}`}
        image={room.image}
        align="center"
      />

      <div className="relative z-10 bg-background pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
        <Container>
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground lg:mb-10">
            <Link href="/rooms" className="hover:text-primary">
              Rooms & Suites
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground">{room.name}</span>
          </div>

          <RoomGallery room={room} />

          <div className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14">
            <div className="min-w-0 space-y-8 lg:space-y-10">
              <RoomOverview room={room} />
              <RoomAmenitiesSection room={room} />
              <RoomIncludedSection room={room} />
              <RoomPoliciesSection />
            </div>

            <div className="lg:sticky lg:top-8 lg:self-start">
              <RoomBookingCard room={room} />
            </div>
          </div>
        </Container>
      </div>

      <RelatedRoomsSection rooms={relatedRooms} />
      <RoomsFaqSection />
      <CtaBanner />
    </>
  );
}
