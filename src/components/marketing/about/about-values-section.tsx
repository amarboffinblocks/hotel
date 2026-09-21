import {
  ConciergeBell,
  LayoutTemplate,
  ShieldCheck,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { aboutValues } from "@/data/content";

const valueIcons: LucideIcon[] = [
  ConciergeBell,
  LayoutTemplate,
  ShieldCheck,
  UtensilsCrossed,
];

export function AboutValuesSection() {
  return (
    <SectionWrapper spacing="loose" className="bg-background">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#9a7a3a] uppercase">
            What We Stand For
          </p>
          <h2 className="font-heading mt-4 text-3xl leading-[1.15] font-semibold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem]">
            Hospitality with intention
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            Four principles that guide how we design rooms, welcome guests, and
            run every stay.
          </p>
        </div>

        <ul className="mx-auto mt-12 max-w-5xl divide-y divide-[#E8DCCB]/80 border-y border-[#E8DCCB]/80 sm:mt-14 lg:mt-16">
          {aboutValues.map((value, index) => {
            const Icon = valueIcons[index] ?? ConciergeBell;

            return (
              <li
                key={value.title}
                className="group grid grid-cols-1 gap-4 py-7 transition-colors duration-300 sm:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1.35fr)] sm:items-start sm:gap-8 sm:py-8 lg:gap-12 lg:py-9"
              >
                <div className="flex items-center gap-3 sm:block">
                  <span className="font-heading text-2xl font-semibold tracking-tight text-primary tabular-nums transition duration-300 group-hover:text-[#9a7a3a] sm:text-3xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex size-9 items-center justify-center border border-primary/45 text-primary transition duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-[#0e1c17] sm:mt-4 sm:size-10">
                    <Icon
                      className="size-4 stroke-[1.5] sm:size-[1.15rem]"
                      aria-hidden
                    />
                  </span>
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-foreground transition duration-300 group-hover:text-[#9a7a3a] sm:pt-1 sm:text-xl">
                  {value.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground sm:pt-1.5 sm:text-[15px] sm:leading-[1.7]">
                  {value.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </SectionWrapper>
  );
}
