import bcrypt from "bcrypt";
import mongoose from "mongoose";

const createUserModel = () => {
  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
  });

  userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  });

  const User = mongoose.model("User", userSchema);
  return User;
};

export default createUserModel;
