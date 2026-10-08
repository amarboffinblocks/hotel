import { Schema, model } from "mongoose";

import { documentOptions } from "./document-options.js";

const offerSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    priceLabel: { type: String, required: true },
    priceNote: { type: String, required: true },
    image: { type: String, required: true },
  },
  documentOptions
);

export const OfferModel = model("Offer", offerSchema);
