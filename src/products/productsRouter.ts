import express from "express";
import { categories, getAllProducts, getProduct } from "./productsController";

const router = express.Router();

router.get(`/`, getAllProducts);
router.get(`/product/:productId`, getProduct);
router.get(`/categories`, categories)
export default router;
