import { Request, Response } from "express";
import Presentation from "../models/Presentation";
import User from "../models/User";

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
// GET ALL — Admin sees all presentations
// -------------------------------------------------------------
export const getAllPresentations = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ status: "fail", message: "Only admins can view all presentations." });
    }

    const presentations = await Presentation.find()
      .populate("presenter", "firstName lastName email pj")
      .populate("uploadedBy", "firstName lastName email");

    return res.json({
      status: "success",
      presentations,
    });
  } catch (error: any) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

// -------------------------------------------------------------
// GET MINE — Judge sees only their presentations
// -------------------------------------------------------------
export const getMyPresentations = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    const presentations = await Presentation.find({
      presenter: req.user._id,
    });

    return res.json({
      status: "success",
      presentations,
    });
  } catch (error: any) {
    return res.status(500).json({ status: "error", message: error.message });
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
