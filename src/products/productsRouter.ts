import express from "express";
import {
  getAllProducts,
  getProduct,
  similarProducts,
  getCategories,
} from "./productsController";

const router = express.Router();

router.get(`/all/:categoryName?`, getAllProducts);
router.get(`/product/:productId`, getProduct);
router.get(`/categories`, getCategories);
router.get(`/banners`, similarProducts);

export default router;
