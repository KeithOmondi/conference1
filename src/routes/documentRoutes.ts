import express from "express";
import {
  uploadDocument,
  getAllDocuments,
  getDocumentUrl,
  deleteDocument,
} from "../controllers/documentController";
import { protect, restrictTo } from "../middlewares/authMiddleware";
import { parser } from "../middlewares/multer";

const router = express.Router();

// ------------------ ADMIN ONLY ------------------
// Upload a document
router.post(
  "/upload",
  protect,
  restrictTo("admin"),
  parser.single("file"),
  uploadDocument
);

// Delete a document
router.delete("/delete/:id", protect, restrictTo("admin"), deleteDocument);

// ------------------ PUBLIC OR PROTECTED ------------------
// Get all documents (metadata only)
router.get("/get", getAllDocuments);

// Get single document metadata
//router.get("/get/:id", getDocumentById);

// ------------------ SIGNED URL (AUTH REQUIRED) ------------------
router.get("/url/:id", protect, getDocumentUrl);

export default router;
