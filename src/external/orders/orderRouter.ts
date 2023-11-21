import express from "express";
import { getOrderByUser, postOrderCart } from "./orderController";

const router = express.Router();

router.get("/", getOrderByUser);
router.post("/api/users", postOrderCart);

export default router;
