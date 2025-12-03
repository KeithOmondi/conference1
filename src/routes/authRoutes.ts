// src/routes/authRoutes.ts
import { Router } from "express";
import { login, logout } from "../controllers/authController";

const router = Router();

// ------------------------
// Auth Routes
// ------------------------

// POST /api/auth/login
router.post("/login", login);

router.post("/logout", logout);

// Future routes (e.g., logout, register) can go here

export default router;
