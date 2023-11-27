import mongoose, { Schema, Document } from "mongoose";
import { productSchema } from "./productModel";
import { CartItem } from "../../helpers/types";

const cartItemSchema = new Schema<CartItem>({
  userId: { type: String, required: true },
  items: [productSchema], 
});

export const CartItemModel = mongoose.model<CartItem>(
  "Cart",
  cartItemSchema
);
