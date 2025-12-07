// src/controllers/authController.ts
import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { sendMail } from "../utils/sendMail";
import { generateWelcomeEmail } from "../utils/emailTemplates";

// LOGIN WITH PJ ONLY — FAST & CORRECT
// LOGIN WITH PJ ONLY — FASTEST VERSION
export const login = async (req: Request, res: Response) => {
  try {
    const { pj } = req.body;
    if (!pj) {
      return res.status(400).json({ message: "PJ number is required" });
    }

    const user = await User.findOne({ pj }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid PJ number" });
    }

    const isMatch = await bcrypt.compare(pj, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid PJ number" });
    }

    const token = generateToken(user._id.toString(), user.role);

    // Send response IMMEDIATELY — do not wait for anything else
    res.status(200).json({
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

    // 🟡 FIRE-AND-FORGET EMAIL (runs after response)
    process.nextTick(() => {
      const subject = `Hello ${user.name}, Welcome to the High Court Annual Summit 2025.`;

      sendMail({
        to: user.email,
        subject,
        html: generateWelcomeEmail(user),
      }).catch((err) => console.error("Email sending failed:", err));
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

// FETCH ALL USERS — for dropdowns, admin-only
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
