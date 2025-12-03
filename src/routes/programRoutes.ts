import { Router } from "express";
import {
  getProgramme,
  getProgrammeByDay,
  createProgrammeDay,
  updateProgrammeDay,
  deleteProgrammeDay,
} from "../controllers/programmecontroller";

const router = Router();

// ---------------------------------------------------------
// PROGRAMME ROUTES
// ---------------------------------------------------------

// Get all programme days
router.get("/get", getProgramme);

// Get a single programme day by ID or by day name
router.get("/get/:id", getProgrammeByDay);

// Create a new programme day (Admin action)
router.post("/create", createProgrammeDay);

// Update a programme day
router.put("/update/:id", updateProgrammeDay);

// Delete a programme day
router.delete("/delete/:id", deleteProgrammeDay);

export default router;
