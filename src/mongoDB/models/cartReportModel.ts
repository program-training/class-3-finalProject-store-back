import { Schema, model } from "mongoose";
import { CartReport } from "../../helpers/types";

const dateSchema = new Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  day: { type: Number, required: true },
});

const timeSchema = new Schema({
  date: { type: dateSchema, required: true },
  hour: { type: Number, required: true },
});

const cartReportSchema = new Schema<CartReport>({
  user_id: { type: String, required: true, unique: true },
  product_id: { type: String, required: true, unique: true },
  time: { type: timeSchema, required: true },
});

export const CartReportsModel = model<CartReport>("report", cartReportSchema);
