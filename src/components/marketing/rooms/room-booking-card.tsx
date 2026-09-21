import Link from "next/link";
import { BedDouble, Eye, Maximize2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatInr, type Room } from "@/data/rooms";
import { siteConfig } from "@/config/site";

type RoomBookingCardProps = {
  room: Room;
};

export function RoomBookingCard({ room }: RoomBookingCardProps) {
  return (
    <aside className="rounded-sm border border-[#E8DCCB] bg-white p-5 shadow-[0_12px_40px_rgba(14,28,23,0.08)] sm:p-6">
      {room.popular ? (
        <p className="mb-3 text-[10px] font-bold tracking-[0.16em] text-primary uppercase">
          Popular choice
        </p>
      ) : null}

      <p className="text-xs tracking-wider text-muted-foreground uppercase">
        From
      </p>
      <p className="mt-1 font-heading text-3xl text-foreground">
        {formatInr(room.pricePerNight)}
        <span className="ml-2 text-sm font-normal tracking-normal text-muted-foreground">
          / night
        </span>
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Taxes & fees calculated at booking. Best available rates when you book
        direct.
      </p>

      <ul className="mt-5 space-y-3 border-y border-[#E8DCCB]/80 py-5 text-sm text-muted-foreground">
        <li className="flex items-center gap-2.5">
          <Users className="size-4 shrink-0 text-primary" strokeWidth={1.6} />
          Up to {room.guests} guests
        </li>
        <li className="flex items-center gap-2.5">
          <Maximize2 className="size-4 shrink-0 text-primary" strokeWidth={1.6} />
          {room.sizeSqFt} sq ft
        </li>
        <li className="flex items-center gap-2.5">
          <BedDouble className="size-4 shrink-0 text-primary" strokeWidth={1.6} />
          {room.bedType}
        </li>
        <li className="flex items-center gap-2.5">
          <Eye className="size-4 shrink-0 text-primary" strokeWidth={1.6} />
          {room.view}
        </li>
      </ul>

      <div className="mt-5 flex flex-col gap-3">
        <Button asChild size="lg" className="w-full">
          <Link href={`/rooms?room=${room.slug}`}>Book This Room</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full">
          <Link href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
            Call Concierge
          </Link>
        </Button>
      </div>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
        Or email{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="underline underline-offset-2 hover:text-foreground"
        >
          {siteConfig.email}
        </a>
      </p>
    </aside>
  );
}
