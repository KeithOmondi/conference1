// src/controllers/authController.ts
import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { sendMail } from "../utils/sendMail";

// LOGIN WITH PJ ONLY — FAST & CORRECT
export const login = async (req: Request, res: Response) => {
  try {
    const { pj } = req.body;

    if (!pj) {
      return res.status(400).json({ message: "PJ number is required" });
    }

    // Fetch user by pj
    const user = await User.findOne({ pj }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid PJ number" });
    }

    // Compare PJ against hashed password
    const isMatch = await bcrypt.compare(pj, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid PJ number" });
    }

    const token = generateToken(user._id.toString(), user.role);

    const subject = `Hello ${user.name}, Welcome to the High Court Annual Summit 2025.`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to the High Court Annual Summit</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">

    <div style="max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">

        <!-- Header -->
        <div style="background-color: #005A2B; color: #ffffff; padding: 25px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: bold;">
                High Court Annual Summit 2025
            </h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px; background-color: #ffffff;">

            <p style="font-size: 16px; margin-top: 0;">
                Dear <strong style="color: #005A2B;">${user.name}</strong>,
            </p>

            <p style="font-size: 16px;">
                We extend a warm welcome to the 
                <strong style="color: #005A2B;">High Court Annual Summit 2025</strong>. 
                We are delighted to have your presence as part of this important gathering.
            </p>

            <!-- Highlighted Login Details Box -->
            <div style="
                margin: 30px 0; 
                padding: 20px; 
                border-left: 5px solid #C6A64F; 
                background-color: #FFF9E8; 
                border-radius: 4px;
            ">
                <h4 style="
                    margin-top: 0; 
                    margin-bottom: 15px; 
                    color: #005A2B; 
                    font-size: 18px; 
                    border-bottom: 1px dashed #C6A64F; 
                    padding-bottom: 10px;
                ">
                    Login Details
                </h4>

                <p style="margin: 5px 0; font-size: 14px;">
                    <strong>Role:</strong> 
                    <span style="color: #005A2B; font-weight: bold;">${
                      user.role
                    }</span>
                </p>

                <p style="margin: 5px 0; font-size: 14px;">
                    <strong>Station:</strong> ${user.station || "N/A"}
                </p>

                <p style="margin: 5px 0; font-size: 14px;">
                    <strong>Email:</strong> ${user.email || "N/A"}
                </p>
            </div>

            <p style="font-size: 16px;">
                Wishing you a productive and enjoyable summit.
            </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f4f4f4; padding: 20px 30px; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0; font-size: 12px; color: #666;">
                Office of the Registrar High Court
            </p>
            <p style="margin: 5px 0 0; font-size: 10px; color: #999;">
                This is an automated message. Please do not reply.
            </p>
        </div>

    </div>

</body>
</html>
`;

    // Fire email without awaiting to avoid slowing login
    sendMail({ to: user.email, subject, html }).catch((err) =>
      console.error("Email sending failed:", err)
    );

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
