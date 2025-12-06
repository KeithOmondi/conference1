import { Router } from "express";
import {
  getProgramme,
  getProgrammeByDay,
  createProgrammeDay,
  updateProgrammeDay,
  deleteProgrammeDay,
} from "../controllers/programmecontroller";
import { protect, restrictTo } from "../middlewares/authMiddleware";

const router = Router();

// ---------------------------------------------------------
// PROGRAMME ROUTES
// ---------------------------------------------------------

// Get ALL programme days
router.get("/get", getProgramme);

// Get ONE programme day (by ObjectId or dayLabel)
router.get("/get/:id", getProgrammeByDay);

// Create a new programme day
router.post("/create", protect, restrictTo("admin"), createProgrammeDay);

// Update programme day
router.put("/update/:id", protect, restrictTo("admin"), updateProgrammeDay);

// Delete programme day
router.delete("/delete/:id", protect, restrictTo("admin"), deleteProgrammeDay);

export default router;
