// src/controllers/authController.ts
import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

// LOGIN WITH PJ ONLY — OPTIMIZED (NO INDEX REQUIRED)
export const login = async (req: Request, res: Response) => {
  try {
    const { pj } = req.body;
    console.log("Login attempt with PJ:", pj);

    if (!pj) {
      return res.status(400).json({ message: "PJ number is required" });
    }

    // Fetch all users with password included (lean for speed)
    const users = await User.find().select("+password").lean();

    let matchedUser: any = null;

    // Optimization: avoid sequential bcrypt calls by batching them
    await Promise.all(
      users.map(async (u) => {
        if (!matchedUser) {
          const ok = await bcrypt.compare(pj, u.password);
          if (ok) matchedUser = u;
        }
      })
    );

    if (!matchedUser) {
      return res.status(401).json({ message: "Invalid PJ number" });
    }

    console.log("User matched:", matchedUser.email);

    const token = generateToken(matchedUser._id.toString());

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: matchedUser._id,
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role,
        station: matchedUser.station,
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



