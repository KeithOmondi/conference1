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

  // ----------------------------------------------------
  {
    day: "Day Two",
    date: "Monday, 8th December 2025",
    items: [
      // SESSION ONE
      {
        time: "-",
        activity: "SESSION ONE",
        facilitator: "Session Chair: Duncan Okello, KJA",
      },

      {
        time: "8:00–8:30AM",
        activity: "Registration of participants",
        facilitator: "Secretariat",
      },

      {
        time: "8:30–9:00AM",
        activity: "National Anthem / EAC Anthem / Prayer",
        facilitator: "Session Chair / Lady Justice Alice Bett",
      },

      {
        time: "9:00–10:00AM",
        activity:
          "Framing Presentation: Ethical Leadership & the Politics of Human Dignity – Lessons for Judiciaries in Africa",
        facilitator: "Mr. Brian Kagoro",
      },

      { time: "10:00–11:00AM", activity: "Plenary Session", facilitator: "-" },

      { time: "11:00–11:30AM", activity: "Tea Break", facilitator: "-" },

      // Remarks section
      {
        time: "11:30AM–12:30PM",
        activity: "Remarks",
        facilitator:
          "ICJ Chair (Christine Alai), KNCHR Chair (Claris Ogangah), EACC (Rep), LSK President (Faith Odhiambo), Chief Registrar (Hon. Winfrida Mokaya), Principal Judge (Justice Eric Ogola)",
      },

      {
        time: "12:30–1:00PM",
        activity:
          "Keynote Address & Official Opening by the Chief Guest – Senator Hillary Sigei, CBS, MP (Chairperson, Senate JLAC Committee)",
        facilitator: "-",
      },

      {
        time: "1:00–2:00PM",
        activity: "Photo Session & Lunch Break",
        facilitator: "-",
      },

      // SESSION TWO
      {
        time: "-",
        activity: "SESSION TWO",
        facilitator: "Session Chair: Lady Justice Esther Maina",
      },

      {
        time: "2:00–3:00PM",
        activity:
          "Public Trust & Ethical Leadership in Kenya’s Courts: Evidence from Two Decades of Data",
        facilitator: "Prof. Gabrielle Lynch",
      },

      { time: "3:00–3:30PM", activity: "Plenary Session", facilitator: "-" },

      {
        time: "3:30–4:00PM",
        activity: "Partnership with the Judiciary on Corruption Prevention",
        facilitator: "Ms. Judith Langat",
      },

      {
        time: "4:00PM",
        activity: "Tea Break & End of Day Two",
        facilitator: "-",
      },
    ],
  },

  // ----------------------------------------------------
  {
    day: "Day Three",
    date: "Tuesday, 9th December 2025",
    items: [
      // SESSION THREE
      {
        time: "-",
        activity: "SESSION THREE",
        facilitator: "Session Chair: Justice Robert Limo",
      },

      {
        time: "8:30–9:00AM",
        activity: "Registration of participants",
        facilitator: "Secretariat",
      },

      {
        time: "9:00–10:30AM",
        activity:
          "The Ethical Reimagination of the 2010 Constitution: Unfinished Business of Chapter 6",
        facilitator: "Mr. Bobby Mkangi",
      },

      { time: "10:30–11:00AM", activity: "Plenary Session", facilitator: "-" },

      { time: "11:00–11:30AM", activity: "Tea Break", facilitator: "-" },

      // SESSION FOUR
      {
        time: "-",
        activity: "SESSION FOUR",
        facilitator: "Session Chair: Lady Justice Florence Muchemi",
      },

      {
        time: "11:30–12:30PM",
        activity:
          "Emerging Jurisprudence: Impact on Implementation of Ethics & Integrity Requirements",
        facilitator: "Mr. Patrick Owiny",
      },

      { time: "12:30–1:00PM", activity: "Plenary Session", facilitator: "-" },

      { time: "1:00–2:00PM", activity: "Lunch Break", facilitator: "-" },

      // SESSION FIVE
      {
        time: "-",
        activity: "SESSION FIVE",
        facilitator: "Session Chair: Lady Justice Lucy Njuguna",
      },

      {
        time: "2:00–4:00PM",
        activity:
          "Panel on Ethical Leadership in Public Finance: Human Rights Dimensions of Taxation & Debt Management",
        facilitator: "Mr. Alexander Riithi",
      },

      {
        time: "4:00PM",
        activity: "Tea Break & End of Day Three",
        facilitator: "-",
      },
    ],
  },

  // ----------------------------------------------------
  {
    day: "Day Four",
    date: "Wednesday, 10th December 2025",
    items: [
      // SESSION SIX
      {
        time: "-",
        activity: "SESSION SIX",
        facilitator: "Session Chair: Lady Justice Helene Namisi",
      },

      {
        time: "8:30–9:00AM",
        activity: "Registration of participants",
        facilitator: "Secretariat",
      },

      {
        time: "9:00–10:00AM",
        activity:
          "Driving Excellence in the High Court: Understanding KPIs, Timelines & Performance Expectations under STAJ",
        facilitator: "Dr. Joseph Osewe",
      },

      { time: "10:00–10:30AM", activity: "Plenary Session", facilitator: "-" },

      { time: "10:30–11:00AM", activity: "Tea Break", facilitator: "-" },

      // SESSION SEVEN
      {
        time: "-",
        activity: "SESSION SEVEN",
        facilitator: "Session Chair: Justice Francis Gikonyo",
      },

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
        facilitator:
          "PS, Internal Security (Dr. Raymond Omollo) / Principal Judge (Justice Eric Ogola)",
      },

      {
        time: "1:00–2:00PM",
        activity:
          "Address & Official Closing by Lady Justice Martha Koome – Chief Justice & President of the Supreme Court",
        facilitator: "-",
      },

      // SESSION EIGHT
      {
        time: "-",
        activity: "SESSION EIGHT",
        facilitator: "Session Chair: Justice Eric Ogola",
      },

      {
        time: "2:00–4:00PM",
        activity:
          "Reassessing Our Impact: Judicial Reflection & Strategic Reorientation (Closed Door – High Court Judges)",
        facilitator: "-",
      },

      {
        time: "4:00PM",
        activity: "Tea Break & End of Day Four",
        facilitator: "-",
      },
    ],
  },

  // ----------------------------------------------------
  {
    day: "Day Five",
    date: "Thursday, 11th December 2025",
    items: [
      {
        time: "9:00AM",
        activity: "Breakfast & Checkout",
        facilitator: "Secretariat",
      },
      { time: "1:00–2:00PM", activity: "Lunch", facilitator: "-" },
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
