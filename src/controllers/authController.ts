// src/controllers/authController.ts
import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

// --------------------------------------------------
// LOGIN
// --------------------------------------------------
export const login = async (req: Request, res: Response) => {
  try {
    const { email, pj } = req.body;
    console.log("Login attempt:", { email, pj });

    if (!email || !pj) {
      return res.status(400).json({ message: "Email and PJ number are required" });
    }

    // Must select password manually!
    const user = await User.findOne({ email }).select("+password");

    console.log("Found user:", user ? user.email : "No user found");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or PJ number" });
    }

    // Compare PJ (raw) with hashed password
    const isMatch = await bcrypt.compare(pj, user.password);

    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or PJ number" });
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());
    console.log("Generated token:", token);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
