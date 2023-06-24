import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
