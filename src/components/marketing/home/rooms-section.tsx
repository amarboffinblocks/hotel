import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { RoomCard } from "@/components/marketing/rooms/room-card";
import { rooms } from "@/data/rooms";

export function RoomsSection() {
  return (
    <SectionWrapper id="rooms">
      <Container>
        <SectionHeader
          title="Rooms & Suites"
          description="Thoughtfully designed spaces for your comfort and relaxation."
          href="/rooms"
          linkLabel="View All Rooms"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {rooms.slice(0, 4).map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
