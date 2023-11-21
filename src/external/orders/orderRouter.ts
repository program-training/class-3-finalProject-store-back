import express from "express";
import { getOrderByUser } from "./orderController";

const router = express.Router();

router.get("/", getOrderByUser);

export default router;
