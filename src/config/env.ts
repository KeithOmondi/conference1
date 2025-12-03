import dotenv from "dotenv";

dotenv.config();

export const env = {
  MONGO_URI: process.env.MONGO_URI || "",     // e.g. mongodb+srv://user:pass@cluster0.mongodb.net
  DB_NAME: process.env.DB_NAME || "conferenceDB", // default database name
  PORT: process.env.PORT || "5000",
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
};
