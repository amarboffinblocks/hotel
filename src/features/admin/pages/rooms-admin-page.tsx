"use client";

import { ResourceManager } from "@/features/admin/components/resource-manager";
import { roomsResource } from "@/features/admin/resources/rooms";

export function RoomsAdminPage() {
  return <ResourceManager resource={roomsResource} />;
}
