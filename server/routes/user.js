import express from "express";
import authMiddleware from "../controllers/authentication.js";
import { createUser, deleteUser, getUserById, loginUser, updateUser } from "../controllers/userController.js";
import User from "../models/User.js";
import { encryptData } from "../controllers/encryptedData.js";
const router = express.Router();




// Auth Routes
router.post("/login", loginUser);
router.post("/", createUser);

router.get("/me", authMiddleware, async (req, res) => {
 
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json(encryptData(user));
  } catch (err) { 
    res.status(500).json({ message: err.message });
  }
});
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({ isdelete: false  } ).select("-password") .sort({ createdAt: -1 });
    res.status(200).json(encryptData(users));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);


export default router;

