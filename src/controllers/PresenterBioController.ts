import { Request, Response } from "express";
import PresenterBio from "../models/PresenterBio";

class PresenterBioController {
  // CREATE
  async create(req: Request, res: Response) {
    try {
      const { name, title, description } = req.body;

      const image = req.file
        ? {
            url: (req as any).file.path, // 🌟 This is the actual Cloudinary URL
            public_id: (req as any).file.filename, // 🌟 This is Cloudinary public_id
          }
        : undefined;

      const bio = await PresenterBio.create({
        name,
        title,
        description,
        image,
      });

      res.status(201).json({ success: true, bio });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET ALL
  async getAll(req: Request, res: Response) {
    try {
      const bios = await PresenterBio.find().sort({ createdAt: -1 });
      res.json({ success: true, bios });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET ONE
  async getOne(req: Request, res: Response) {
    try {
      const bio = await PresenterBio.findById(req.params.id);
      if (!bio)
        return res.status(404).json({ success: false, message: "Not found" });

      res.json({ success: true, bio });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // UPDATE
  async update(req: Request, res: Response) {
    try {
      const updateData: any = { ...req.body };

      if (req.file) {
        updateData.image = {
          url: (req as any).file.path,
          public_id: (req as any).file.filename,
        };
      }

      const updated = await PresenterBio.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updated)
        return res.status(404).json({ success: false, message: "Not found" });

      res.json({ success: true, updated });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // DELETE
  async delete(req: Request, res: Response) {
    try {
      const deleted = await PresenterBio.findByIdAndDelete(req.params.id);
      if (!deleted)
        return res.status(404).json({ success: false, message: "Not found" });

      res.json({ success: true, message: "Presenter deleted" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new PresenterBioController();
