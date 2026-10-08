import { Router } from "express";

import { FaqModel } from "../models/faq.js";
import { GalleryItemModel } from "../models/gallery-item.js";
import { OfferModel } from "../models/offer.js";
import { ReviewModel } from "../models/review.js";
import { RoomModel } from "../models/room.js";
import { ServiceModel } from "../models/service.js";
import { createCrudRouter } from "./crud.js";

export const roomsRouter = createCrudRouter(RoomModel as never);
export const offersRouter = createCrudRouter(OfferModel as never);
export const servicesRouter = createCrudRouter(ServiceModel as never);
export const reviewsRouter = createCrudRouter(ReviewModel as never);
export const galleryRouter = createCrudRouter(GalleryItemModel as never, {
  sort: { sortOrder: 1, createdAt: 1 },
});
export const faqsRouter = createCrudRouter(FaqModel as never, {
  sort: { sortOrder: 1, createdAt: 1 },
});

export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ ok: true, service: "grandview-api" });
});
