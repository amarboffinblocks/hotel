import bcrypt from "bcryptjs";
import { Schema, model, type HydratedDocument, type Model } from "mongoose";

import { documentOptions } from "./document-options.js";

type AdminUserMethods = {
  comparePassword(candidate: string): Promise<boolean>;
};

export type AdminUserDocument = HydratedDocument<
  {
    username: string;
    passwordHash: string;
    role: "admin";
    name: string;
  },
  AdminUserMethods
>;

type AdminUserModelType = Model<
  {
    username: string;
    passwordHash: string;
    role: "admin";
    name: string;
  },
  object,
  AdminUserMethods
>;

const adminUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    name: { type: String, default: "Administrator" },
  },
  documentOptions
);

adminUserSchema.methods.comparePassword = function comparePassword(
  this: AdminUserDocument,
  candidate: string
) {
  return bcrypt.compare(candidate, this.passwordHash);
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export const AdminUserModel = model(
  "AdminUser",
  adminUserSchema
) as AdminUserModelType;
