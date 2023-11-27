import mongoose, { Schema, Document } from "mongoose";
import { Product } from "../../helpers/types";

const imageSchema = new Schema({
  url: { type: String, required: true },
  alt: { type: String, required: true },
});

export const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  salePrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  discountPercentage: { type: Number, required: true },
  image: { type: imageSchema, required: true },
});

export const ProductModel = mongoose.model<Product>("Product", productSchema);
