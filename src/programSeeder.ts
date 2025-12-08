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
  // ---------------- DAY ONE ----------------
  {
    dayLabel: "Day One",
    date: new Date("2025-12-07"),
    sessions: [
      {
        title: "DAY ONE",
        chair: null,
        activities: [
          {
            time: "2.00PM",
            activity: "Travel & Check-in",
            facilitator: "Secretariat",
          },
        ],
      },
    ],
  },

  // ---------------- DAY TWO ----------------
  {
    dayLabel: "Day Two",
    date: new Date("2025-12-08"),
    sessions: [
      {
        title: "SESSION ONE",
        chair: "Duncan Okello, KJA",
        activities: [
          { time: "8.00–8.30AM", activity: "Registration of participants", facilitator: "Secretariat" },
          { time: "8.30–9.00AM", activity: "National Anthem / EAC Anthem / Prayer", facilitator: "Session Chair / Lady Justice Alice Bett" },
          {
            time: "9.00–10.00AM",
            activity:
              "Framing Presentation: Ethical Leadership and the Politics of Human Dignity: Lessons for Judiciaries in Africa",
            facilitator: "Mr. Brian Kagoro",
          },
          { time: "10.00–11.00AM", activity: "Plenary session", facilitator: "-" },
          { time: "11.00–11.30AM", activity: "Tea Break", facilitator: "-" },

          {
            time: "11.30AM–12.30PM",
            activity: "Remarks",
            facilitator:
              "Ms. Christine Alai (ICJ Kenya); FCPA John Lolkoloi, OGW (EACC); Ms. Faith Odhiambo (LSK President); Hon. Winfrida Mokaya, CBS (Chief Registrar); Justice Eric Ogola, EBS (Principal Judge)",
          },

          {
            time: "12.30–1.00PM",
            activity: "Keynote Address & Official Opening by Chief Guest Senator Wakili Hillary Sigei, CBS, MP (Chairperson, Senate Standing Committee on Justice, Legal Affairs & Human Rights)",
            facilitator: "-",
          },

          { time: "1.00–2.00PM", activity: "Photo Session and Lunch Break", facilitator: "-" },
        ],
      },

      {
        title: "SESSION TWO",
        chair: "Lady Justice Esther Maina",
        activities: [
          {
            time: "2.00–3.00PM",
            activity:
              "Public Trust and Ethical Leadership in Kenya’s Courts: Evidence from two decades of data",
            facilitator: "Prof. Gabrielle Lynch",
          },
          { time: "3.00–3.30PM", activity: "Plenary session", facilitator: "-" },
          {
            time: "3.30–4.00PM",
            activity: "Partnership with the Judiciary on Corruption Prevention",
            facilitator: "Ms. Judith Langat",
          },
          { time: "4.00PM", activity: "Tea Break and End of Day Two", facilitator: "-" },
        ],
      },
    ],
  },

  // ---------------- DAY THREE ----------------
  {
    dayLabel: "Day Three",
    date: new Date("2025-12-09"),
    sessions: [
      {
        title: "SESSION THREE",
        chair: "Mr. Justice Robert Limo",
        activities: [
          { time: "8.30–9.00AM", activity: "Registration of participants", facilitator: "Secretariat" },
          {
            time: "9.00–10.30AM",
            activity:
              "The Ethical Reimagination of the 2010 Constitution: Unfinished Business of Chapter 6",
            facilitator: "Mr. Bobby Mkangi",
          },
          { time: "10.30–11.00AM", activity: "Plenary session", facilitator: "-" },
          { time: "11.00–11.30AM", activity: "Tea Break", facilitator: "-" },
        ],
      },

      {
        title: "SESSION FOUR",
        chair: "Lady Justice Florence Muchemi",
        activities: [
          {
            time: "11.30–12.30PM",
            activity:
              "Emerging Jurisprudence: Impact on Implementation of Ethics and Integrity Requirements",
            facilitator: "Mr. Patrick Owiny",
          },
          { time: "12.30–1.00PM", activity: "Plenary Session", facilitator: "-" },
          { time: "1.00–2.00PM", activity: "Lunch Break", facilitator: "-" },
        ],
      },

      {
        title: "SESSION FIVE",
        chair: "Lady Justice Lucy Njuguna",
        activities: [
          {
            time: "2.00–4.00PM",
            activity:
              "Panel on Ethical Leadership in Public Finance: Human Rights Dimensions of Taxation and Debt Management",
            facilitator: "Ms. Diana Gichengo; Ms. Beverly Musili; Mr. Alexander Riithi",
          },
          { time: "4.00PM", activity: "Tea Break and End of Day Three", facilitator: "-" },
        ],
      },
    ],
  },

  // ---------------- DAY FOUR ----------------
  {
    dayLabel: "Day Four",
    date: new Date("2025-12-10"),
    sessions: [
      {
        title: "SESSION SIX",
        chair: "Lady Justice Helene Namisi",
        activities: [
          { time: "8.30–9.00AM", activity: "Registration of participants", facilitator: "Secretariat" },
          {
            time: "9.00–10.00AM",
            activity:
              "Driving Excellence in the High Court: Understanding KPIs, Timelines, and Performance Expectations under STAJ",
            facilitator: "Dr. Joseph Osewe",
          },
          { time: "10.00–10.30AM", activity: "Plenary session", facilitator: "-" },
          { time: "10.30–11.00AM", activity: "Tea Break", facilitator: "-" },
        ],
      },

      {
        title: "SESSION SEVEN",
        chair: "Mr. Justice Francis Gikonyo",
        activities: [
          {
            time: "11.00–12.00PM",
            activity:
              "Enhancing Public Trust through Communication: Judges’ Roles in Advancing STAJ and Fulfilling the Right to Information",
            facilitator: "Hon. Paul N. Maina",
          },
          { time: "12.00–12.30PM", activity: "Plenary Session", facilitator: "-" },

          {
            time: "12.30–1.00PM",
            activity: "Remarks",
            facilitator:
              "Dr. Raymond Omollo, PhD, CBS (PS, Internal Security); Justice Eric Ogola, EBS (Principal Judge)",
          },

          {
            time: "1.00–2.00PM",
            activity:
              "Address and Official Closing by Lady Justice Martha Koome, EGH – Chief Justice & President of the Supreme Court of Kenya",
            facilitator: "-",
          },
        ],
      },

      {
        title: "SESSION EIGHT",
        chair: "Mr. Justice Eric Ogola",
        activities: [
          {
            time: "2.00–4.00PM",
            activity:
              "Reassessing Our Impact: Judicial Reflection and Strategic Reorientation for Improved Service Delivery under STAJ (Closed door session of High Court Judges)",
            facilitator: "-",
          },
          { time: "4.00PM", activity: "Tea Break and End of Day Four", facilitator: "-" },
        ],
      },
    ],
  },

  // ---------------- DAY FIVE ----------------
  {
    dayLabel: "Day Five",
    date: new Date("2025-12-11"),
    sessions: [
      {
        title: "DAY FIVE",
        chair: null,
        activities: [
          { time: "9.00AM", activity: "Breakfast and checkout", facilitator: "Secretariat" },
          { time: "1.00–2.00PM", activity: "Lunch", facilitator: "-" },
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
