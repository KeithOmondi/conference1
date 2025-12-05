// src/routes/authRoutes.ts
import { Router } from "express";
import { fetchAllUsers, login, logout } from "../controllers/authController";
import { protect, restrictTo } from "../middlewares/authMiddleware";

const router = Router();

// ------------------------
// Auth Routes
// ------------------------

// POST /api/auth/login
router.post("/login", login);

router.post("/logout", logout);

router.post("/all", protect, restrictTo("admin"), fetchAllUsers)

// Future routes (e.g., logout, register) can go here

export default router;
