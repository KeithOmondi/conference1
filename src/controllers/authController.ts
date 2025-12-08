// src/controllers/authController.ts
import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";


// LOGIN WITH PJ — OPTIMIZED FOR PRODUCTION
export const login = async (req: Request, res: Response) => {
  try {
    const { pj } = req.body;

    if (!pj) {
      return res.status(400).json({ message: "PJ number is required" });
    }

    // 1. Find user by PJ
    const user = await User.findOne({ pj }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid PJ number" });
    }

    // 2. Compare PJ with hashed password
    const isMatch = await bcrypt.compare(pj, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid PJ number" });
    }

    // 3. Generate token
    const token = generateToken(user._id.toString(), user.role);

    // 4. Respond immediately (no waiting for email)
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        station: user.station,
        image: user.img,
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



// FETCH ALL USERS — admin-only
export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, "firstName lastName email pj role");

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (err) {
    console.error("Fetch all users error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
