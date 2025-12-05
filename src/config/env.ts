import dotenv from "dotenv";

dotenv.config();

export const env = {
  // MongoDB
  MONGO_URI: process.env.MONGO_URI || "", // e.g. mongodb+srv://user:pass@cluster0.mongodb.net
  DB_NAME: process.env.DB_NAME || "conferenceDB",

  // Server
  PORT: process.env.PORT || "5000",
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
};
