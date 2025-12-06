import { Schema, model, Document } from "mongoose";

// ---------- INTERFACES ----------
export interface IProgrammeItem {
  time?: string; // optional because sessions may not have time
  activity: string;
  facilitator?: string;
  isSession?: boolean; // NEW: identify session blocks
}

export interface IProgrammeDay extends Document {
  day: string;
  date: string;
  items: IProgrammeItem[];
}

// ---------- SCHEMAS ----------
const ProgrammeItemSchema = new Schema<IProgrammeItem>({
  time: { type: String }, // optional now
  activity: { type: String, required: true },
  facilitator: { type: String, default: "-" },
  isSession: { type: Boolean, default: false }, // NEW FIELD
});

const ProgrammeDaySchema = new Schema<IProgrammeDay>({
  day: { type: String, required: true },
  date: { type: String, required: true },
  items: { type: [ProgrammeItemSchema], required: true },
});

// ---------- MODEL ----------
const Programme = model<IProgrammeDay>("Programme", ProgrammeDaySchema);

export default Programme;
