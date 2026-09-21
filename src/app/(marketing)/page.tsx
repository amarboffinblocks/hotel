import { CtaBanner } from "@/components/marketing/home/cta-banner";
import { ExperiencesSection } from "@/components/marketing/home/experiences-section";
import { Hero } from "@/components/marketing/home/hero";
import { OffersSection } from "@/components/marketing/home/offers-section";
import { RoomsSection } from "@/components/marketing/home/rooms-section";
import { ServicesSection } from "@/components/marketing/home/services-section";
import { TestimonialsSection } from "@/components/marketing/home/testimonials-section";
import { TrustStrip } from "@/components/marketing/home/trust-strip";
import { RoomsFaqSection } from "@/components/marketing/rooms/rooms-faq-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <RoomsSection />
      <ServicesSection />
      <ExperiencesSection />
      <OffersSection />
      <TestimonialsSection />
      <RoomsFaqSection />
      <CtaBanner />
    </>
  );
}
