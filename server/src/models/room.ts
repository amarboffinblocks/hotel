import { Schema, model } from "mongoose";

import { documentOptions } from "./document-options.js";

const roomSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    view: { type: String, required: true },
    guests: { type: Number, required: true },
    sizeSqFt: { type: Number, required: true },
    bedType: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    image: { type: String, required: true },
    gallery: { type: [String], default: [] },
    video: {
      type: {
        src: String,
        poster: String,
        alt: String,
      },
      required: false,
    },
    popular: { type: Boolean, default: false },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    highlights: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    included: { type: [String], default: [] },
  },
  documentOptions
);

export const RoomModel = model("Room", roomSchema);
