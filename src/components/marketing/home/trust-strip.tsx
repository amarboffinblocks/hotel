import Image from "next/image";
import {
  Bell,
  CalendarDays,
  Lock,
  ShieldCheck,
  Wifi,
} from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { trustItems } from "@/data/content";
import { cn } from "@/lib/utils";

const icons = [ShieldCheck, CalendarDays, Wifi, Bell, Lock];

export function TrustStrip() {
  return (
    <SectionWrapper
      id="booking"
      spacing="none"
      className="relative z-10  pt-10 pb-10 sm:pt-12 sm:pb-12 lg:pt-28 lg:pb-14"
    >
      <Container>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5 lg:gap-4">
          {trustItems.map((item, index) => {
            const Icon = icons[index] ?? ShieldCheck;
            const isLast = index === trustItems.length - 1;

            return (
              <article
                key={item.title}
                className={cn(
                  "group relative aspect-square min-w-0 overflow-hidden rounded-sm",
                  // 5 cards on 2-col: last row alone → span full width
                  isLast && "max-lg:col-span-2 max-lg:aspect-[2/1] sm:max-lg:aspect-[2.2/1]"
                )}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 1023px) 50vw, 20vw"
                />

                <div
                  className="absolute inset-0 bg-[#0e1c17]/45 transition duration-500 group-hover:bg-[#0e1c17]/30"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0e1c17] via-[#0e1c17]/55 to-transparent"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120% 80% at 50% 100%, rgba(197,160,89,0.35) 0%, transparent 55%)",
                  }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition duration-500 group-hover:ring-primary/40"
                  aria-hidden
                />

                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5">
                  <div className="mb-2 flex size-8 items-center justify-center rounded-sm border border-primary/50 bg-black/35 text-primary backdrop-blur-sm transition duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-[#0e1c17] sm:mb-3 sm:size-10">
                    <Icon
                      className="size-3.5 stroke-[1.6] sm:size-5"
                      aria-hidden
                    />
                  </div>
                  <h4 className="text-xs font-semibold tracking-tight text-white sm:text-[15px]">
                    {item.title}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-white/75 sm:text-xs">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
