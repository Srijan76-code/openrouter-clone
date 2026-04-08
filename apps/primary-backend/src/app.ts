import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "primary-backend" });
});

// TODO: Import and mount routes
// import { router } from "./routes/index.ts";
// app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Primary Backend running at http://localhost:${PORT}`);
});

export default app;
