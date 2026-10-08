import { Schema, model } from "mongoose";

import { documentOptions } from "./document-options.js";

const serviceSchema = new Schema(
  {
    number: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
  },
  documentOptions
);

export const ServiceModel = model("Service", serviceSchema);
