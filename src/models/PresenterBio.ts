import { Schema, model, Document } from "mongoose";

export interface IPresenterBio extends Document {
  name: string;
  title?: string;
  description: string;
  image?: {
    url: string;
    public_id?: string;
  };
  createdAt: Date;
}

const PresenterBioSchema = new Schema<IPresenterBio>(
  {
    name: { type: String, required: true },
    title: { type: String },
    description: { type: String, required: true },
    image: {
      url: { type: String },
      public_id: { type: String },
    },
  },
  { timestamps: true }
);

export default model<IPresenterBio>("PresenterBio", PresenterBioSchema);
