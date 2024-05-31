import mongoose, { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  name: string;
  email: string;
  role: "Admin" | "User" | "pending";
  password: string;
  profile?: string;
  bio?: string;
}
const UserSchema:Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required:true,
    },
    email: {
      type: String,
      required:true,
      unique:true
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "pending",
    },
    password: {
      type: String,
      required:true
    },
    profile: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    //* has been changed before saving a document in
    return next();
  }

  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});