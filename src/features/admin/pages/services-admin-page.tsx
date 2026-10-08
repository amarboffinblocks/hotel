"use client";

import { ResourceManager } from "@/features/admin/components/resource-manager";
import { servicesResource } from "@/features/admin/resources/services";

export function ServicesAdminPage() {
  return (
    <ResourceManager
      resource={servicesResource}
      description="Hotel services shown on the homepage and other marketing pages. Local draft until Phase 3."
    />
  );
}
