import express from "express";
import { getAllProducts, getProduct } from "./productsController";

const router = express.Router();

router.get(`/`, getAllProducts);
router.get(`/product/:productId`, getProduct);
router.get(`/banners`, getProduct);

export default router;
