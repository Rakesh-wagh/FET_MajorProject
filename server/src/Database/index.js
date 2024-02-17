import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = () => {
  const { DB_URL, DB_NAME } = process.env;
  const dbURI = `${DB_URL}/${DB_NAME}`;

  mongoose
    .connect(dbURI, {})
    .then(() => {
      console.log("Connected To Database");
    })
    .catch((err) => {
      console.log(`Some error occured while connecing to database: ${err}`);
    });
};
export default dbConnection;
