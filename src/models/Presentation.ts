import mongoose, { Schema, Document } from "mongoose";

export interface IPresentation extends Document {
  title: string;
  description?: string;
  fileUrl: string;          // URL to PDF, PowerPoint, Images, Flipbook assets, etc.
  presenter: mongoose.Types.ObjectId; // Reference to User
  uploadedBy: mongoose.Types.ObjectId; // Admin user who uploaded it
  visibility: "public" | "private";
}

const presentationSchema = new Schema<IPresentation>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    presenter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // 🚀 PRESENTATION MUST BE LINKED TO A USER
      index: true,
    },

    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // The admin uploading
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPresentation>(
  "Presentation",
  presentationSchema
);
