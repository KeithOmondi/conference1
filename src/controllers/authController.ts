// src/controllers/authController.ts
import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

// LOGIN WITH PJ ONLY — OPTIMIZED (NO INDEX REQUIRED)
// LOGIN WITH PJ ONLY — FAST & CORRECT
export const login = async (req: Request, res: Response) => {
  try {
    const { pj } = req.body;

    if (!pj) {
      return res.status(400).json({ message: "PJ number is required" });
    }

    // Fetch user by pj (indexed → FAST)
    const user = await User.findOne({ pj }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid PJ number" });
    }

    // Compare PJ against hashed password
    const isMatch = await bcrypt.compare(pj, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid PJ number" });
    }

    const token = generateToken(user._id.toString());

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        station: user.station,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};



// LOGOUT USER
export const logout = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "Logout successful" });

  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};



