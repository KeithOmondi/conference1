import mongoose, { Schema, Document } from "mongoose";

export interface IPresenter extends Document {
  name: string;
  title?: string; // e.g., Prof, Dr, Justice
  organization?: string; // e.g., ICJ Kenya
  bio?: string;
  photoUrl?: string;
  email?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    [key: string]: string | undefined; // allow other social links
  };
}

const SocialLinksSchema: Schema = new Schema(
  {
    twitter: { type: String },
    linkedin: { type: String },
  },
  { _id: false } // prevents creating a separate _id for this subdocument
);

const PresenterSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String },
    organization: { type: String },
    bio: { type: String },
    photoUrl: { type: String },
    email: { type: String },
    socialLinks: { type: Map, of: String }, // generic key-value map for flexibility
  },
  { timestamps: true }
);

export default mongoose.model<IPresenter>("Presenter", PresenterSchema);
