"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { Container } from "@/components/common/container";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { services as seedServices, servicesBackdropImage, type Service } from "@/data/content";
import { api } from "@/features/admin/api/client";
import { resourceQueryKey } from "@/features/admin/hooks/use-resource-api";

function ServicesGrid({ list }: { list: Service[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {list.map((service) => (
        <div
          key={service.id}
          className="group flex h-full flex-col rounded-sm bg-primary/10 p-5 transition duration-300 hover:-translate-y-0.5 hover:bg-primary/15 sm:p-6"
        >
          <div className="mb-4 font-sans text-3xl font-bold tracking-tight text-primary select-none sm:mb-5 sm:text-4xl">
            {service.number}
          </div>
          <h3 className="mb-2 text-base font-bold tracking-tight text-foreground sm:text-lg">
            {service.title}
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ServicesSection() {
  const { data } = useQuery({
    queryKey: resourceQueryKey("services"),
    queryFn: () => api.list<Service>("services"),
    placeholderData: seedServices,
  });

  const list = data ?? seedServices;

  return (
    <SectionWrapper spacing="none" className="relative bg-white">
      <div className="sticky top-0 h-[70svh] w-full overflow-hidden bg-secondary sm:h-[78svh] lg:h-[90svh]">
        <Image
          src={servicesBackdropImage}
          alt="Luxury hotel suite with warm ambient lighting"
          fill
          className="object-cover object-center brightness-[0.85]"
          sizes="100vw"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="relative z-20 -mt-28 pb-14 sm:-mt-40 sm:pb-16 md:-mt-48 lg:-mt-56 lg:pb-20">
        <Container className="overflow-hidden rounded-sm border border-[#E8DCCB]/80 bg-white p-6 shadow-[0_20px_60px_rgba(14,28,23,0.16)] sm:p-8 md:p-10 lg:p-14">
          <p className="mb-2 text-[11px] font-semibold tracking-[0.22em] text-primary uppercase md:text-xs">
            Hotel Services
          </p>
          <h2 className="font-heading mb-8 max-w-xl text-3xl tracking-tight text-foreground sm:text-4xl lg:mb-10 lg:text-5xl">
            Everything you need.
          </h2>
          <ServicesGrid list={list} />
        </Container>
      </div>
    </SectionWrapper>
  );
}
