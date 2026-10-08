import type { SchemaOptions } from "mongoose";

/** Shared JSON transform: expose `id`, hide `_id` / `__v` */
export const documentOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform(_doc, ret) {
      const value = ret as Record<string, unknown> & {
        _id?: unknown;
        id?: string;
      };
      if (value._id != null) {
        value.id = String(value._id);
        delete value._id;
      }
      return value;
    },
  },
};
