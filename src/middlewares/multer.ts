// src/middlewares/multer.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

// Storage for documents
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "documents",           // Folder in Cloudinary
    access_mode: "public",         // Public URL
    format: file.mimetype === "application/pdf" ? "pdf" : "png",
    public_id: `${Date.now()}-${file.originalname}`, // unique filename
  }),
});

const parser = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

export default parser;
