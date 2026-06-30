import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from "dotenv";

dotenv.config();

// DEBUG: This will print to your terminal when the server starts
console.log("Cloudinary Config Check:", {
  name: process.env.Cloud_NAME ? "EXISTS" : "MISSING",
  key: process.env.Cloud_API_KEY ? "EXISTS" : "MISSING"
});

cloudinary.config({
  cloud_name: process.env.Cloud_NAME,
  api_key: process.env.Cloud_API_KEY,
  api_secret: process.env.Cloud_API_SECRET,
});

function createCloudinaryMiddleware(folderName) {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folderName,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
  });

  // Add error handling to multer
  return multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
  });
}

export default createCloudinaryMiddleware;