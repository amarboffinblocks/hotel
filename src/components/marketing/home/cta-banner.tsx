import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ctaBackdropImage } from "@/data/content";

export function CtaBanner() {
  return (
    <SectionWrapper
      spacing="none"
      className="relative isolate overflow-hidden bg-[#0e1c17]"
    >
      <Image
        src={ctaBackdropImage}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority={false}
      />

      <div className="absolute inset-0 bg-[#0e1c17]/55" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0e1c17] via-[#0e1c17]/50 to-[#0e1c17]/35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      />

      <Container className="relative flex min-h-[26rem] flex-col items-center justify-center py-20 text-center sm:min-h-[28rem] sm:py-24 lg:min-h-[32rem] lg:py-28">
        <p
          className="mb-5 text-[11px] font-semibold tracking-[0.28em] text-primary uppercase sm:mb-6"
          style={{ animation: "cta-fade-up 0.7s ease both" }}
        >
          Direct Booking Privileges
        </p>

        <h2
          className="font-heading mb-4 text-[2.35rem] leading-[1.05] tracking-[-0.03em] text-white sm:mb-5 sm:text-5xl lg:text-6xl"
          style={{ animation: "cta-fade-up 0.7s ease 0.08s both" }}
        >
          {siteConfig.name}
        </h2>

        <p
          className="mx-auto mb-9 max-w-md text-sm leading-relaxed font-light text-white/80 sm:mb-10 sm:max-w-lg sm:text-base"
          style={{ animation: "cta-fade-up 0.7s ease 0.16s both" }}
        >
          Reserve your stay with us and enjoy best-available rates, welcome
          amenities, and attentive concierge care.
        </p>

        <div
          className="flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:gap-4"
          style={{ animation: "cta-fade-up 0.7s ease 0.24s both" }}
        >
          <Button asChild size="lg" className="w-full gap-2 sm:w-auto">
            <Link href="/rooms">
              Reserve Your Stay
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full gap-2 border-white/55 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white sm:w-auto"
          >
            <Link href="/contact">Speak with Concierge</Link>
          </Button>
        </div>
      </Container>
    </SectionWrapper>
  );
}
