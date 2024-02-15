import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createUserModel from "../Models/user.model.js";
import dotenv from "dotenv";

dotenv.config();
const User = createUserModel();
const { JWT_SECRET } = process.env;

// Function to generate JWT token
const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email, password: user.password }, JWT_SECRET, {
    expiresIn: "15m",
  });
};

// Function to generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email, password: user.password }, JWT_SECRET);
};

//Registration
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });

    const accessToken = generateAccessToken(newUser);
    newUser.refreshToken = accessToken;
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
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Token Generation
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 900000,
      secure: true,
    });
    console.log("User Logged In");
    res.json({ refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout
export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({
    message: "Logout successful (Token will expire on the client side)",
  });
  console.log("User Logged Out");
};

// Verification Of Token
export const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Refresh token missing" });
  }

  jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Forbidden - Invalid refresh token" });
    }

    // You can access user information from decoded payload
    req.user = decoded;
    console.log("User Authenticated");

    next();
  });
};
