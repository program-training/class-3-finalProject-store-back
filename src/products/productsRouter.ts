import express from "express";
import { getAllProducts, product } from "./productsController";

const router = express.Router();

router.get(`/`, getAllProducts);
router.get(`/product/:productId`, product);

export default router;
