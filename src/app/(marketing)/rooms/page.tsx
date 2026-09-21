import type { Metadata } from "next";

import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { BookingBar } from "@/components/marketing/home/booking-bar";
import { CtaBanner } from "@/components/marketing/home/cta-banner";
import { ServicesSection } from "@/components/marketing/home/services-section";
import { RoomCard } from "@/components/marketing/rooms/room-card";
import { RoomsFaqSection } from "@/components/marketing/rooms/rooms-faq-section";
import { Card, CardContent } from "@/components/ui/card";
import { pageHeroImages } from "@/data/content";
import { offers } from "@/data/offers";
import { getRoomBySlug, rooms } from "@/data/rooms";
import {
  formatDisplayDate,
  nightsBetween,
} from "@/features/booking/utils";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description: "Explore our thoughtfully designed rooms and suites.",
};

type RoomsPageProps = {
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    rooms?: string;
    room?: string;
    offer?: string;
  }>;
};

export default async function RoomsPage({ searchParams }: RoomsPageProps) {
  const params = await searchParams;
  const selectedOffer = params.offer
    ? offers.find((offer) => offer.slug === params.offer)
    : undefined;
  const selectedRoom = params.room ? getRoomBySlug(params.room) : undefined;
  const listedRooms = selectedRoom
    ? [selectedRoom, ...rooms.filter((room) => room.id !== selectedRoom.id)]
    : rooms;

  const hasStayQuery = Boolean(params.checkIn && params.checkOut);
  const nights = hasStayQuery
    ? nightsBetween(params.checkIn as string, params.checkOut as string)
    : 0;
  const adults = Number(params.adults ?? 2);
  const roomCount = Number(params.rooms ?? 1);

  return (
    <>
      <PageHero
        eyebrow="Stay"
        title="Rooms & Suites"
        description="Choose a sanctuary that matches your stay — from city-view deluxe rooms to panoramic presidential suites."
        image={pageHeroImages.rooms}
        align="center"
      >
        <BookingBar compact />
      </PageHero>

      <div className="relative z-10 bg-background pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-24 lg:pb-16">
        <Container>
          {hasStayQuery || selectedOffer ? (
            <Card className="mb-6 rounded-sm border-[#E8DCCB] bg-white py-0">
              <CardContent className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                {hasStayQuery ? (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {formatDisplayDate(params.checkIn as string)}
                    </span>
                    {" → "}
                    <span className="font-semibold text-foreground">
                      {formatDisplayDate(params.checkOut as string)}
                    </span>
                    <span className="mx-2 text-border">|</span>
                    {nights} night{nights > 1 ? "s" : ""}
                    <span className="mx-2 text-border">|</span>
                    {adults} adult{adults > 1 ? "s" : ""}, {roomCount} room
                    {roomCount > 1 ? "s" : ""}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Choose a room to continue your booking.
                  </p>
                )}
                {selectedOffer ? (
                  <p className="text-sm font-medium text-primary">
                    Offer: {selectedOffer.name}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ) : null}

          <div className="space-y-6">
            {listedRooms.map((room) => (
              <RoomCard key={room.id} room={room} variant="horizontal" />
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
