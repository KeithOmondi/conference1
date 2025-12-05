// src/middlewares/authMiddleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import User from "../models/User";

interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded: any = jwt.verify(token, env.JWT_SECRET);

      // Fetch full user from DB
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      req.user = user; // now req.user._id exists
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  }

  return res.status(401).json({ success: false, message: "No token provided" });
};



export const restrictTo = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};

