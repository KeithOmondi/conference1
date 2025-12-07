// src/middlewares/parser.ts (or wherever your multer setup is)

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "presentations", // folder in Cloudinary
      // FIX: Add access_mode: 'public' to ensure the uploaded file can be accessed via a public URL
      access_mode: "public",
      format: file.mimetype === "application/pdf" ? "pdf" : "png", // dynamically set format
      public_id: `${Date.now()}-${file.originalname}`, // unique filename
    };
  },
});

const parser = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

export default parser;
