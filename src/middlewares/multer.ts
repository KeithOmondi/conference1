// src/middlewares/parser.ts
import multer from "multer";
import streamifier from "streamifier";

// Memory storage for Multer
const storage = multer.memoryStorage();

const parser = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

export { parser, streamifier };
