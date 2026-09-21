import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/common/container";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  image?: string;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
};

export function PageHero({
  title,
  description,
  eyebrow,
  image,
  align = "center",
  children,
  className,
}: PageHeroProps) {
  const centered = align === "center";

  return (
    <SectionWrapper
      spacing="none"
      className={cn(
        "relative z-20 isolate overflow-visible bg-[#0e1c17]",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : null}
        <div
          className={cn(
            "absolute inset-0",
            image ? "bg-[#0e1c17]/55" : "bg-[#0e1c17]"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1c17] via-[#0e1c17]/45 to-[#0e1c17]/25" />
      </div>

      <div className="relative z-10 flex flex-col">
        <Container
          className={cn(
            "flex min-h-[38vh] flex-col justify-center pt-28 pb-10 sm:min-h-[42vh] sm:pt-32 sm:pb-12 lg:min-h-[44vh] lg:pt-36 lg:pb-14",
            centered ? "items-center text-center" : "justify-end"
          )}
        >
          <div className={cn("max-w-2xl", centered && "mx-auto")}>
            {eyebrow ? (
              <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="font-heading text-4xl leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description ? (
              <p
                className={cn(
                  "mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base",
                  centered && "mx-auto"
                )}
              >
                {description}
              </p>
            ) : null}
          </div>
        </Container>

        {children ? (
          <Container className="relative z-40 px-3 pb-5 sm:px-6 lg:translate-y-1/2 lg:px-8 lg:pb-0">
            {children}
          </Container>
        ) : null}
      </div>
    </SectionWrapper>
  );
}
