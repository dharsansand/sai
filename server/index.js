import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

// Import Routes
import userRoutes from "./routes/user.js";
import brannerRoutes from "./routes/branner.js";
import category from "./routes/category.js";
import allrunapi from "./routes/allrunapi.js";
import contact from "./routes/contact.js";

dotenv.config();
const app = express();

// --- WHATSAPP SETUP ---
const { Client, LocalAuth } = pkg;

// Variable to store the QR string
let latestQr = "";

export const whatsappClient = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process',
            '--no-zygote',
            '--disable-gpu',
            '--disable-canvas-aa', 
            '--disable-2d-canvas-clip-aa',
            '--disable-gl-drawing-for-tests'
        ],
    }
});

// 1. QR Code Event
whatsappClient.on('qr', (qr) => {
    latestQr = qr; 
    console.log('--- WHATSAPP QR RECEIVED ---');
    qrcode.generate(qr, { small: true });
    console.log('If the QR above is distorted, go to: /api/whatsapp/qr');
});

// 2. Loading Progress Event
whatsappClient.on('loading_screen', (percent, message) => {
    console.log(`⏳ LOADING PROGRESS: ${percent}% - ${message}`);
});

// 3. Authentication Event
whatsappClient.on('authenticated', () => {
    console.log('✅ WhatsApp Authenticated (Login Success)!');
});

// 4. Auth Failure Event
whatsappClient.on('auth_failure', (msg) => {
    console.error('❌ WhatsApp Authentication Failure:', msg);
});

// 5. Ready Event
whatsappClient.on('ready', () => {
    latestQr = ""; 
    console.log('✅ WhatsApp Client is connected and ready!');
});

// --- CRITICAL: YOU MUST CALL THIS TO START WHATSAPP ---
whatsappClient.initialize().catch(err => {
    console.error('❌ Failed to initialize WhatsApp:', err);
});

// Heartbeat log
setInterval(() => {
    if (whatsappClient && whatsappClient.info) {
        console.log('💓 Heartbeat: WhatsApp Client is active');
    }
}, 60000);

// --- NEW ROUTE TO SEE THE QR CODE IMAGE ---
app.get('/api/whatsapp/qr', (req, res) => {
    if (latestQr) {
        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(latestQr)}`;
        res.send(`
            <html>
                <body style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif; background:#f0f2f5;">
                    <div style="background:white; padding:30px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1); text-align:center;">
                        <h2 style="color:#128c7e;">Scan WhatsApp QR</h2>
                        <img src="${qrImageUrl}" style="border: 1px solid #ccc;" />
                        <p style="margin-top:20px; color:#666;">Scan this with your WhatsApp "Linked Devices"</p>
                        <script>setTimeout(() => location.reload(), 20000);</script>
                    </div>
                </body>
            </html>
        `);
    } else {
        res.send('<h2>WhatsApp is already connected or QR is not generated yet. Please wait.</h2>');
    }
});

// --- MIDDLEWARE ---
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()) 
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.length === 0) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
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

// --- ROUTES ---
app.use("/api/users", userRoutes);
app.use("/api/banner", brannerRoutes);
app.use("/api/category", category);
app.use("/api/contact", contact);
app.use("/api/alltimeapi", allrunapi);

// --- START SERVER ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));