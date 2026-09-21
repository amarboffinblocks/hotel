import { Check } from "lucide-react";

import type { Room } from "@/data/rooms";

type RoomOverviewProps = {
  room: Room;
};

export function RoomOverview({ room }: RoomOverviewProps) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
          Overview
        </p>
        <h2 className="font-heading mt-2 text-3xl tracking-[-0.02em] text-foreground sm:text-4xl">
          {room.name}
        </h2>
        <p className="mt-1 text-xs tracking-wider text-muted-foreground uppercase">
          {room.view}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          {room.longDescription}
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
          Room highlights
        </h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {room.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm text-muted-foreground"
            >
              <Check
                className="mt-0.5 size-4 shrink-0 text-primary"
                strokeWidth={2}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
