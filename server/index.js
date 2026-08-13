import dotenv from "dotenv";
import express from "express";

import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import fs from 'fs';
import pkg from 'whatsapp-web.js';

import qrcode from 'qrcode-terminal';

import userRoutes from "./routes/user.js";
import brannerRoutes from "./routes/branner.js";
import category from "./routes/category.js"
import allrunapi from "./routes/allrunapi.js"
import contact from "./routes/contact.js"
dotenv.config();
const app = express();

const { Client, LocalAuth } = pkg;
export const whatsappClient = new Client({
    authStrategy: new LocalAuth(), 
    // FIX: This avoids the "WhatsApp Web version is too old" error
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-js/main/dist/wppconnect-wa.js',
    },
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', 
            '--disable-gpu'
        ],
    }
});
whatsappClient.on('qr', (qr) => {
    console.log('--- WHATSAPP QR RECEIVED ---');
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code above with your phone.');
});
whatsappClient.on('ready', () => {
    console.log('✅ WhatsApp Client is connected and ready!');
});

// Handle Authentication Failure
whatsappClient.on('auth_failure', (msg) => {
    console.error('❌ WhatsApp Authentication failure:', msg);
});

// Handle Disconnection
whatsappClient.on('disconnected', (reason) => {
    console.log('⚠️ WhatsApp was logged out:', reason);
});

// Initialize with error catch to prevent server crash
whatsappClient.initialize().catch(err => {
    console.error('❌ Failed to initialize WhatsApp:', err);
});








const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()) 
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("CORS Blocked Origin:", origin); // This helps you debug in Render logs
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.static("uploads"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(process.cwd(), "uploads");

app.use("/api/static", express.static(uploadsPath));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/banner", brannerRoutes);
app.use("/api/category",category);
app.use("/api/contact",contact)
app.use("/api/alltimeapi",allrunapi)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));