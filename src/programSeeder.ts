import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import ProgrammeDayModel from "./models/Programme";
import { env } from "./config/env";

// ----------------- CONNECT TO DB -----------------
async function connectDB() {
  try {
    if (!env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is missing in .env");
    }

    await mongoose.connect(env.MONGO_URI, {
      dbName: env.DB_NAME,
    });

    console.log(`✅ Connected to MongoDB → ${env.DB_NAME}`);
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    process.exit(1);
  }
}

// ----------------- SEED DATA -----------------
const programmeData = [
  {
    dayLabel: "Day One",
    date: new Date("2025-12-07"),
    sessions: [
      {
        title: "Check-In",
        chair: null,
        activities: [
          {
            time: "2:00PM",
            activity: "Travel & Check-in",
            facilitator: "Secretariat",
          },
        ],
      },
    ],
  },
  {
    dayLabel: "Day Two",
    date: new Date("2025-12-08"),
    sessions: [
      {
        title: "SESSION ONE",
        chair: "Duncan Okello, KJA",
        activities: [
          { time: "8:00–8:30AM", activity: "Registration of participants", facilitator: "Secretariat" },
          { time: "8:30–9:00AM", activity: "National Anthem / EAC Anthem / Prayer", facilitator: "Session Chair / Lady Justice Alice Bett" },
          {
            time: "9:00–10:00AM",
            activity: "Framing Presentation: Ethical Leadership & the Politics of Human Dignity – Lessons for Judiciaries in Africa",
            facilitator: "Mr. Brian Kagoro",
          },
          { time: "10:00–11:00AM", activity: "Plenary Session", facilitator: "-" },
          { time: "11:00–11:30AM", activity: "Tea Break", facilitator: "-" },
          {
            time: "11:30AM–12:30PM",
            activity: "Remarks",
            facilitator:
              "ICJ Chair (Christine Alai), KNCHR Chair (Claris Ogangah), EACC (Rep), LSK President (Faith Odhiambo), Chief Registrar (Hon. Winfrida Mokaya), Principal Judge (Justice Eric Ogola)",
          },
          {
            time: "12:30–1:00PM",
            activity: "Keynote Address & Official Opening by the Chief Guest – Senator Hillary Sigei, CBS, MP (Chairperson, Senate JLAC Committee)",
            facilitator: "-",
          },
          { time: "1:00–2:00PM", activity: "Photo Session & Lunch Break", facilitator: "-" },
        ],
      },
      {
        title: "SESSION TWO",
        chair: "Lady Justice Esther Maina",
        activities: [
          {
            time: "2:00–3:00PM",
            activity: "Public Trust & Ethical Leadership in Kenya’s Courts: Evidence from Two Decades of Data",
            facilitator: "Prof. Gabrielle Lynch",
          },
          { time: "3:00–3:30PM", activity: "Plenary Session", facilitator: "-" },
          {
            time: "3:30–4:00PM",
            activity: "Partnership with the Judiciary on Corruption Prevention",
            facilitator: "Ms. Judith Langat",
          },
          { time: "4:00PM", activity: "Tea Break & End of Day Two", facilitator: "-" },
        ],
      },
    ],
  },
  {
    dayLabel: "Day Three",
    date: new Date("2025-12-09"),
    sessions: [
      {
        title: "SESSION THREE",
        chair: "Justice Robert Limo",
        activities: [
          { time: "8:30–9:00AM", activity: "Registration of participants", facilitator: "Secretariat" },
          {
            time: "9:00–10:30AM",
            activity: "The Ethical Reimagination of the 2010 Constitution: Unfinished Business of Chapter 6",
            facilitator: "Mr. Bobby Mkangi",
          },
          { time: "10:30–11:00AM", activity: "Plenary Session", facilitator: "-" },
          { time: "11:00–11:30AM", activity: "Tea Break", facilitator: "-" },
        ],
      },
      {
        title: "SESSION FOUR",
        chair: "Lady Justice Florence Muchemi",
        activities: [
          {
            time: "11:30–12:30PM",
            activity: "Emerging Jurisprudence: Impact on Implementation of Ethics & Integrity Requirements",
            facilitator: "Mr. Patrick Owiny",
          },
          { time: "12:30–1:00PM", activity: "Plenary Session", facilitator: "-" },
          { time: "1:00–2:00PM", activity: "Lunch Break", facilitator: "-" },
        ],
      },
      {
        title: "SESSION FIVE",
        chair: "Lady Justice Lucy Njuguna",
        activities: [
          {
            time: "2:00–4:00PM",
            activity:
              "Panel on Ethical Leadership in Public Finance: Human Rights Dimensions of Taxation & Debt Management",
            facilitator: "Mr. Alexander Riithi",
          },
          { time: "4:00PM", activity: "Tea Break & End of Day Three", facilitator: "-" },
        ],
      },
    ],
  },
  {
    dayLabel: "Day Four",
    date: new Date("2025-12-10"),
    sessions: [
      {
        title: "SESSION SIX",
        chair: "Lady Justice Helene Namisi",
        activities: [
          { time: "8:30–9:00AM", activity: "Registration of participants", facilitator: "Secretariat" },
          {
            time: "9:00–10:00AM",
            activity:
              "Driving Excellence in the High Court: Understanding KPIs, Timelines & Performance Expectations under STAJ",
            facilitator: "Dr. Joseph Osewe",
          },
          { time: "10:00–10:30AM", activity: "Plenary Session", facilitator: "-" },
          { time: "10:30–11:00AM", activity: "Tea Break", facilitator: "-" },
        ],
      },
      {
        title: "SESSION SEVEN",
        chair: "Justice Francis Gikonyo",
        activities: [
          {
            time: "11:00–12:00PM",
            activity:
              "Enhancing Public Trust through Communication: Judges’ Roles in Advancing STAJ & the Right to Information",
            facilitator: "Hon. Paul N. Maina",
          },
          { time: "12:00–12:30PM", activity: "Plenary Session", facilitator: "-" },
          {
            time: "12:30–1:00PM",
            activity: "Remarks",
            facilitator: "PS, Internal Security (Dr. Raymond Omollo) / Principal Judge (Justice Eric Ogola)",
          },
          {
            time: "1:00–2:00PM",
            activity:
              "Address & Official Closing by Lady Justice Martha Koome – Chief Justice & President of the Supreme Court",
            facilitator: "-",
          },
        ],
      },
      {
        title: "SESSION EIGHT",
        chair: "Justice Eric Ogola",
        activities: [
          {
            time: "2:00–4:00PM",
            activity:
              "Reassessing Our Impact: Judicial Reflection & Strategic Reorientation (Closed Door – High Court Judges)",
            facilitator: "-",
          },
          { time: "4:00PM", activity: "Tea Break & End of Day Four", facilitator: "-" },
        ],
      },
    ],
  },
  {
    dayLabel: "Day Five",
    date: new Date("2025-12-11"),
    sessions: [
      {
        title: "Checkout",
        chair: null,
        activities: [
          { time: "9:00AM", activity: "Breakfast & Checkout", facilitator: "Secretariat" },
          { time: "1:00–2:00PM", activity: "Lunch", facilitator: "-" },
        ],
      },
    ],
  },
];

// ----------------- SEED FUNCTION -----------------
async function seedProgramme() {
  try {
    await connectDB();

    console.log("🔄 Clearing old programme...");
    await ProgrammeDayModel.deleteMany({});

    console.log("📥 Seeding new programme data...");
    await ProgrammeDayModel.insertMany(programmeData);

    console.log("✅ Programme seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
}

seedProgramme();
