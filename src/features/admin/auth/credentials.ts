import { adminConfig } from "@/config/admin";

/** Phase 2 stub credentials — replace with real auth in Phase 3 */
export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "grandview",
    cookieName: adminConfig.cookieName,
  };
}
