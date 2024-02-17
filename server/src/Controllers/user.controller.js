import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createUserModel from "../Models/user.model.js";
import dotenv from "dotenv";

dotenv.config();
const User = createUserModel();
const { JWT_SECRET } = process.env;

// Function to generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "2d",
  });
};

//Registration
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ error: "Username already exists. Choose another username." });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "Email already exists. Choose another email." });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json(newUser);
    console.log("User Created Succesfully");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid  password" });
    }

    // Token Generation
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    res.cookie("Token", refreshToken, {
      httpOnly: true,
      maxage: 86400000,
    });
    console.log("User Logged In");
    res.json({ refreshToken });
    await user.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout
export const logoutUser = (req, res) => {
  res.clearCookie("Token");
  res.json({
    message: "Logout successful ",
  });
  console.log("User Logged Out");
};
