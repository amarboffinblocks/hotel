import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { OfferCard } from "@/components/marketing/offers/offer-card";
import { offers } from "@/data/offers";

export function OffersSection() {
  return (
    <SectionWrapper id="offers">
      <Container>
        <SectionHeader
          title="Special Offers & Packages"
          description="Curated stay experiences with exclusive inclusions and privileges."
          href="/offers"
          linkLabel="View All Offers"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
