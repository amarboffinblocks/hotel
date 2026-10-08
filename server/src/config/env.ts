import path from "node:path";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";
import { z } from "zod";

const serverRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
const projectRoot = path.resolve(serverRoot, "..");

/** Load root env first, then server/.env overrides */
dotenv.config({ path: path.join(projectRoot, ".env.local") });
dotenv.config({ path: path.join(projectRoot, ".env") });
dotenv.config({ path: path.join(serverRoot, ".env") });

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(8),
  JWT_EXPIRES_IN: z.string().default("7d"),
  ADMIN_USERNAME: z.string().min(1),
  ADMIN_PASSWORD: z.string().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  CLOUDINARY_FOLDER: z.string().default("grandview"),
  CLIENT_URL: z.string().default("http://localhost:3000"),
  NEXT_PUBLIC_API_URL: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().optional(),
  /** Comma-separated extra allowed origins */
  CORS_ORIGINS: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid server environment:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

export function getAllowedCorsOrigins() {
  const extras = (env.CORS_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return [
    env.CLIENT_URL,
    env.NEXT_PUBLIC_SITE_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    ...extras,
  ].filter((value): value is string => Boolean(value));
}

export function isCloudinaryConfigured() {
  return Boolean(
    env.CLOUDINARY_CLOUD_NAME &&
      env.CLOUDINARY_CLOUD_NAME !== "your_cloud_name" &&
      env.CLOUDINARY_API_KEY &&
      env.CLOUDINARY_API_KEY !== "your_api_key" &&
      env.CLOUDINARY_API_SECRET &&
      env.CLOUDINARY_API_SECRET !== "your_api_secret"
  );
}
