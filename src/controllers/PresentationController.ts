import { Request, Response } from "express";
import Presentation from "../models/Presentation";
import User from "../models/User";

interface AuthRequest extends Request {
  user?: any;
}

// -------------------------------------------------------------
// CREATE PRESENTATION — Admin only (NO FILE UPLOAD)
// -------------------------------------------------------------
export const createPresentation = async (req: AuthRequest, res: Response) => {
  try {
    console.log("---- Incoming Create Presentation Request ----");
    console.log("User:", req.user);
    console.log("Body:", req.body);
    console.log("---------------------------------------------");

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        status: "fail",
        message: "Only admins can create presentations.",
      });
    }

    const { title, description, presenterId, visibility, fileUrl } = req.body;

    // Validate presenter
    const presenterExists = await User.findById(presenterId);
    if (!presenterExists) {
      return res.status(404).json({
        status: "fail",
        message: "Presenter not found.",
      });
    }

    const presentation = await Presentation.create({
      title,
      description,
      presenter: presenterId,
      uploadedBy: req.user._id,
      visibility: visibility || "private",
      fileUrl: fileUrl || null, // Optional (manual link / no upload)
    });

    return res.status(201).json({
      status: "success",
      presentation,
    });
  } catch (error: any) {
    console.log("❌ Server Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// -------------------------------------------------------------
// GET ALL — Admin + Judge can view all presentations
// -------------------------------------------------------------
export const getAllPresentations = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }

    if (req.user.role !== "admin" && req.user.role !== "judge") {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to view presentations.",
      });
    }

    const presentations = await Presentation.find()
      .populate("presenter", "firstName lastName email pj")
      .populate("uploadedBy", "firstName lastName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      presentations,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// -------------------------------------------------------------
// GET MINE — Judge sees only their assigned presentations
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

    // ADMIN — sees all presentations they uploaded
    if (role === "admin") {
      presentations = await Presentation.find({ uploadedBy: userId })
        .populate("presenter", "firstName lastName email")
        .populate("uploadedBy", "firstName lastName email")
        .sort({ createdAt: -1 });
    }

    // JUDGE — sees presentations assigned to them
    else if (role === "judge") {
      presentations = await Presentation.find({ presenter: userId })
        .populate("presenter", "firstName lastName email")
        .populate("uploadedBy", "firstName lastName email")
        .sort({ createdAt: -1 });
    }

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
      message: error.message,
    });
  }
};

// -------------------------------------------------------------
// GET BY ID — Judge only sees their own; Admin sees all
// -------------------------------------------------------------
export const getPresentationById = async (req: AuthRequest, res: Response) => {
  try {
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

    // Judges can only view their own assigned presentations
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
export const updatePresentation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        status: "fail",
        message: "Only admins can update presentations.",
      });
    }

    const { id } = req.params;

    const updated = await Presentation.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        status: "fail",
        message: "Presentation not found.",
      });
    }

    return res.json({
      status: "success",
      presentation: updated,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// -------------------------------------------------------------
// DELETE — Admin only
// -------------------------------------------------------------
export const deletePresentation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        status: "fail",
        message: "Only admins can delete presentations.",
      });
    }

    const { id } = req.params;

    const deleted = await Presentation.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        status: "fail",
        message: "Presentation not found.",
      });
    }

    return res.json({
      status: "success",
      message: "Presentation removed successfully.",
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
