import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = () => {
  const { DB_URL, DB_NAME } = process.env;
  const dbURI = `${DB_URL}/${DB_NAME}`;

  mongoose.connect(dbURI, {});

  mongoose.connection.on("connected", () => {
    console.log(`Database connected to ${dbURI}`);
  });

  mongoose.connection.on("error", (err) => {
    console.log(`Database connection error: ${err}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("Database disconnected through app termination");
      // process.exit(0);
    });
  });
};
export default dbConnection;
