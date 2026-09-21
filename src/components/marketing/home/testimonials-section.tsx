import { Container } from "@/components/common/container";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { TestimonialsCarousel } from "@/components/marketing/testimonials/testimonials-carousel";
import { reviews } from "@/data/reviews";

export function TestimonialsSection() {
  return (
    <SectionWrapper spacing="loose">
      <Container>
        <TestimonialsCarousel reviews={reviews} />
      </Container>
    </SectionWrapper>
  );
}
