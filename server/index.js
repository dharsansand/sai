require("dotenv").config();

const express = require("express");
const  mongoose  = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user") 

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;


const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());

// Use environment variable for MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


  app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
