import express from "express";
import createMulterMiddleware from "../controllers/upload.js";
import banner from "../models/banner.js"
import { ImageUpload } from "../controllers/banner_controller.js";
import { create, deleteOne, getAll, updateById } from "../controllers/common_controllers.js";
const router = express.Router();


router.post("/",(req,res)=>create(req , res,banner));
router.get("/",(req,res)=>getAll(req,res,banner));
router.put("/:id",(req,res)=>updateById(req,res,banner));
router.delete("/:id",(req,res)=>deleteOne(req,res,banner));

router.post(
  "/banner",
  createMulterMiddleware("uploads/banner").single("file"),
  ImageUpload
 
);

export default router;