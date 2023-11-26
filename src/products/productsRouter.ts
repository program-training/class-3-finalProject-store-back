import express from "express";
import { getAllProducts, getProduct, similarProducts } from "./productsController";

const router = express.Router();

router.get(`/`, getAllProducts);
router.get(`/product/:productId`, getProduct);
router.get(`/banners`, similarProducts);

export default router;
