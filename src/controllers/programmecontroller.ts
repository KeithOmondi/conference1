import { Request, Response } from "express";
import mongoose from "mongoose";
import ProgrammeDayModel from "../models/Programme";

/* =========================================================
   GET ALL PROGRAMME DAYS  (sorted by actual date)
   ========================================================= */
/* =========================================================
   GET ALL PROGRAMME DAYS (sorted by date)
   ========================================================= */
export const getProgramme = async (req: Request, res: Response) => {
  try {
    const programme = await ProgrammeDayModel.find()
      .sort({ date: 1 })
      .lean();

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



/* =========================================================
   GET PROGRAMME DAY BY ID OR BY dayLabel (e.g. "Day Two")
   ========================================================= */
/* =========================================================
   GET PROGRAMME DAY BY ID OR BY dayLabel ("Day One")
   ========================================================= */
export const getProgrammeByDay = async (req: Request, res: Response) => {
  try {
    const idOrDay = req.params.id;
    let programmeDay;

    if (mongoose.isValidObjectId(idOrDay)) {
      programmeDay = await ProgrammeDayModel.findById(idOrDay);
    } else {
      programmeDay = await ProgrammeDayModel.findOne({
        dayLabel: { $regex: new RegExp(`^${idOrDay}$`, "i") },
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

/* =========================================================
   CREATE PROGRAMME DAY
   Ensures nested sessions + activities are valid
   ========================================================= */
export const createProgrammeDay = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    if (!body.dayLabel || !body.date) {
      return res.status(400).json({
        success: false,
        message: "dayLabel and date are required",
      });
    }

    // Normalize arrays
    body.sessions = Array.isArray(body.sessions) ? body.sessions : [];

    const newDay = await ProgrammeDayModel.create(body);

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


/* =========================================================
   UPDATE PROGRAMME DAY
   Ensures nested structure integrity
   ========================================================= */
export const updateProgrammeDay = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    if (body.sessions && !Array.isArray(body.sessions)) {
      return res.status(400).json({
        success: false,
        message: "sessions must be an array",
      });
    }

    const updated = await ProgrammeDayModel.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Programme day not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updated,
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

/* =========================================================
   DELETE PROGRAMME DAY
   ========================================================= */
export const deleteProgrammeDay = async (req: Request, res: Response) => {
  try {
    const deleted = await ProgrammeDayModel.findByIdAndDelete(req.params.id);

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
