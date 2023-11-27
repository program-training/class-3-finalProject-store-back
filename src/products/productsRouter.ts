import express from "express";
import { getAllProducts, getProduct, similarProducts, categories } from "./productsController";

const router = express.Router();

router.get(`/`, getAllProducts);
router.get(`/product/:productId`, getProduct);
router.get(`/categories`, categories);
router.get(`/banners`, similarProducts);
export default router;
