import Image from "next/image";

import { Container } from "@/components/common/container";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { aboutStory } from "@/data/content";

export function AboutStorySection() {
  return (
    <SectionWrapper spacing="loose" className="bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5] lg:min-h-[28rem]">
              <Image
                src={aboutStory.image}
                alt={aboutStory.imageAlt}
                fill
                className="object-cover transition duration-700 ease-out hover:scale-[1.02]"
                sizes="(max-width: 1023px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="relative aspect-[21/9] overflow-hidden sm:aspect-[2.4/1]">
              <Image
                src={aboutStory.secondaryImage}
                alt={aboutStory.secondaryImageAlt}
                fill
                className="object-cover transition duration-700 ease-out hover:scale-[1.02]"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex gap-5 sm:gap-6">
              <div
                className="mt-1 hidden w-px shrink-0 self-stretch bg-gradient-to-b from-primary via-primary/70 to-primary/20 sm:block"
                aria-hidden
              />

              <div className="min-w-0 max-w-xl">
                <p className="text-[11px] font-semibold tracking-[0.22em] text-[#9a7a3a] uppercase">
                  {aboutStory.eyebrow}
                </p>

                <h2 className="font-heading mt-4 text-[2rem] leading-[1.18] font-semibold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.14]">
                  {aboutStory.title}
                </h2>

                <p className="mt-6 text-[15px] leading-relaxed text-foreground sm:mt-7 sm:text-base">
                  {aboutStory.lead}
                </p>

                <div className="mt-6 space-y-4 sm:mt-7">
                  {aboutStory.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-sm leading-[1.75] text-muted-foreground sm:text-[15px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-10 border-t border-[#E8DCCB]/90 pt-5 sm:mt-12">
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-foreground/70 uppercase">
                    {aboutStory.meta}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
