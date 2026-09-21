import { Check } from "lucide-react";

import type { Room } from "@/data/rooms";

type RoomAmenitiesSectionProps = {
  room: Room;
};

export function RoomAmenitiesSection({ room }: RoomAmenitiesSectionProps) {
  return (
    <section className="border-t border-[#E8DCCB]/80 pt-8">
      <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
        Amenities
      </h3>
      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {room.amenities.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 rounded-sm border border-[#E8DCCB]/70 bg-white px-3.5 py-3 text-sm text-foreground"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
              <Check className="size-3.5" strokeWidth={2.2} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
