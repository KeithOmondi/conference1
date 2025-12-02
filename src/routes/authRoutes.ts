// src/routes/authRoutes.ts
import { Router } from "express";
import { login } from "../controllers/authController";

const router = Router();

// ------------------------
// Auth Routes
// ------------------------

// POST /api/auth/login
router.post("/login", login);

// Future routes (e.g., logout, register) can go here

export default router;
