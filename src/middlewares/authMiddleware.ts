// src/middlewares/authMiddleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded: any = jwt.verify(token, env.JWT_SECRET);

      req.user = decoded.id; // store user ID

      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  }

  return res.status(401).json({ success: false, message: "No token provided" });
};
