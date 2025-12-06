// src/models/ProgrammeDay.ts
import mongoose, { Schema, Document, Model } from "mongoose";

/* ----------------------------------------------
   Activity Subdocument
   ---------------------------------------------- */
export interface IActivity {
  time: string;
  activity: string;
  facilitator?: string;
}

/* ----------------------------------------------
   Session Subdocument
   ---------------------------------------------- */
export interface ISession {
  title: string;
  chair?: string;
  activities: IActivity[];
}

/* ----------------------------------------------
   Programme Day (Root Document)
   ---------------------------------------------- */
export interface IProgrammeDay {
  dayLabel: string; // e.g., "Day Two"
  date: Date;       // stored as Date object (ISO string)
  sessions: ISession[];
  createdAt?: Date;
  updatedAt?: Date;
}

/* ----------------------------------------------
   Mongoose Document Type
   ---------------------------------------------- */
export interface ProgrammeDayDocument extends IProgrammeDay, Document {}

/* ----------------------------------------------
   Activity Schema
   ---------------------------------------------- */
const ActivitySchema = new Schema<IActivity>(
  {
    time: { type: String, required: true },
    activity: { type: String, required: true },
    facilitator: { type: String, default: "" },
  },
  { _id: false }
);

/* ----------------------------------------------
   Session Schema
   ---------------------------------------------- */
const SessionSchema = new Schema<ISession>(
  {
    title: { type: String, required: true },
    chair: { type: String, default: "" },
    activities: { type: [ActivitySchema], default: [] },
  },
  { _id: false }
);

/* ----------------------------------------------
   Programme Day Schema
   ---------------------------------------------- */
const ProgrammeDaySchema = new Schema<ProgrammeDayDocument>(
  {
    dayLabel: { type: String, required: true },
    date: { type: Date, required: true },
    sessions: { type: [SessionSchema], default: [] },
  },
  { timestamps: true }
);

/* ----------------------------------------------
   Model
   ---------------------------------------------- */
const ProgrammeDayModel: Model<ProgrammeDayDocument> =
  mongoose.models.ProgrammeDay ||
  mongoose.model<ProgrammeDayDocument>("ProgrammeDay", ProgrammeDaySchema);

export default ProgrammeDayModel;
