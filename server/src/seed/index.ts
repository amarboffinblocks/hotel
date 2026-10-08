import { seedCli } from "./run.js";

seedCli().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
