"use client";

import { ResourceManager } from "@/features/admin/components/resource-manager";
import { faqsResource } from "@/features/admin/resources/faqs";

export function FaqsAdminPage() {
  return (
    <ResourceManager
      resource={faqsResource}
      description="Questions and answers shown in the FAQ section across marketing pages."
    />
  );
}
