import { Request, Response } from "express";
import Documents from "../models/Documents";
import cloudinary from "../config/cloudinary";
import streamifier from "streamifier"; // make sure it's default import
import { generateSignedPdfUrl } from "../utils/cloudinaryUtils";

// ------------------ UPLOAD DOCUMENT (PRIVATE) ------------------
export const uploadDocument = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;
    const originalName = file.originalname.replace(/\.[^/.]+$/, "");

    // Upload stream to Cloudinary (private)
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "documents",
        public_id: originalName,
        resource_type: "raw",      // PDFs/docs
        format: "pdf",
        type: "authenticated",     // private URL
        access_mode: "authenticated",
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res.status(500).json({ message: "Failed to upload file" });
        }

        const doc = await Documents.create({
          title: req.body.title,
          description: req.body.description,
          presenter: req.body.presenter,
          category: req.body.category,
          fileUrl: result?.public_id, // store public_id instead of secure URL
          fileType: file.mimetype,
          fileSize: file.size,
          originalName: file.originalname,
        });

        res.status(201).json({
          message: "Document uploaded successfully",
          document: doc,
        });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  } catch (err) {
    console.error("Upload Document Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ------------------ GET ALL DOCUMENTS ------------------
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

// ------------------ GET SIGNED DOCUMENT URL ------------------
export const getDocumentUrl = async (req: Request, res: Response) => {
  try {
    const doc = await Documents.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    // Generate signed URL valid for 10 minutes
    const signedUrl = generateSignedPdfUrl(doc.fileUrl, 600);

    res.status(200).json({ url: signedUrl });
  } catch (err) {
    console.error("Get Document URL Error:", err);
    res.status(500).json({ message: "Failed to generate document URL" });
  }
};

// ------------------ DELETE DOCUMENT ------------------
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const doc = await Documents.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    // Optionally delete from Cloudinary
    await cloudinary.uploader.destroy(doc.fileUrl, { resource_type: "raw", type: "authenticated" });

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (err) {
    console.error("Delete Document Error:", err);
    res.status(500).json({ message: "Failed to delete document" });
  }
};
