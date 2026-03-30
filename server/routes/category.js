import express from "express";
import createMulterMiddleware from "../controllers/upload.js";
import category from "../models/category.js"
import { ImageUpload } from "../controllers/banner_controller.js";
import { create, deleteOne, getAll, updateById } from "../controllers/common_controllers.js";
const router = express.Router();


router.post("/",(req,res)=>create(req , res,category));
router.get("/",(req,res)=>getAll(req,res,category));
router.put("/:id",(req,res)=>updateById(req,res,category));
router.delete("/:id",(req,res)=>deleteOne(req,res,category));

router.post(
  "/category",
  createMulterMiddleware("uploads/category").single("file"),
  ImageUpload
 
);

export default router;