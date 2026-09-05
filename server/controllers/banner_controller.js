import banner from "../models/banner.js";
import CryptoJS from "crypto-js";

export const bannerImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No File Uploaded" });
    }

   
    return res.status(200).json({ 
      message: "File Upload successfully", 
      file: {
        filename: req.file.path 
      } 
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};


const SECRET_KEY = process.env.SECRET_KEY || "my-secret-key-123";

export const homeBranner = async (req, res) => {
  try {
    const banners = await banner
      .find({ Active: true, isdelete: false })
      .sort({ createdAt: -1 });

    // 1. Encrypt the banners data
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(banners),
      SECRET_KEY
    ).toString();

    // 2. Send the encrypted string
    res.status(200).json({ data: encryptedData });

  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching banner data", 
      error: error.message 
    });
  }
};