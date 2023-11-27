import express from "express";
<<<<<<< HEAD
import { getAllProducts, getProduct, similarProducts, categories } from "./productsController";
=======
import { categories, getAllProducts, getProduct, similarProducts } from "./productsController";
>>>>>>> develop

const router = express.Router();

router.get(`/`, getAllProducts);
router.get(`/product/:productId`, getProduct);
router.get(`/categories`, categories);
router.get(`/banners`, similarProducts);
<<<<<<< HEAD
router.get(`/categories`, categories)

=======
>>>>>>> develop
export default router;
