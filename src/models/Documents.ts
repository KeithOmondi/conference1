// src/models/Document.ts
import mongoose, { Schema, Document as MongooseDocument } from "mongoose";

export interface IDocument extends MongooseDocument {
  title: string;
  description?: string;
  fileUrl: string; // URL to the uploaded file (S3, Cloudinary, local, etc.)
  fileType?: string; // pdf, docx, pptx, image, etc.
  fileSize?: number; // in bytes
  originalName?: string; // original filename from uploader

  presenter: mongoose.Types.ObjectId; // who owns it
  category?: string; // slides, research, judgement, notes...

  isArchived?: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      default: "",
    },

    fileSize: {
      type: Number,
      default: 0,
    },

    originalName: {
      type: String,
      default: "",
    },

    presenter: {
      type: Schema.Types.ObjectId,
      ref: "User", // or "Presenter" depending on your project
      required: false,
    },

    category: {
      type: String,
      enum: ["slides", "report", "notes", "research", "judgment", "other"],
      default: "other",
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Optional indexes for faster searches
DocumentSchema.index({ presenter: 1 });
DocumentSchema.index({ category: 1 });

export default mongoose.model<IDocument>("Document", DocumentSchema);
