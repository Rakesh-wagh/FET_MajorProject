import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET } = process.env;

// Verification Of Token
const verify = (req, res, next) => {
  const refreshToken = req.cookies.Token;

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
export default verify;
