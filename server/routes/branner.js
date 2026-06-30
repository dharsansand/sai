import express from "express";
import banner from "../models/banner.js"
import { bannerImageUpload } from "../controllers/banner_controller.js";
import { create, deleteOne, getAll, updateById } from "../controllers/common_controllers.js";
import createCloudinaryMiddleware from "../controllers/upload.js";
const router = express.Router();


router.post("/",(req,res)=>create(req , res,banner));
router.get("/",(req,res)=>getAll(req,res,banner));
router.put("/:id",(req,res)=>updateById(req,res,banner));
router.delete("/:id",(req,res)=>deleteOne(req,res,banner));

router.post("/banner", (req, res, next) => {
  const upload = createCloudinaryMiddleware("banners").single("file");

  upload(req, res, (err) => {
    if (err) {
      // THIS WILL PRINT THE REAL ERROR IN YOUR VS CODE TERMINAL
      console.error("MULTER/CLOUDINARY ERROR:", err);
      return res.status(500).json({ 
        message: "Cloudinary Upload Failed", 
        error: err.message || err 
      });
    }
    next();
  });
}, bannerImageUpload);
export default router;