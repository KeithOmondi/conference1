import { Router } from "express";
import PresenterBioController from "../controllers/PresenterBioController";
import parser from "../middlewares/multer";

const router = Router();

// CREATE (with image upload)
router.post("/create", parser.single("image"), PresenterBioController.create);

// GET ALL
router.get("/get", PresenterBioController.getAll);

// GET ONE
router.get("/get/:id", PresenterBioController.getOne);

// UPDATE
router.put(
  "/update/:id",
  parser.single("image"),
  PresenterBioController.update
);

// DELETE
router.delete("/delete/:id", PresenterBioController.delete);

export default router;
