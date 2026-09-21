import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type Offer } from "@/data/offers";
import { cn } from "@/lib/utils";

type OfferCardVariant = "grid" | "horizontal";

type OfferCardProps = {
  offer: Offer;
  className?: string;
  variant?: OfferCardVariant;
};

export function OfferCard({
  offer,
  className,
  variant = "grid",
}: OfferCardProps) {
  switch (variant) {
    case "horizontal":
      return <HorizontalOfferCard offer={offer} className={className} />;
    case "grid":
      return <GridOfferCard offer={offer} className={className} />;
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

function GridOfferCard({ offer, className }: Omit<OfferCardProps, "variant">) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-[0_6px_24px_rgba(14,28,23,0.06)] transition duration-300 hover:shadow-[0_12px_32px_rgba(14,28,23,0.1)]",
        className
      )}
    >
      <div className="relative h-40 overflow-hidden bg-muted sm:h-44">
        <Image
          src={offer.image}
          alt={offer.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/25 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
        <h3 className="font-heading text-lg leading-snug font-medium text-foreground">
          {offer.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {offer.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#E8DCCB]/70 pt-3">
          <p className="text-sm font-semibold text-foreground">
            {offer.priceLabel}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              {offer.priceNote}
            </span>
          </p>
          <Button
            asChild
            size="sm"
            className="h-8 rounded-sm bg-secondary px-3 text-[10px] font-semibold tracking-wider text-secondary-foreground uppercase hover:bg-primary hover:text-primary-foreground"
          >
            <Link href={`/rooms?offer=${offer.slug}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

function HorizontalOfferCard({
  offer,
  className,
}: Omit<OfferCardProps, "variant">) {
  return (
    <Card
      className={cn(
        "group overflow-hidden rounded-sm border-[#E8DCCB] bg-white py-0",
        className
      )}
    >
      <CardContent className="grid gap-0 p-0 md:grid-cols-[280px_1fr_auto]">
        <div className="relative aspect-16/10 overflow-hidden bg-muted md:aspect-auto md:min-h-full">
          <Image
            src={offer.image}
            alt={offer.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 280px"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/25 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col justify-center p-6">
          <h3 className="font-heading text-2xl text-foreground">{offer.name}</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            {offer.description}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-[#E8DCCB] p-6 md:border-t-0 md:border-l">
          <div>
            <p className="text-xs text-muted-foreground uppercase">From</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {offer.priceLabel}
            </p>
            <p className="text-xs text-muted-foreground">{offer.priceNote}</p>
          </div>
          <Button
            asChild
            className="bg-primary font-semibold tracking-wider hover:bg-primary hover:text-stone-950"
          >
            <Link href={`/rooms?offer=${offer.slug}`}>Book Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
