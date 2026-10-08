"use client";

import { ResourceManager } from "@/features/admin/components/resource-manager";
import { offersResource } from "@/features/admin/resources/offers";

export function OffersAdminPage() {
  return <ResourceManager resource={offersResource} />;
}
