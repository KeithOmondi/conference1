import { Request, Response } from "express";
import Programme from "../models/Programme";
import mongoose from "mongoose";

// ---------------------------------------------------------
// GET ALL PROGRAMME DAYS  (sorted by actual date, not _id)
// ---------------------------------------------------------
export const getProgramme = async (req: Request, res: Response) => {
  try {
    const programme = await Programme.find()
      .sort({ date: 1 }) // ensure correct chronological order
      .lean(); // faster and cleaner results

    return res.status(200).json({
      success: true,
      count: programme.length,
      data: programme,
    });
  } catch (error: any) {
    console.error("Programme Fetch Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch programme",
      error: error.message,
    });
  }
};

// ---------------------------------------------------------
// GET SPECIFIC PROGRAMME DAY (by ID or Day name)
// Case-insensitive day name search
// ---------------------------------------------------------
export const getProgrammeByDay = async (req: Request, res: Response) => {
  try {
    const idOrDay = req.params.id;

    let programmeDay;

    if (mongoose.isValidObjectId(idOrDay)) {
      programmeDay = await Programme.findById(idOrDay);
    } else {
      programmeDay = await Programme.findOne({
        day: { $regex: new RegExp(`^${idOrDay}$`, "i") }, // case-insensitive
      });
    }

    if (!programmeDay) {
      return res.status(404).json({
        success: false,
        message: "Programme day not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: programmeDay,
    });
  } catch (error: any) {
    console.error("Get Programme Day Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch programme day",
      error: error.message,
    });
  }
};

// ---------------------------------------------------------
// CREATE NEW PROGRAMME DAY
// Automatically normalizes session entries
// ---------------------------------------------------------
export const createProgrammeDay = async (req: Request, res: Response) => {
  try {
    // Clean items: if isSession = true, remove time field
    if (Array.isArray(req.body.items)) {
      req.body.items = req.body.items.map((item: any) => ({
        ...item,
        time: item.isSession ? undefined : item.time,
      }));
    }

    const newDay = await Programme.create(req.body);

    return res.status(201).json({
      success: true,
      data: newDay,
    });
  } catch (error: any) {
    console.error("Programme Create Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create programme day",
      error: error.message,
    });
  }
};

// ---------------------------------------------------------
// UPDATE PROGRAMME DAY
// Also ensures sessions never have a time accidentally
// ---------------------------------------------------------
export const updateProgrammeDay = async (req: Request, res: Response) => {
  try {
    if (req.body.items && Array.isArray(req.body.items)) {
      req.body.items = req.body.items.map((item: any) => ({
        ...item,
        time: item.isSession ? undefined : item.time,
      }));
    }

    const programmeDay = await Programme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!programmeDay) {
      return res.status(404).json({
        success: false,
        message: "Programme day not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: programmeDay,
    });
  } catch (error: any) {
    console.error("Programme Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update programme day",
      error: error.message,
    });
  }
};

// ---------------------------------------------------------
// DELETE PROGRAMME DAY
// ---------------------------------------------------------
export const deleteProgrammeDay = async (req: Request, res: Response) => {
  try {
    const deleted = await Programme.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Programme day not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Programme day deleted successfully",
    });
  } catch (error: any) {
    console.error("Programme Delete Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete programme day",
      error: error.message,
    });
  }
};
