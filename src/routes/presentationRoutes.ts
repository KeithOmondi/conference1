import express from "express";
import {
  createPresentation,
  getAllPresentations,
  getMyPresentations,
  getPresentationById,
  updatePresentation,
  deletePresentation,
  getPresentationDownloadUrl,
} from "../controllers/PresentationController";
import { protect, restrictTo } from "../middlewares/authMiddleware";
import { parser } from "../middlewares/multer";

const router = express.Router();

// -------------------------------------------------------------
// CREATE — Admin uploads a presentation
// -------------------------------------------------------------
router.post(
  "/create",
  protect,
  restrictTo("admin"),
  parser.single("file"),
  createPresentation
);

// -------------------------------------------------------------
// GET ALL — Admin only
// -------------------------------------------------------------
router.get("/get", protect,  getAllPresentations);

// -------------------------------------------------------------
// GET MINE — Judge sees only their own
// -------------------------------------------------------------
router.get("/mine", protect, getMyPresentations);

// -------------------------------------------------------------
// GET BY ID — Judge sees only theirs; Admin sees all
// -------------------------------------------------------------
router.get("/get/:id", protect, getPresentationById);

// -------------------------------------------------------------
// UPDATE — Admin only
// -------------------------------------------------------------
router.patch("/update/:id", protect, restrictTo("admin"), updatePresentation);

// -------------------------------------------------------------
// DELETE — Admin only
// -------------------------------------------------------------
router.delete("/delete/:id", protect, restrictTo("admin"), deletePresentation);

// Download signed URL (admin or assigned presenter)
router.get("/download/:id", protect, getPresentationDownloadUrl);

export default router;
