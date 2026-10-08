"use server";

import { clearAdminSession } from "@/features/admin/auth/actions";

export async function logoutAction() {
  await clearAdminSession();
}
