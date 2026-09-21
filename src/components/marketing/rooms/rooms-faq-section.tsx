import { ChevronDown } from "lucide-react";

import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";

const faqs = [
  {
    question: "What is the check-in and check-out time?",
    answer:
      "Check-in begins at 2:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be arranged subject to availability — share your preference when you book.",
  },
  {
    question: "Can I request an extra bed or crib?",
    answer:
      "Yes. Extra beds and baby cribs can be added on request for a fee. Please mention this while booking, or speak with our concierge before arrival.",
  },
  {
    question: "Is breakfast included with the room?",
    answer:
      "Breakfast is available as an add-on or package inclusion. Direct bookings may include seasonal breakfast privileges depending on the rate selected.",
  },
  {
    question: "Do rooms have a city or garden view?",
    answer:
      "Views vary by category. Deluxe and Executive rooms typically face the city or courtyard; Suites and Garden rooms offer greenery or panoramic outlooks. You can note a preference at booking.",
  },
  {
    question: "Is smoking allowed in the rooms?",
    answer:
      "All guestrooms are non-smoking. Designated outdoor smoking areas are available on property. A cleaning fee applies if smoking occurs indoors.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Most standard rates allow free cancellation up to 24 hours before arrival. Special offers and prepaid rates may have different terms, shown clearly at booking.",
  },
] as const;

export function RoomsFaqSection() {
  return (
    <SectionWrapper spacing="default">
      <Container className="max-w-3xl">
        <SectionHeader
          align="center"
          title="Questions before you book"
          description="Clear answers on timing, room requests, and stay policies — so you can choose with confidence."
        />

        <div className="divide-y divide-[#E8DCCB]/80 border-y border-[#E8DCCB]/80">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group" open={index === 0}>
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
