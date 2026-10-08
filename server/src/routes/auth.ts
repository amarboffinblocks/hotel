import { Router } from "express";

import { signAdminToken } from "../middleware/auth.js";
import { ApiError } from "../middleware/error.js";
import { AdminUserModel } from "../models/admin-user.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    const username = String(req.body?.username ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");

    if (!username || !password) {
      throw new ApiError(400, "Username and password are required");
    }

    const user = await AdminUserModel.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, "Invalid username or password");
    }

    const token = signAdminToken(user.username);
    res.json({
      data: {
        token,
        user: {
          id: String(user._id),
          username: user.username,
          name: user.name,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});
