import { Request, Response } from "express";
import Programme from "../models/Programme";
import mongoose from "mongoose";

// ---------------------------------------------------------
// GET ALL PROGRAMME DAYS
// ---------------------------------------------------------
export const getProgramme = async (req: Request, res: Response) => {
  try {
    const programme = await Programme.find().sort({ _id: 1 });

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
// GET SPECIFIC DAY BY ID OR DAY NAME
// ---------------------------------------------------------
export const getProgrammeByDay = async (req: Request, res: Response) => {
  try {
    const idOrDay = req.params.id;

    let programmeDay;
    if (mongoose.isValidObjectId(idOrDay)) {
      programmeDay = await Programme.findById(idOrDay);
    } else {
      programmeDay = await Programme.findOne({ day: idOrDay });
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
// ---------------------------------------------------------
export const createProgrammeDay = async (req: Request, res: Response) => {
  try {
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
// ---------------------------------------------------------
export const updateProgrammeDay = async (req: Request, res: Response) => {
  try {
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
