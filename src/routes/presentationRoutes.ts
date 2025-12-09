import express from "express";
import {
  createPresentation,
  getAllPresentations,
  getMyPresentations,
  getPresentationById,
  updatePresentation,
  deletePresentation,
} from "../controllers/PresentationController";
import { protect, restrictTo } from "../middlewares/authMiddleware";

const router = express.Router();

// -------------------------------------------------------------
// CREATE — Admin creates a presentation (NO FILE UPLOAD ANYMORE)
// -------------------------------------------------------------
router.post(
  "/create",
  protect,
  restrictTo("admin"),
  createPresentation
);

// -------------------------------------------------------------
// GET ALL — Admin only
// -------------------------------------------------------------
router.get("/get", protect, getAllPresentations);

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
router.patch(
  "/update/:id",
  protect,
  restrictTo("admin"),
  updatePresentation
);

// -------------------------------------------------------------
// DELETE — Admin only
// -------------------------------------------------------------
router.delete(
  "/delete/:id",
  protect,
  restrictTo("admin"),
  deletePresentation
);



export default router;
