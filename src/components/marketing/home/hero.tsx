import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { BookingBar } from "@/components/marketing/home/booking-bar";
import { HeroVideoBackground } from "@/components/marketing/home/hero-video-background";
import { Button } from "@/components/ui/button";
import { heroContent } from "@/data/content";

export function Hero() {
  return (
    <SectionWrapper
      spacing="none"
      className="relative z-20 flex min-h-[85svh] flex-col overflow-visible bg-stone-900 text-white sm:min-h-[90svh] lg:min-h-[88svh]"
    >
      <HeroVideoBackground
        poster={heroContent.backgroundImage}
        src={heroContent.videoSrc}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <Container className="flex flex-1 flex-col items-center justify-center pt-20 pb-8 text-center sm:px-8 sm:pt-28 sm:pb-10 lg:px-16 lg:pt-32 lg:pb-14">
          <h1 className="font-heading mx-auto mb-3 max-w-2xl text-[2rem] leading-[1.1] tracking-[-0.02em] text-white drop-shadow-sm sm:mb-5 sm:text-5xl md:text-6xl lg:text-7xl">
            Stay Somewhere
            <br />
            Worth Remembering
          </h1>
          <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed font-light text-white/90 sm:mb-9 sm:text-base">
            {heroContent.subheadline}
          </p>
          <div className="mx-auto flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button asChild size="lg" className="w-full gap-2 sm:w-auto">
              <Link href="/rooms">
                Explore Rooms
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full gap-2 border-white/70 bg-black/30 text-white backdrop-blur-sm hover:border-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              <Link href="/rooms">
                Book Your Stay
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Container>

        {/* Mobile/tablet: no overlap. Desktop: half-overlap onto trust strip. */}
        <Container className="relative z-40 px-3 pb-5 sm:px-6 lg:translate-y-1/2 lg:px-8 lg:pb-0">
          <BookingBar />
        </Container>
      </div>
    </SectionWrapper>
  );
}
