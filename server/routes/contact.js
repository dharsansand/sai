import express from "express";
import { postContact } from "../controllers/contact_controller.js";


const router = express.Router();

router.post("/",(req,res)=>postContact(req,res));



export default router;