import { connectDB } from "./config/db";
import Programme from "./models/Programme";

const mongoose = require("mongoose");

// ---------------- DATABASE CONFIG ----------------
const MONGO_URI =
  "mongodb+srv://denniskeith62_db_user:keith.@cluster0.g4l2huj.mongodb.net/?appName=Cluster0"; // change this

// ---------------- PROGRAMME SEED DATA -------------

const programmeData = [
  {
    day: "Day One",
    date: "Sunday, 7th December 2025",
    items: [
      {
        time: "2:00PM",
        activity: "Travel & Check-in",
        facilitator: "Secretariat",
      },
    ],
  },

  {
    day: "Day Two",
    date: "Monday, 8th December 2025",
    items: [
      {
        time: "8:00–8:30AM",
        activity: "Registration of participants",
        facilitator: "Secretariat",
      },
      {
        time: "-",
        activity: "National Anthem / EAC Anthem / Prayer",
        facilitator: "Lady Justice Alice Bett",
      },

      {
        time: "8:30–9:45AM",
        activity: "Remarks - Chairperson ICJ Kenya (Ms Christine Alai)",
        facilitator: "-",
      },
      {
        time: "8:30–9:45AM",
        activity: "Remarks - Chairperson EACC (Bishop Dr. David Oginde)",
        facilitator: "-",
      },
      {
        time: "8:30–9:45AM",
        activity:
          "Remarks - Law Society of Kenya President (Ms Faith Odhiambo)",
        facilitator: "-",
      },
      {
        time: "8:30–9:45AM",
        activity: "Remarks - Chief Registrar (Hon. Winfrida Mokaya)",
        facilitator: "-",
      },
      {
        time: "8:30–9:45AM",
        activity: "Remarks - SCJLHR (Senator Hillary Sigei)",
        facilitator: "-",
      },
      {
        time: "8:30–9:45AM",
        activity: "Remarks - Principal Judge (Justice Eric Ogola)",
        facilitator: "-",
      },

      {
        time: "9:45–10:15AM",
        activity: "Keynote address & official opening by CJ Martha Koome",
        facilitator: "Chief Guest",
      },
      {
        time: "10:15–11:00AM",
        activity: "Photo Session & Health Break",
        facilitator: "-",
      },

      {
        time: "11:00AM–12:30PM",
        activity: "Presentation: Ethical Leadership – Mr Brian Kagoro",
        facilitator:
          "Session Chair: Justice Esther Maina / Justice Margaret Muigai",
      },
      { time: "12:30–1:00PM", activity: "Plenary Session", facilitator: "-" },
      {
        time: "1:00–2:00PM",
        activity: "Lunch Break",
        facilitator: "Lady Justice Lucy Njuguna",
      },

      {
        time: "2:00–3:00PM",
        activity: "Public Trust & Ethical Leadership – Prof Gabrielle Lynch",
        facilitator: "-",
      },
      {
        time: "3:00–3:30PM",
        activity: "Plenary Session",
        facilitator: "Justice Robert Limo",
      },

      {
        time: "3:30–4:30PM",
        activity: "Corruption Prevention Partnership",
        facilitator: "EACC",
      },
      { time: "4:30–5:00PM", activity: "Plenary Session", facilitator: "-" },
      {
        time: "5:00PM",
        activity: "Tea Break & End of Day Two",
        facilitator: "-",
      },
    ],
  },

  {
    day: "Day Three",
    date: "Tuesday, 9th December 2025",
    items: [
      {
        time: "8:30–9:00AM",
        activity: "Registration",
        facilitator: "Secretariat",
      },
      {
        time: "9:00–10:30AM",
        activity:
          "Ethical Reimagination of the 2010 Constitution – Mr Bobby Mkangi",
        facilitator: "Session Chair: Justice Edward Muriithi",
      },
      { time: "10:30–11:00AM", activity: "Plenary Session", facilitator: "-" },
      { time: "11:00–11:30AM", activity: "Tea Break", facilitator: "-" },
      {
        time: "11:30–12:30PM",
        activity: "Anti-Corruption Investigations – EACC Representative",
        facilitator: "Session Chair: Justice Florence Muchemi",
      },
      { time: "12:30–1:00PM", activity: "Plenary Session", facilitator: "-" },
      { time: "1:00–2:00PM", activity: "Lunch Break", facilitator: "-" },
      {
        time: "2:00–3:00PM",
        activity: "Tax & Debt Accountability – Mr Alexander Riithi",
        facilitator: "Session Chair: Justice Chacha Mwita",
      },
      { time: "3:00–3:30PM", activity: "Plenary Session", facilitator: "-" },
    ],
  },

  {
    day: "Day Four",
    date: "Wednesday, 10th December 2025",
    items: [
      {
        time: "8:00–8:30AM",
        activity: "Registration",
        facilitator: "Secretariat",
      },
      {
        time: "8:30–9:30AM",
        activity: "Effective Communication",
        facilitator: "DCRJ & Judiciary Spokesperson",
      },
      { time: "9:30–10:00AM", activity: "Plenary Session", facilitator: "-" },
      { time: "10:00–10:30AM", activity: "Tea Break", facilitator: "-" },
      {
        time: "11:00AM–1:00PM",
        activity: "Financial Wellness",
        facilitator: "Sheria Sacco",
      },
      { time: "1:00–2:00PM", activity: "Closing Ceremony", facilitator: "-" },
      { time: "2:00–3:00PM", activity: "Lunch", facilitator: "-" },
      {
        time: "3:00–4:00PM",
        activity: "Closed Door Session of High Court Judges",
        facilitator: "Session Chair: Justice Eric Ogola",
      },
      {
        time: "4:00PM",
        activity: "Tea Break & End of Day Four",
        facilitator: "-",
      },
    ],
  },

  {
    day: "Day Five",
    date: "Thursday, 11th December 2025",
    items: [
      {
        time: "9:00AM",
        activity: "Breakfast & Checkout",
        facilitator: "Secretariat",
      },
    ],
  },
];

// ----------------- SEED FUNCTION -------------------
async function seedProgramme() {
  try {
    console.log("Connecting to DB...");
    await connectDB(); // centralized connection, uses DB_NAME

    console.log("Clearing old programme...");
    await Programme.deleteMany({});

    console.log("Seeding new programme data...");
    await Programme.insertMany(programmeData);

    console.log("✅ Programme seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
}

seedProgramme();
