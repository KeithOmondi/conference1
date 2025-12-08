// src/controllers/documentController.ts
import { Request, Response } from "express";
import Documents from "../models/Documents";

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const { title, description, presenter, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Multer + CloudinaryStorage automatically uploads the file
    const fileUrl = (req.file as any).path;

    const doc = await Documents.create({
      title,
      description,
      presenter,
      category,
      fileUrl,
      fileType: (req.file as any).mimetype,
      fileSize: (req.file as any).size,
      originalName: (req.file as any).originalname,
    });

    res.status(201).json({
      message: "Document uploaded successfully",
      document: doc,
    });
  } catch (err) {
    console.error("Upload Document Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllDocuments = async (_req: Request, res: Response) => {
  try {
    const docs = await Documents.find().populate(
      "presenter",
      "firstName lastName email role"
    );
    res.status(200).json({ documents: docs });
  } catch (err) {
    console.error("Get Documents Error:", err);
    res.status(500).json({ message: "Failed to fetch documents" });
  }
};

export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const doc = await Documents.findById(req.params.id).populate(
      "presenter",
      "firstName lastName email role"
    );

    if (!doc) return res.status(404).json({ message: "Document not found" });

    res.status(200).json({ document: doc });
  } catch (err) {
    console.error("Get Document Error:", err);
    res.status(500).json({ message: "Failed to fetch document" });
  }
};

export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const doc = await Documents.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (err) {
    console.error("Delete Document Error:", err);
    res.status(500).json({ message: "Failed to delete document" });
  }
};
