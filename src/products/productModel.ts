import mongoose, { Schema } from "mongoose";
import { Category, Product } from "../types";

// Mongoose schema for the product
const productSchema = new Schema<Product>({});

// Mongoose schema for the category
const categorySchema = new Schema<Category>({});

const Product = mongoose.model<Product>("Product", productSchema);
const Categories = mongoose.model<Category>("Categories", categorySchema);

export { Product, Categories };
