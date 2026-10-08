import { Router } from "express";
import multer from "multer";

import { cloudinary } from "../config/cloudinary.js";
import { env, isCloudinaryConfigured } from "../config/env.js";
import { requireAuth } from "../middleware/auth.js";
import { ApiError } from "../middleware/error.js";

const IMAGE_MAX = 8 * 1024 * 1024;
const VIDEO_MAX = 80 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: VIDEO_MAX },
  fileFilter(_req, file, cb) {
    const ok =
      file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/");
    if (!ok) {
      cb(new ApiError(400, "Only image or video files are allowed"));
      return;
    }
    cb(null, true);
  },
});

export const uploadRouter = Router();

uploadRouter.post(
  "/",
  requireAuth,
  upload.single("file"),
  async (req, res, next) => {
    try {
      if (!isCloudinaryConfigured()) {
        throw new ApiError(
          503,
          "Cloudinary is not configured. Set CLOUDINARY_* in server/.env"
        );
      }

      if (!req.file) {
        throw new ApiError(400, "No file uploaded");
      }

      const isVideo = req.file.mimetype.startsWith("video/");
      const maxBytes = isVideo ? VIDEO_MAX : IMAGE_MAX;
      if (req.file.size > maxBytes) {
        throw new ApiError(
          400,
          isVideo
            ? "Video must be 80MB or smaller"
            : "Image must be 8MB or smaller"
        );
      }

      const folder = String(req.body.folder ?? env.CLOUDINARY_FOLDER);
      const resourceType = isVideo ? "video" : "image";
      const result = await uploadBuffer(req.file.buffer, folder, resourceType);

      res.status(201).json({
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          resourceType,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

function uploadBuffer(
  buffer: Buffer,
  folder: string,
  resourceType: "image" | "video"
) {
  return new Promise<{
    secure_url: string;
    public_id: string;
    width?: number;
    height?: number;
    format?: string;
  }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}
