import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { AboutStorySection } from "@/components/marketing/about/about-story-section";
import { AboutValuesSection } from "@/components/marketing/about/about-values-section";
import { CtaBanner } from "@/components/marketing/home/cta-banner";
import { pageHeroImages } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn the story behind The Grandview — heritage hospitality, thoughtful design, and stays worth remembering.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About The Grandview"
        description="An iconic sanctuary designed for refined travellers, offering unforgettable stays, award-winning culinary experiences, and world-class celebrations."
        image={pageHeroImages.about}
        align="center"
      />

      <AboutStorySection />
      <AboutValuesSection />
      <CtaBanner />
    </>
  );
}
