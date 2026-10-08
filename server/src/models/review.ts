import { Schema, model } from "mongoose";

import { documentOptions } from "./document-options.js";

const reviewSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    quote: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    avatar: { type: String, required: true },
  },
  documentOptions
);

export const ReviewModel = model("Review", reviewSchema);
