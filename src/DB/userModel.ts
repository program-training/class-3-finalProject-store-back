import { Schema, model } from "mongoose";
import { User } from "../helpers/types";

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserDB = model<User>("User", userSchema);
