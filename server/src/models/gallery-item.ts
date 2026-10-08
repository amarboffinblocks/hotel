import { Schema, model } from "mongoose";

import { documentOptions } from "./document-options.js";

const galleryItemSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
      default: "image",
    },
    src: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true },
    poster: { type: String, trim: true, default: "" },
    sortOrder: { type: Number, required: true, default: 0 },
    published: { type: Boolean, default: true },
  },
  documentOptions
);

galleryItemSchema.index({ sortOrder: 1 });

export const GalleryItemModel = model("GalleryItem", galleryItemSchema);
