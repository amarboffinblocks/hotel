import type { Room } from "@/data/rooms";

type RoomIncludedSectionProps = {
  room: Room;
};

export function RoomIncludedSection({ room }: RoomIncludedSectionProps) {
  return (
    <section className="border-t border-[#E8DCCB]/80 pt-8">
      <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
        All stays include
      </h3>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {room.included.map((item, index) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm text-muted-foreground"
          >
            <span className="mt-0.5 font-sans text-xs font-bold tracking-wider text-primary tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
