import { Schema, model } from "mongoose";
import { CartItem } from "../types";

const cartSchema = new Schema<CartItem>({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const Cart = model<CartItem>("Cart", cartSchema);
