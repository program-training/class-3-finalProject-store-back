import express from "express";
import { getAllProducts ,product} from "./productsController";

const router = express.Router();

router.get(`/products`, getAllProducts);
router.get(`/products/:productId`, product);

export default router;
