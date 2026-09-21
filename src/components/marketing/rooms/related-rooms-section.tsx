import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { RoomCard } from "@/components/marketing/rooms/room-card";
import type { Room } from "@/data/rooms";

type RelatedRoomsSectionProps = {
  rooms: Room[];
};

export function RelatedRoomsSection({ rooms }: RelatedRoomsSectionProps) {
  if (rooms.length === 0) return null;

  return (
    <SectionWrapper className="bg-muted/35" spacing="default">
      <Container>
        <SectionHeader
          title="You may also like"
          description="Other rooms and suites guests often consider with this stay."
          href="/rooms"
          linkLabel="View All Rooms"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
