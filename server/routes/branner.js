import express from "express";
import createMulterMiddleware from "../controllers/upload.js";
import { bannerImageUpload } from "../controllers/banner_controller.js";
const router = express.Router();
router.post(
  "/banner",
  createMulterMiddleware("uploads/banner").single("file"),
  bannerImageUpload
 
);

export default router;