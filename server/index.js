import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import fs from "fs";

import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

// Import Routes
import userRoutes from "./routes/user.js";
import brannerRoutes from "./routes/branner.js";
import category from "./routes/category.js";
import allrunapi from "./routes/allrunapi.js";
import contact from "./routes/contact.js";

dotenv.config();

const app = express();


// =====================================================
// WHATSAPP SETUP
// =====================================================

const { Client, LocalAuth } = pkg;

let latestQr = "";
let whatsappStatus = "INITIALIZING";

const sessionPath = path.join(process.cwd(), ".wwebjs_auth");


// =====================================================
// WHATSAPP CLIENT
// =====================================================

export const whatsappClient = new Client({

    authStrategy: new LocalAuth({
        clientId: "sai-whatsapp",
        dataPath: sessionPath
    }),

    puppeteer: {
        headless: true,

        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--single-process",
            "--no-zygote",
            "--disable-gpu",
            "--disable-canvas-aa",
            "--disable-2d-canvas-clip-aa",
            "--disable-gl-drawing-for-tests"
        ]
    }
});


// =====================================================
// QR CODE
// =====================================================

whatsappClient.on("qr", (qr) => {

    latestQr = qr;
    whatsappStatus = "QR_REQUIRED";

    console.log("");
    console.log("==========================================");
    console.log("       WHATSAPP QR CODE RECEIVED");
    console.log("==========================================");

    qrcode.generate(qr, {
        small: true
    });

    console.log("");
    console.log("Open this URL:");
    console.log("/api/whatsapp/qr");
    console.log("");
});


// =====================================================
// LOADING
// =====================================================

whatsappClient.on("loading_screen", (percent, message) => {

    whatsappStatus = `LOADING ${percent}%`;

    console.log(
        `WhatsApp Loading: ${percent}% - ${message}`
    );
});


// =====================================================
// AUTHENTICATED
// =====================================================

whatsappClient.on("authenticated", () => {

    whatsappStatus = "AUTHENTICATED";

    console.log("");
    console.log("==========================================");
    console.log(" WhatsApp Authentication Successful");
    console.log("==========================================");
});


// =====================================================
// AUTH FAILURE
// =====================================================

whatsappClient.on("auth_failure", (message) => {

    whatsappStatus = "AUTH_FAILURE";

    console.error("");
    console.error("==========================================");
    console.error(" WhatsApp Authentication Failed");
    console.error("==========================================");

    console.error(message);
});


// =====================================================
// READY
// =====================================================

whatsappClient.on("ready", () => {

    latestQr = "";
    whatsappStatus = "READY";

    console.log("");
    console.log("==========================================");
    console.log("      WHATSAPP CLIENT IS READY");
    console.log("==========================================");
});


// =====================================================
// DISCONNECTED
// =====================================================

whatsappClient.on("disconnected", (reason) => {

    whatsappStatus = "DISCONNECTED";

    console.log("");
    console.log("==========================================");
    console.log(" WhatsApp Disconnected");
    console.log("==========================================");

    console.log("Reason:", reason);
});


// =====================================================
// CHANGE STATE
// =====================================================

whatsappClient.on("change_state", (state) => {

    console.log("WhatsApp State:", state);
});


// =====================================================
// INITIALIZE WHATSAPP
// =====================================================

whatsappClient
    .initialize()
    .then(() => {

        console.log(
            "WhatsApp initialization started..."
        );

    })
    .catch((error) => {

        whatsappStatus = "INITIALIZATION_FAILED";

        console.error(
            "WhatsApp Initialization Error:",
            error
        );
    });


// =====================================================
// HEARTBEAT
// =====================================================

setInterval(() => {

    console.log(
        `💓 WhatsApp Status: ${whatsappStatus}`
    );

}, 60000);


// =====================================================
// WHATSAPP QR PAGE
// =====================================================

app.get("/api/whatsapp/qr", (req, res) => {

    if (latestQr) {

        const qrImageUrl =
            `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
                latestQr
            )}`;

        return res.send(`
<!DOCTYPE html>

<html>

<head>

    <title>WhatsApp QR</title>

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    />

</head>

<body
    style="
        margin:0;
        background:#f0f2f5;
        font-family:Arial,sans-serif;
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
    "
>

    <div
        style="
            background:white;
            padding:30px;
            border-radius:15px;
            text-align:center;
            box-shadow:0 5px 20px rgba(0,0,0,0.15);
        "
    >

        <h2 style="color:#128c7e;">
            WhatsApp Connection
        </h2>

        <p>
            Scan this QR using WhatsApp
        </p>

        <img
            src="${qrImageUrl}"
            width="300"
            height="300"
            style="
                border:1px solid #ddd;
                padding:5px;
            "
        />

        <p style="color:#666;">
            WhatsApp → Linked Devices → Link a device
        </p>

        <p style="color:#999;">
            QR automatically refreshes every 20 seconds
        </p>

    </div>

    <script>

        setTimeout(() => {

            location.reload();

        }, 20000);

    </script>

</body>

</html>
        `);

    }

    return res.send(`
        <html>

        <body
            style="
                font-family:Arial;
                text-align:center;
                padding-top:100px;
            "
        >

            <h2>
                WhatsApp QR Not Available
            </h2>

            <p>
                Current Status:
                <strong>${whatsappStatus}</strong>
            </p>

            <p>
                Please wait...
            </p>

            <script>

                setTimeout(() => {

                    location.reload();

                }, 5000);

            </script>

        </body>

        </html>
    `);
});


// =====================================================
// WHATSAPP STATUS API
// =====================================================

app.get("/api/whatsapp/status", (req, res) => {

    return res.status(200).json({

        success: true,

        status: whatsappStatus,

        connected:
            whatsappStatus === "READY",

        qrAvailable:
            Boolean(latestQr)

    });
});


// =====================================================
// WHATSAPP LOGOUT
// =====================================================

app.post("/api/whatsapp/logout", async (req, res) => {

    try {

        console.log(
            "WhatsApp logout requested..."
        );

        latestQr = "";
        whatsappStatus = "LOGGING_OUT";

        await whatsappClient.logout();

        console.log(
            "WhatsApp logout successful"
        );

        return res.status(200).json({

            success: true,

            message:
                "WhatsApp logged out successfully. Scan a new QR code."
        });

    } catch (error) {

        console.error(
            "WhatsApp Logout Error:",
            error
        );

        return res.status(500).json({

            success: false,

            error:
                "Failed to logout WhatsApp",

            details:
                error?.message
        });
    }
});


// =====================================================
// DELETE WHATSAPP SESSION
// =====================================================

app.post("/api/whatsapp/delete-session", async (req, res) => {

    try {

        console.log(
            "Deleting WhatsApp session..."
        );

        try {

            await whatsappClient.destroy();

        } catch (error) {

            console.log(
                "Client destroy warning:",
                error.message
            );
        }


        if (fs.existsSync(sessionPath)) {

            fs.rmSync(sessionPath, {
                recursive: true,
                force: true
            });

            console.log(
                "WhatsApp session folder deleted"
            );

        } else {

            console.log(
                "Session folder does not exist"
            );
        }


        latestQr = "";

        whatsappStatus = "SESSION_DELETED";


        return res.status(200).json({

            success: true,

            message:
                "WhatsApp session deleted. Restart server to generate a new QR."

        });

    } catch (error) {

        console.error(
            "Delete Session Error:",
            error
        );

        return res.status(500).json({

            success: false,

            error:
                "Failed to delete WhatsApp session",

            details:
                error?.message

        });
    }
});


// =====================================================
// MIDDLEWARE
// =====================================================

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS
        .split(",")
        .map(origin => origin.trim())
    : [];


const corsOptions = {

    origin: function (origin, callback) {

        // Allow Postman / Thunder Client / server requests
        if (!origin) {

            return callback(null, true);
        }


        // If no origins configured
        if (allowedOrigins.length === 0) {

            return callback(null, true);
        }


        // Check allowed origin
        if (
            allowedOrigins.includes(origin)
        ) {

            return callback(null, true);
        }


        return callback(
            new Error("Not allowed by CORS")
        );
    },

    credentials: true
};


app.use(cors(corsOptions));


// =====================================================
// BODY PARSER
// =====================================================

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(express.json());


// =====================================================
// STATIC FILES
// =====================================================

app.use(
    express.static("public")
);

app.use(
    express.static("uploads")
);


// =====================================================
// DIRECTORY
// =====================================================

const __filename =
    fileURLToPath(import.meta.url);

const __dirname =
    path.dirname(__filename);

const uploadsPath =
    path.join(
        process.cwd(),
        "uploads"
    );


app.use(
    "/api/static",
    express.static(uploadsPath)
);


// =====================================================
// ROUTES
// =====================================================

app.use(
    "/api/users",
    userRoutes
);

app.use(
    "/api/banner",
    brannerRoutes
);

app.use(
    "/api/category",
    category
);

app.use(
    "/api/contact",
    contact
);

app.use(
    "/api/alltimeapi",
    allrunapi
);


// =====================================================
// HOME API
// =====================================================

app.get("/", (req, res) => {

    res.json({

        success: true,

        message:
            "SAI API Server Running",

        whatsapp:
            whatsappStatus

    });
});


// =====================================================
// MONGODB
// =====================================================

mongoose
    .connect(process.env.MONGO_URI)

    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );

    })

    .catch((error) => {

        console.error(
            "MongoDB Connection Error:",
            error
        );

    });


// =====================================================
// SERVER
// =====================================================

const PORT =
    process.env.PORT || 5000;


app.listen(
    PORT,
    () => {

        console.log("");
        console.log(
            "=========================================="
        );

        console.log(
            `Server running on port ${PORT}`
        );

        console.log(
            "=========================================="
        );

    }
);