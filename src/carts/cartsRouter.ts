import express from "express";
import {
  addCartItemControler,
  deleteItemControler,
  getCartControler,
} from "./cartsController";

const router = express.Router();

router.get(`/getItems`, getCartControler);
router.post(`/addItem`, addCartItemControler);
router.delete(`/deleteItem/:cartItemID`, deleteItemControler);

export default router;
