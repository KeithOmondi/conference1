// src/env.ts
import dotenv from "dotenv";

dotenv.config();

export const env = {
  MONGO_URI: process.env.MONGO_URI || "",
  PORT: process.env.PORT || "5000",
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
};
