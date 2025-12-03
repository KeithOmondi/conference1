import { Request, Response } from "express";
import Presenter, { IPresenter } from "../models/Presenter";

// ---------------------------------------------------------
// GET ALL PRESENTERS
// ---------------------------------------------------------
export const getPresenters = async (req: Request, res: Response) => {
  try {
    const presenters = await Presenter.find().sort({ name: 1 });
    return res.status(200).json({
      success: true,
      count: presenters.length,
      data: presenters,
    });
  } catch (error: any) {
    console.error("Get Presenters Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch presenters",
      error: error.message,
    });
  }
};

// ---------------------------------------------------------
// GET SINGLE PRESENTER BY ID
// ---------------------------------------------------------
export const getPresenterById = async (req: Request, res: Response) => {
  try {
    const presenter = await Presenter.findById(req.params.id);
    if (!presenter) {
      return res.status(404).json({
        success: false,
        message: "Presenter not found",
      });
    }
    return res.status(200).json({ success: true, data: presenter });
  } catch (error: any) {
    console.error("Get Presenter Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch presenter",
      error: error.message,
    });
  }
};

// ---------------------------------------------------------
// CREATE NEW PRESENTER
// ---------------------------------------------------------
export const createPresenter = async (req: Request, res: Response) => {
  try {
    const newPresenter = await Presenter.create(req.body);
    return res.status(201).json({ success: true, data: newPresenter });
  } catch (error: any) {
    console.error("Create Presenter Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create presenter",
      error: error.message,
    });
  }
};

// ---------------------------------------------------------
// UPDATE PRESENTER
// ---------------------------------------------------------
export const updatePresenter = async (req: Request, res: Response) => {
  try {
    const updatedPresenter = await Presenter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPresenter) {
      return res.status(404).json({
        success: false,
        message: "Presenter not found",
      });
    }

    return res.status(200).json({ success: true, data: updatedPresenter });
  } catch (error: any) {
    console.error("Update Presenter Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update presenter",
      error: error.message,
    });
  }
};

// ---------------------------------------------------------
// DELETE PRESENTER
// ---------------------------------------------------------
export const deletePresenter = async (req: Request, res: Response) => {
  try {
    const deleted = await Presenter.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Presenter not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Presenter deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete Presenter Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete presenter",
      error: error.message,
    });
  }
};
