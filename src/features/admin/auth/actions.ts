"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { adminConfig } from "@/config/admin";

export async function establishAdminSession() {
  const jar = await cookies();
  jar.set(adminConfig.cookieName, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(adminConfig.cookieName);
  redirect("/admin/login");
}
