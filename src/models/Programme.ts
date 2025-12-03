import { Schema, model, Document } from "mongoose";

// ---------- INTERFACES ----------
export interface IProgrammeItem {
  time: string;
  activity: string;
  facilitator?: string;
}

export interface IProgrammeDay extends Document {
  day: string;
  date: string;
  items: IProgrammeItem[];
}

// ---------- SCHEMAS ----------
const ProgrammeItemSchema = new Schema<IProgrammeItem>({
  time: { type: String, required: true },
  activity: { type: String, required: true },
  facilitator: { type: String, default: "-" },
});

const ProgrammeDaySchema = new Schema<IProgrammeDay>({
  day: { type: String, required: true },
  date: { type: String, required: true },
  items: { type: [ProgrammeItemSchema], required: true },
});

// ---------- MODEL ----------
const Programme = model<IProgrammeDay>("Programme", ProgrammeDaySchema);

export default Programme;
