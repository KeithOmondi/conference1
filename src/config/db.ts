import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async () => {
  try {
    if (!env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Include database name in the connection string
    const uri = `${env.MONGO_URI}/${env.DB_NAME}?retryWrites=true&w=majority`;

    await mongoose.connect(uri);
    console.log(
      `🚀 MongoDB connected successfully to database: ${env.DB_NAME}`
    );
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
