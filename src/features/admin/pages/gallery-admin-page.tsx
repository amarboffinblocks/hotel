"use client";

import { ResourceManager } from "@/features/admin/components/resource-manager";
import { galleryResource } from "@/features/admin/resources/gallery";

export function GalleryAdminPage() {
  return (
    <ResourceManager
      resource={galleryResource}
      description="Images and videos shown on the public Gallery page. Drag-order via sort number."
    />
  );
}
