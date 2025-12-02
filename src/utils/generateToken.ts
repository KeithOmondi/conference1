// src/utils/generateToken.ts
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (id: string) => {
  return jwt.sign({ id }, env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};
