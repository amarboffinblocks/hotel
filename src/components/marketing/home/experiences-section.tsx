import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Heart,
  UtensilsCrossed,
} from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { experiences } from "@/data/content";

const icons = [UtensilsCrossed, CalendarDays, Heart, Briefcase];

export function ExperiencesSection() {
  return (
    <SectionWrapper id="experiences" spacing="tight">
      <Container className="px-0 sm:px-6 lg:px-8">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-5 [&::-webkit-scrollbar]:hidden">
          {experiences.map((item, index) => {
            const Icon = icons[index] ?? UtensilsCrossed;
            return (
              <Link
                key={item.id}
                href="/contact"
                className="group relative block aspect-[4/5] w-[78vw] max-w-[300px] shrink-0 snap-center overflow-hidden rounded-sm sm:aspect-[3/4] sm:w-auto sm:max-w-none sm:shrink"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 639px) 78vw, (max-width: 1023px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition duration-500 group-hover:from-black/95" />

                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 lg:p-6">
                  <div className="mb-2.5 flex size-9 items-center justify-center rounded-sm border border-primary/45 bg-black/30 text-primary backdrop-blur-sm sm:mb-3 sm:size-10">
                    <Icon
                      className="size-4 stroke-[1.5] sm:size-5"
                      aria-hidden
                    />
                  </div>
                  <h3 className="font-heading mb-1 text-lg leading-tight font-medium text-white sm:mb-1.5 sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-white/75 sm:mb-4">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                    Explore
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
