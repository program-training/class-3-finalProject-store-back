import express from "express";
import { getCartControler, setCartControler } from "./cartsController";

const router = express.Router();

router.get(`/:userId`, getCartControler);
router.put(`/updateItems`, setCartControler);

export default router;
