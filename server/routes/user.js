
import express from "express"
import authMiddleware from "../controllers/authentication";
import { createUser, deleteUser, getUserById, loginUser, updateUser } from "../controllers/userController";
const router = express.Router();




// Auth Routes
router.post("/login", loginUser);
router.post("/", createUser);
router.get("/:id", auth, getUserById);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);
router.get("/me", authMiddleware, async (req, res) => {
  const User = require("../models/User");
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

