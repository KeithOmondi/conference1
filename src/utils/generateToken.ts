import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};
