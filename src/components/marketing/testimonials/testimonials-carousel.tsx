"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { TestimonialCard } from "@/components/marketing/testimonials/testimonial-card";
import { Button } from "@/components/ui/button";
import { type Review } from "@/data/reviews";
import { cn } from "@/lib/utils";

const AUTO_MS = 5000;
/** Must match the flex `gap` used on the track (1.25rem = gap-5). */
const GAP_REM = 1.25;

function useVisibleCount() {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setVisible(3);
      else if (window.matchMedia("(min-width: 768px)").matches) setVisible(2);
      else setVisible(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return visible;
}

type TestimonialsCarouselProps = {
  reviews: Review[];
};

export function TestimonialsCarousel({ reviews }: TestimonialsCarouselProps) {
  const visible = useVisibleCount();
  const maxIndex = Math.max(0, reviews.length - visible);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [progressKey, setProgressKey] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      const clamped = ((next % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1);
      setIndex(clamped);
      setProgressKey((k) => k + 1);
    },
    [maxIndex]
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (paused || maxIndex < 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
      setProgressKey((k) => k + 1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, maxIndex, index]);

  const canNavigate = maxIndex > 0;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="mb-8 max-w-xl space-y-2 sm:mb-10">
        <h2 className="font-heading text-2xl font-semibold tracking-[-0.025em] text-foreground sm:text-3xl lg:text-4xl">
          What Our Guests Say
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Genuine words from travellers who chose The Grandview.
        </p>
      </div>

      <div
        className="relative overflow-hidden"
        onTouchStart={(e) => setTouchStartX(e.changedTouches[0]?.clientX ?? null)}
        onTouchEnd={(e) => {
          if (touchStartX == null) return;
          const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX;
          if (Math.abs(delta) > 48) {
            if (delta > 0) prev();
            else next();
          }
          setTouchStartX(null);
        }}
      >
        <div
          className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
          style={{
            gap: `${GAP_REM}rem`,
            transform: `translate3d(calc(-${index} * (100% + ${GAP_REM}rem) / ${visible}), 0, 0)`,
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="box-border min-w-0 shrink-0 grow-0"
              style={{
                flexBasis: `calc((100% - ${(visible - 1) * GAP_REM}rem) / ${visible})`,
                width: `calc((100% - ${(visible - 1) * GAP_REM}rem) / ${visible})`,
                maxWidth: `calc((100% - ${(visible - 1) * GAP_REM}rem) / ${visible})`,
              }}
            >
              <TestimonialCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {canNavigate ? (
        <div className="mt-8 flex w-full items-center justify-between gap-6 sm:mt-10">
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Testimonials"
          >
            {Array.from({ length: maxIndex + 1 }).map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    "relative h-1.5 overflow-hidden rounded-full transition-all duration-500",
                    active
                      ? "w-10 bg-[#E8DCCB]"
                      : "w-1.5 bg-[#D4CBBE] hover:bg-primary/50"
                  )}
                >
                  {active && !paused ? (
                    <span
                      key={progressKey}
                      className="absolute inset-y-0 left-0 bg-primary"
                      style={{
                        animation: `testimonial-progress ${AUTO_MS}ms linear forwards`,
                      }}
                    />
                  ) : active ? (
                    <span className="absolute inset-0 bg-primary" />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <NavButton onClick={prev} label="Previous testimonials">
              <ChevronLeft className="size-4" />
            </NavButton>
            <NavButton onClick={next} label="Next testimonials">
              <ChevronRight className="size-4" />
            </NavButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function NavButton({
  children,
  onClick,
  label,
  compact,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
  compact?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={cn(
        "rounded-sm border-[#E0D4C4] bg-white text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground",
        compact ? "size-9" : "size-10"
      )}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </Button>
  );
}
