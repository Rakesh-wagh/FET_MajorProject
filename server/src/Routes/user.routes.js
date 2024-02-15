import express from "express";
import dotenv from "dotenv";
import dbConnection from "../Database/index.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyRefreshToken,
} from "../Controllers/user.controller.js";

dotenv.config();
const router = express.Router();
const db = dbConnection();

// Registration
router.post("/register", registerUser);

//Login
router.post("/login", loginUser);

//Logout
router.post("/logout", logoutUser);

//Verify
router.post("/verify", verifyRefreshToken);

export default router;
