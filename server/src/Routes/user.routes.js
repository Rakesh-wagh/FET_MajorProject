import express from "express";
import dotenv from "dotenv";
import dbConnection from "../Database/index.js";
import verify from "../Middleware/auth.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
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
router.post("/home", verify, (req, res) => {
  res.send("Welcome To Homepage");
});

export default router;
