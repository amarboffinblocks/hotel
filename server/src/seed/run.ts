import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { Router } from "express";

import { connectDb } from "../config/db.js";
import { env } from "../config/env.js";
import { requireAuth } from "../middleware/auth.js";
import { AdminUserModel, hashPassword } from "../models/admin-user.js";
import { FaqModel } from "../models/faq.js";
import { GalleryItemModel } from "../models/gallery-item.js";
import { OfferModel } from "../models/offer.js";
import { ReviewModel } from "../models/review.js";
import { RoomModel } from "../models/room.js";
import { ServiceModel } from "../models/service.js";

type SeedFile = {
  rooms: Record<string, unknown>[];
  offers: Record<string, unknown>[];
  services: Record<string, unknown>[];
  reviews: Record<string, unknown>[];
  gallery: Record<string, unknown>[];
  faqs: Record<string, unknown>[];
};

function loadSeedData(): SeedFile {
  const file = join(dirname(fileURLToPath(import.meta.url)), "data.json");
  return JSON.parse(readFileSync(file, "utf8")) as SeedFile;
}

/** Create or update the default admin from ADMIN_USERNAME / ADMIN_PASSWORD */
export async function seedAdminUser() {
  const username = env.ADMIN_USERNAME.trim().toLowerCase();
  const passwordHash = await hashPassword(env.ADMIN_PASSWORD);

  const user = await AdminUserModel.findOneAndUpdate(
    { username },
    {
      username,
      passwordHash,
      role: "admin",
      name: "Administrator",
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return {
    id: String(user._id),
    username: user.username,
    role: user.role,
  };
}

export async function runSeed() {
  const data = loadSeedData();

  await Promise.all([
    RoomModel.deleteMany({}),
    OfferModel.deleteMany({}),
    ServiceModel.deleteMany({}),
    ReviewModel.deleteMany({}),
    GalleryItemModel.deleteMany({}),
    FaqModel.deleteMany({}),
  ]);

  await RoomModel.insertMany(data.rooms);
  await OfferModel.insertMany(data.offers);
  await ServiceModel.insertMany(data.services);
  await ReviewModel.insertMany(data.reviews);
  await GalleryItemModel.insertMany(data.gallery ?? []);
  await FaqModel.insertMany(data.faqs ?? []);

  const admin = await seedAdminUser();

  return {
    rooms: data.rooms.length,
    offers: data.offers.length,
    services: data.services.length,
    reviews: data.reviews.length,
    gallery: (data.gallery ?? []).length,
    faqs: (data.faqs ?? []).length,
    admin: admin.username,
  };
}

export const seedRouter = Router();

seedRouter.post("/reset", requireAuth, async (_req, res, next) => {
  try {
    const counts = await runSeed();
    res.json({ data: counts });
  } catch (error) {
    next(error);
  }
});

export async function seedCli() {
  await connectDb();
  const counts = await runSeed();
  console.log("Seed complete:", counts);
  process.exit(0);
}
