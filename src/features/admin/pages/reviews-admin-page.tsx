"use client";

import { ResourceManager } from "@/features/admin/components/resource-manager";
import { reviewsResource } from "@/features/admin/resources/reviews";

export function ReviewsAdminPage() {
  return <ResourceManager resource={reviewsResource} />;
}
