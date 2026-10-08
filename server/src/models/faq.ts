import { Schema, model } from "mongoose";

import { documentOptions } from "./document-options.js";

const faqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    sortOrder: { type: Number, required: true, default: 0 },
    published: { type: Boolean, default: true },
  },
  documentOptions
);

faqSchema.index({ sortOrder: 1 });

export const FaqModel = model("Faq", faqSchema);
