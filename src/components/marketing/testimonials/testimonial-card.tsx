import { Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Review } from "@/data/reviews";
import { cn } from "@/lib/utils";

type TestimonialCardProps = {
  review: Review;
};

export function TestimonialCard({ review }: TestimonialCardProps) {
  return (
    <article className="group flex h-full min-h-[270px] flex-col rounded-sm border border-[#EDE6DC] bg-white p-6 transition duration-300 hover:border-primary/40 hover:shadow-[0_16px_40px_rgba(14,28,23,0.08)] sm:min-h-[290px] sm:p-7">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div
          className="flex items-center gap-0.5"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3.5",
                i < review.rating
                  ? "fill-primary text-primary"
                  : "fill-transparent text-[#D4CBBE]"
              )}
              aria-hidden
            />
          ))}
        </div>
        <span
          className="font-heading text-4xl leading-none text-primary/25 select-none"
          aria-hidden
        >
          ”
        </span>
      </div>

      <p className="mb-7 flex-1 text-[15px] leading-[1.7] text-foreground/85 sm:text-base">
        {review.quote}
      </p>

      <div className="flex items-center gap-3 border-t border-[#EDE6DC] pt-5">
        <Avatar className="size-11">
          <AvatarImage src={review.avatar} alt={review.name} />
          <AvatarFallback className="bg-secondary text-sm font-semibold text-foreground">
            {review.name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold tracking-tight text-foreground">
            {review.name}
          </h4>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{review.city}</p>
        </div>
      </div>
    </article>
  );
}
