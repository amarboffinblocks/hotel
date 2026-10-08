"use client";

import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { faqs as seedFaqs, type Faq } from "@/data/faqs";
import { api } from "@/features/admin/api/client";
import { resourceQueryKey } from "@/features/admin/hooks/use-resource-api";

export function RoomsFaqSection() {
  const { data } = useQuery({
    queryKey: resourceQueryKey("faqs"),
    queryFn: () => api.list<Faq>("faqs"),
    placeholderData: seedFaqs,
  });

  const list = (data ?? seedFaqs)
    .filter((faq) => faq.published !== false)
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (list.length === 0) return null;

  return (
    <SectionWrapper spacing="default">
      <Container className="max-w-3xl">
        <SectionHeader
          align="center"
          title="Questions before you book"
          description="Clear answers on timing, room requests, and stay policies — so you can choose with confidence."
        />

        <div className="divide-y divide-[#E8DCCB]/80 border-y border-[#E8DCCB]/80">
          {list.map((faq, index) => (
            <details key={faq.id} className="group" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-start gap-4 py-5 marker:content-none transition-colors hover:text-primary sm:py-6 [&::-webkit-details-marker]:hidden">
                <span className="mt-0.5 font-sans text-xs font-bold tracking-wider text-primary tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex min-w-0 flex-1 items-start justify-between gap-4 text-left">
                  <span className="text-sm font-semibold leading-snug text-foreground sm:text-[15px]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className="mt-0.5 size-4 shrink-0 text-primary transition duration-300 group-open:rotate-180"
                    aria-hidden
                  />
                </span>
              </summary>
              <div className="pb-5 pl-9 text-left sm:pb-6 sm:pl-10">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
