import { categoryImageUpload, homecategory } from "../controllers/category_controller.js";
import { create, deleteOne, getAll, updateById } from "../controllers/common_controllers.js";
import { productImageUpload,productGetOneData,productAllData} from "../controllers/product_controller.js";
import createCloudinaryMiddleware from "../controllers/upload.js";
import product from "../models/product.js"


import express from "express";


const router = express.Router();

router.get("/home",homecategory)

router.get("/",(req,res)=>productAllData(req , res));
router.get("/:id",(req,res)=>productGetOneData( req , res,));

router.post("/",(req,res)=>create(req , res,product));
router.put("/:id",(req,res)=>updateById(req,res,product));
router.delete("/:id",(req,res)=>deleteOne(req,res,product));




router.post("/product", (req, res, next) => {
  const upload = createCloudinaryMiddleware("product").single("file");

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
}, productImageUpload);

export default router;