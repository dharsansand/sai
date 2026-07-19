import { categoryImageUpload } from "../controllers/category_controller.js";
import { create, deleteOne, getAll, updateById } from "../controllers/common_controllers.js";
import createCloudinaryMiddleware from "../controllers/upload.js";
import category from "../models/category.js"


import express from "express";


const router = express.Router();


router.get("/",(req,res)=>getAll(req,res,category));

router.post("/",(req,res)=>create(req , res,category));
router.put("/:id",(req,res)=>updateById(req,res,category));
router.delete("/:id",(req,res)=>deleteOne(req,res,category));




router.post("/category", (req, res, next) => {
  const upload = createCloudinaryMiddleware("category").single("file");

  upload(req, res, (err) => {
    if (err) {

      console.error("MULTER/CLOUDINARY ERROR:", err);
      return res.status(500).json({ 
        message: "Cloudinary Upload Failed", 
        error: err.message || err 
      });
    }
    next();
  });
}, categoryImageUpload);

export default router;