import { Schema, model } from "mongoose";
import { User } from "../types";

const userSchema = new Schema<User>({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserDB = model<User>("User", userSchema);
