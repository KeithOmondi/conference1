// src/config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import { env } from "./env"; // your env loader

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true, // ensures HTTPS URLs
});

export default cloudinary;
