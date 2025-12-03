// src/app.ts
import express, { Application } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorMiddleware";
import authRoutes from "./routes/authRoutes"
import programmesRoutes from "./routes/programRoutes"

const app: Application = express();

// Middleware
app.use(express.json());
// Allow your frontend origin
app.use(
  cors({
    origin: ["http://conference-mm36.vercel.app", "http://localhost:5173"], // <-- Replace with your frontend URL
    credentials: true, // If you use cookies or auth headers
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/programs", programmesRoutes);

// Test routed
app.get("/", (req, res) => {
  res.send("Judges Conference API is running...");
});


// Error handler must be LAST
app.use(errorHandler);

export default app;
