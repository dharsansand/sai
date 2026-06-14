import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import fs from "fs"; // <--- ADD THIS LINE
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

import userRoutes from "./routes/user.js";
import brannerRoutes from "./routes/branner.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Correctly define uploads path
// process.cwd() is the root folder of your project on Render
const uploadsPath = path.join(process.cwd(), "uploads");

console.log("Serving static files from:", uploadsPath);

// 2. Fix the 'fs is not defined' error by checking if it exists
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
}

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()) 
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// 3. Static Files Middleware
// This makes http://.../api/static/banner/img.jpg look inside the /uploads/banner/ folder
app.use("/api/static", express.static(uploadsPath));
app.use(express.static("public")); 

// Routes
app.use("/api/users", userRoutes);
app.use("/api/banner", brannerRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));