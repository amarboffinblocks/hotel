import { connectDb } from "../config/db.js";
import { seedAdminUser } from "./run.js";

/** Standalone: create/update only the admin user in MongoDB */
async function main() {
  await connectDb();
  const admin = await seedAdminUser();
  console.log("Admin user ready:", admin);
  process.exit(0);
}

main().catch((error) => {
  console.error("Failed to seed admin:", error);
  process.exit(1);
});
