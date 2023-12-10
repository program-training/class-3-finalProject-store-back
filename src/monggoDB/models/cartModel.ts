import mongoose, { Schema } from "mongoose";
import { productSchema } from "./productModel";
import { CartItem } from "../../helpers/types";

const cartItemSchema = new Schema<CartItem>({
  userId: { type: String, required: true },
  product: { type: productSchema, required: true },
});

export const CartItemModel = mongoose.model("Cart", cartItemSchema);
