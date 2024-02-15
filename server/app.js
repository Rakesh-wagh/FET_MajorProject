import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./src/Routes/user.routes.js";

const app = express();
const PORT = process.env.PORT;

// Server Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config();

//Routing
app.use("/api", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
