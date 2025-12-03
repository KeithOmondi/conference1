import { Router } from "express";
import {
  getPresenters,
  getPresenterById,
  createPresenter,
  updatePresenter,
  deletePresenter,
} from "../controllers/presenterController";

const router = Router();

router.get("/get", getPresenters);
router.get("/get/:id", getPresenterById);
router.post("/create", createPresenter);
router.put("/update/:id", updatePresenter);
router.delete("/delete/:id", deletePresenter);

export default router;
