import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import programmesRoutes from "./routes/programRoutes";
import presenterRoutes from "./routes/presenterRoutes";
import presentationRoutes from "./routes/presentationRoutes"

const app: Application = express();

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  "https://conference-mm36.vercel.app", // deployed frontend
  "http://localhost:5173",              // local dev
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // allow cookies and auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests for all routes
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(204); // No Content
  } else {
    next();
  }
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/programs", programmesRoutes);
app.use("/api/v1/presenters", presenterRoutes);
app.use("/api/v1/presentations", presentationRoutes);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Judges Conference API is running...");
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
