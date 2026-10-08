import type { Model } from "mongoose";
import type { NextFunction, Request, Response } from "express";
import { Router } from "express";

import { requireAuth } from "../middleware/auth.js";
import { ApiError } from "../middleware/error.js";

type CrudOptions = {
  /** Public list/get without auth (marketing site) */
  publicRead?: boolean;
  /** Mongo sort — defaults to createdAt ascending */
  sort?: Record<string, 1 | -1>;
};

/** Reusable CRUD router factory for Mongo resources */
export function createCrudRouter(Model: Model<unknown>, options: CrudOptions = {}) {
  const router = Router();
  const { publicRead = true, sort = { createdAt: 1 } } = options;

  const list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await Model.find().sort(sort).lean();
      const data = items.map((item) => mapId(item as Record<string, unknown>));
      res.json({ data });
    } catch (error) {
      next(error);
    }
  };

  const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await Model.findById(req.params.id).lean();
      if (!item) throw new ApiError(404, "Item not found");
      res.json({ data: mapId(item as Record<string, unknown>) });
    } catch (error) {
      next(error);
    }
  };

  const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const created = await Model.create(stripId(req.body));
      res.status(201).json({ data: created.toJSON() });
    } catch (error) {
      next(normalizeMongoError(error));
    }
  };

  const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await Model.findByIdAndUpdate(
        req.params.id,
        stripId(req.body),
        { new: true, runValidators: true }
      );
      if (!updated) throw new ApiError(404, "Item not found");
      res.json({ data: updated.toJSON() });
    } catch (error) {
      next(normalizeMongoError(error));
    }
  };

  const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await Model.findByIdAndDelete(req.params.id);
      if (!deleted) throw new ApiError(404, "Item not found");
      res.json({ data: { id: req.params.id } });
    } catch (error) {
      next(error);
    }
  };

  if (publicRead) {
    router.get("/", list);
    router.get("/:id", getOne);
  } else {
    router.get("/", requireAuth, list);
    router.get("/:id", requireAuth, getOne);
  }

  router.post("/", requireAuth, create);
  router.patch("/:id", requireAuth, update);
  router.delete("/:id", requireAuth, remove);

  return router;
}

function mapId(doc: Record<string, unknown>) {
  const { _id, __v, ...rest } = doc;
  return {
    ...rest,
    id: _id != null ? String(_id) : rest.id,
  };
}

function stripId(body: Record<string, unknown>) {
  const { id: _id, _id: __mongoId, ...rest } = body;
  return rest;
}

function normalizeMongoError(error: unknown) {
  if (
    typeof error === "object" &&
    error &&
    "code" in error &&
    (error as { code?: number }).code === 11000
  ) {
    return new ApiError(409, "Duplicate value — slug or unique field already exists");
  }
  return error;
}
