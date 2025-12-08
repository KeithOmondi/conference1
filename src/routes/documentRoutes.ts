// src/routes/documentRoutes.ts
import express from "express";
import {
  uploadDocument,
  getAllDocuments,
  getDocumentById,
  deleteDocument,
} from "../controllers/documentController";
import { protect, restrictTo } from "../middlewares/authMiddleware";
import { parser } from "../middlewares/multer";

const router = express.Router();

// Admin-only upload
router.post(
  "/upload",
  protect,
  restrictTo("admin"),
  parser.single("file"),
  uploadDocument
);

// Public access
router.get("/get", getAllDocuments);
router.get("/get/:id", getDocumentById);

// Admin-only delete
router.delete("/delete/:id", protect, restrictTo("admin"), deleteDocument);

export default router;
