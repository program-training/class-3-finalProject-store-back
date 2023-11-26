import express from "express";
<<<<<<< HEAD
import { getAllProducts, getProduct, similarProducts } from "./productsController";
=======
import { categories, getAllProducts, product } from "./productsController";
>>>>>>> develop

const router = express.Router();

router.get(`/`, getAllProducts);
<<<<<<< HEAD
router.get(`/product/:productId`, getProduct);
router.get(`/banners`, similarProducts);

=======
router.get(`/product/:productId`, product);
router.get(`/categories`, categories)
>>>>>>> develop
export default router;
