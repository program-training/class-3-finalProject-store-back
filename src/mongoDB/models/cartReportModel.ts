import { Schema, model } from "mongoose";
import { CartReport } from "../../helpers/types";

const cartReportSchema = new Schema<CartReport>({
  user_id: { type: String, required: true, unique: true },
  product_id: { type: String, required: true, unique: true },
  date: { type: Number, required: true },
});

export const CartReportsModel = model<CartReport>("report", cartReportSchema);
