import { v2 as cloudinary } from "cloudinary";

import { env, isCloudinaryConfigured } from "./env.js";

export function configureCloudinary() {
  if (!isCloudinaryConfigured()) {
    console.warn(
      "Cloudinary not configured — upload routes will return 503 until credentials are set."
    );
    return false;
  }

  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  return true;
}

export { cloudinary };
