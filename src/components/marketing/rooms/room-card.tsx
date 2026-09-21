import Image from "next/image";
import Link from "next/link";
import { Maximize2, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatInr, type Room } from "@/data/rooms";
import { cn } from "@/lib/utils";

type RoomCardVariant = "grid" | "horizontal";

type RoomCardProps = {
  room: Room;
  className?: string;
  variant?: RoomCardVariant;
};

export function RoomCard({
  room,
  className,
  variant = "grid",
}: RoomCardProps) {
  switch (variant) {
    case "horizontal":
      return <HorizontalRoomCard room={room} className={className} />;
    case "grid":
      return <GridRoomCard room={room} className={className} />;
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

function PopularBadge() {
  return (
    <Badge className="absolute top-2.5 left-2.5 z-10 rounded-sm bg-primary px-2 py-0.5 text-[10px] font-bold tracking-wider text-primary-foreground uppercase hover:bg-primary">
      Popular
    </Badge>
  );
}

function RoomMeta({ room }: { room: Room }) {
  return (
    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <Users className="size-3.5 text-primary" strokeWidth={1.6} />
        {room.guests} Guests
      </span>
      <span className="inline-flex items-center gap-1">
        <Maximize2 className="size-3.5 text-primary" strokeWidth={1.6} />
        {room.sizeSqFt} sq ft
      </span>
    </div>
  );
}

function GridRoomCard({ room, className }: Omit<RoomCardProps, "variant">) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-[0_6px_24px_rgba(14,28,23,0.06)] transition duration-300 hover:shadow-[0_12px_32px_rgba(14,28,23,0.1)]",
        className
      )}
    >
      <div className="relative h-44 overflow-hidden bg-muted sm:h-48">
        {room.popular ? <PopularBadge /> : null}
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <span className="absolute right-2.5 bottom-2.5 rounded-sm bg-white/95 px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-foreground uppercase shadow-sm">
          {room.view}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
        <div className="mb-2.5 flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg leading-snug font-medium text-foreground">
            {room.name}
          </h3>
        </div>

        <div className="mb-3">
          <RoomMeta room={room} />
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#E8DCCB]/70 pt-3">
          <p className="text-sm font-semibold text-foreground">
            {formatInr(room.pricePerNight)}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              / night
            </span>
          </p>
          <Button
            asChild
            size="sm"
            className="h-8 rounded-sm bg-secondary px-3 text-[10px] font-semibold tracking-wider text-secondary-foreground uppercase hover:bg-primary hover:text-primary-foreground"
          >
            <Link href={`/rooms/${room.slug}`}>View Room</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

function HorizontalRoomCard({
  room,
  className,
}: Omit<RoomCardProps, "variant">) {
  return (
    <Card
      className={cn(
        "group overflow-hidden rounded-sm border-[#E8DCCB] bg-white py-0",
        className
      )}
    >
      <CardContent className="grid gap-0 p-0 md:grid-cols-[280px_1fr_auto]">
        <div className="relative aspect-16/10 overflow-hidden bg-muted md:aspect-auto md:min-h-full">
          {room.popular ? <PopularBadge /> : null}
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 280px"
          />
        </div>

        <div className="flex flex-col justify-center p-6">
          <h3 className="font-heading text-2xl text-foreground">{room.name}</h3>
          <p className="mt-1 text-xs tracking-wider text-muted-foreground uppercase">
            {room.view}
          </p>
          <div className="mt-3">
            <RoomMeta room={room} />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {room.description}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-[#E8DCCB] p-6 md:border-t-0 md:border-l">
          <div>
            <p className="text-xs text-muted-foreground uppercase">From</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {formatInr(room.pricePerNight)}
            </p>
            <p className="text-xs text-muted-foreground">per night</p>
          </div>
          <Button
            asChild
            className="bg-primary font-semibold tracking-wider hover:bg-primary hover:text-stone-950"
          >
            <Link href={`/rooms/${room.slug}`}>View Room</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
