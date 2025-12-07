import { Request, Response } from "express";
import Presentation from "../models/Presentation";
import User from "../models/User";
import cloudinary from "../config/cloudinary";

interface AuthRequest extends Request {
  user?: any;
}

// -------------------------------------------------------------
// CREATE — Admin uploads a presentation & assigns a presenter
// -------------------------------------------------------------
export const createPresentation = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ status: "fail", message: "Only admins can upload presentations." });
    }

    const { title, description, presenterId, visibility } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ status: "fail", message: "File is required." });
    }

    // Validate presenter
    const presenterExists = await User.findById(presenterId);
    if (!presenterExists) {
      return res.status(404).json({ status: "fail", message: "Presenter not found." });
    }

    const presentation = await Presentation.create({
      title,
      description,
      presenter: presenterId,
      fileUrl: req.file.path, // Cloudinary URL
      uploadedBy: req.user._id,
      visibility: visibility || "private",
    });

    return res.status(201).json({
      status: "success",
      presentation,
    });
  } catch (error: any) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

// -------------------------------------------------------------
// GET ALL — Admin + Judge can view all presentations
// -------------------------------------------------------------
export const getAllPresentations = async (req: Request, res: Response) => {
  try {
    // Require logged-in user
    if (!req.user) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }

    // Allow both admin and judge
    if (req.user.role !== "admin" && req.user.role !== "judge") {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to view presentations.",
      });
    }

    const presentations = await Presentation.find()
      .populate("presenter", "firstName lastName email pj")
      .populate("uploadedBy", "firstName lastName email");

    return res.status(200).json({
      status: "success",
      presentations,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: "error", message: error.message });
  }
};


// -------------------------------------------------------------
// GET MINE — Judge sees only their presentations
// -------------------------------------------------------------
export const getMyPresentations = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "fail",
        message: "You must be logged in.",
      });
    }

    const userId = req.user._id;
    const role = req.user.role;

    let presentations;

    // 🟦 ADMIN — sees ALL presentations they uploaded
    if (role === "admin") {
      presentations = await Presentation.find({ uploadedBy: userId })
        .populate("presenter", "name role email")
        .populate("uploadedBy", "name role email")
        .sort({ createdAt: -1 });
    }

    // 🟩 JUDGE — sees all presentations assigned to them
    else if (role === "judge") {
      presentations = await Presentation.find({ presenter: userId })
        .populate("presenter", "name role email")
        .populate("uploadedBy", "name role email")
        .sort({ createdAt: -1 });
    }

    // ❌ Unknown role
    else {
      return res.status(403).json({
        status: "fail",
        message: "Your role does not have access to presentations.",
      });
    }

    return res.status(200).json({
      status: "success",
      count: presentations.length,
      presentations,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error while fetching presentations.",
    });
  }
};


// -------------------------------------------------------------
// GET BY ID — Judge can view only theirs; Admin can view all
// -------------------------------------------------------------
export const getPresentationById = async (req: Request, res: Response) => {
  try {
    // 🔐 Safety guard. This removes the TS error AND protects the API.
    if (!req.user) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    const { id } = req.params;

    const presentation = await Presentation.findById(id)
      .populate("presenter", "firstName lastName email pj")
      .populate("uploadedBy", "firstName lastName email");

    if (!presentation) {
      return res.status(404).json({
        status: "fail",
        message: "Presentation not found.",
      });
    }

    // 👇 Now, TS knows req.user exists.
    if (
      req.user.role === "judge" &&
      presentation.presenter.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        status: "fail",
        message: "You are not allowed to view this presentation.",
      });
    }

    return res.json({
      status: "success",
      presentation,
    });
  } catch (error: any) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};


// -------------------------------------------------------------
// UPDATE — Admin only
// -------------------------------------------------------------
export const updatePresentation = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ status: "fail", message: "Only admins can update presentations." });
    }

    const { id } = req.params;

    const updated = await Presentation.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ status: "fail", message: "Presentation not found." });
    }

    return res.json({
      status: "success",
      presentation: updated,
    });
  } catch (error: any) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

// -------------------------------------------------------------
// DELETE — Admin only
// -------------------------------------------------------------
export const deletePresentation = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ status: "fail", message: "Only admins can delete presentations." });
    }

    const { id } = req.params;

    const deleted = await Presentation.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ status: "fail", message: "Presentation not found." });
    }

    return res.json({
      status: "success",
      message: "Presentation removed successfully.",
    });
  } catch (error: any) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

// -------------------------------------------------------------
// GET SIGNED DOWNLOAD URL — Only authorized users
// -------------------------------------------------------------
export const getPresentationDownloadUrl = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    const presentation = await Presentation.findById(id);
    if (!presentation) {
      return res.status(404).json({ status: "fail", message: "Presentation not found." });
    }

    // Only admin or assigned presenter can download
    if (req.user.role === "judge" && presentation.presenter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: "fail", message: "You cannot download this presentation." });
    }

    // Extract Cloudinary public ID from URL
    const publicId = presentation.fileUrl
      .split("/upload/")[1]
      .split(".")[0]; // e.g., presentations/INFO_NOTE-In

    const signedUrl = cloudinary.url(publicId, {
      type: "authenticated",
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    });

    return res.status(200).json({ status: "success", url: signedUrl });
  } catch (error: any) {
    console.error("Download URL error:", error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};
