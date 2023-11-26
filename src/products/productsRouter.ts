import express from "express";
import { categories, getAllProducts, product } from "./productsController";

const router = express.Router();

router.get(`/`, getAllProducts);
router.get(`/product/:productId`, product);
router.get(`/categories`, categories)
export default router;
