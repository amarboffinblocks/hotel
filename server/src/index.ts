import cors from "cors";
import express from "express";

import { configureCloudinary } from "./config/cloudinary.js";
import { connectDb } from "./config/db.js";
import { env, getAllowedCorsOrigins } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { authRouter } from "./routes/auth.js";
import {
  faqsRouter,
  galleryRouter,
  healthRouter,
  offersRouter,
  reviewsRouter,
  roomsRouter,
  servicesRouter,
} from "./routes/index.js";
import { seedRouter } from "./seed/run.js";
import { uploadRouter } from "./routes/upload.js";

async function main() {
  await connectDb();
  configureCloudinary();

  const app = express();
  const allowedOrigins = new Set(getAllowedCorsOrigins());

  app.use(
    cors({
      origin(origin, callback) {
        // Non-browser clients (curl / server-to-server)
        if (!origin) {
          callback(null, true);
          return;
        }
        // Dev: reflect any origin. Prod: allowlist only.
        if (env.NODE_ENV === "development" || allowedOrigins.has(origin)) {
          callback(null, origin);
          return;
        }
        callback(new Error(`CORS blocked for origin: ${origin}`));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use(express.json({ limit: "2mb" }));

  app.use("/api/health", healthRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/upload", uploadRouter);
  app.use("/api/seed", seedRouter);
  app.use("/api/rooms", roomsRouter);
  app.use("/api/offers", offersRouter);
  app.use("/api/services", servicesRouter);
  app.use("/api/reviews", reviewsRouter);
  app.use("/api/gallery", galleryRouter);
  app.use("/api/faqs", faqsRouter);

  app.use(notFound);
  app.use(errorHandler);

  app.listen(env.PORT, () => {
    console.log(`API listening on http://localhost:${env.PORT}`);
    console.log(`CORS allowlist: ${[...allowedOrigins].join(", ")}`);
  });
}

main().catch((error) => {
  console.error("Failed to start API:", error);
  process.exit(1);
});
