// src/models/Document.ts
import mongoose, { Schema, Document as MongooseDocument } from "mongoose";

export interface IDocument extends MongooseDocument {
  title: string;
  description?: string;
  fileUrl: string;
  fileType?: string;
  fileSize?: number;
  originalName?: string;

  presenter: mongoose.Types.ObjectId;
  category?: string;

  isArchived?: boolean;

  viewCount: number;       // NEW
  downloadCount: number;   // NEW

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
      ref: "User",
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

    // -----------------------------------------
    // NEW FIELDS
    // -----------------------------------------
    viewCount: {
      type: Number,
      default: 0,
    },

    downloadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Optional indexes
DocumentSchema.index({ presenter: 1 });
DocumentSchema.index({ category: 1 });

export default mongoose.model<IDocument>("Document", DocumentSchema);
