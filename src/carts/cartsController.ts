import { Request, Response } from "express";
import {
  addItemService,
  deleteItemService,
  getCartService,
} from "./cartsServices";
import { handleError } from "../helpers/handleErrors";
import { CartItem } from "../helpers/types";

export const getCartControler = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.userId;
    console.log(userId);
    const cartData = await getCartService(userId);
    res.status(200).json(cartData);
  } catch (error) {
    return handleError(res, error, 401);
  }
};

export const addCartItemControler = async (req: Request, res: Response) => {
  try {
    const item: CartItem = {
      userId: req.body.user.userId,
      product: req.body.product,
    };
    const newCartItem = await addItemService(item);
    res.status(201).json(newCartItem);
  } catch (error) {
    return handleError(res, error, 401);
  }
};

export const deleteItemControler = async (req: Request, res: Response) => {
  try {
    const productId = req.params.cartItemID;
    const userId = req.body.user.userId;
    const deletedCartItem = await deleteItemService(productId ,userId);
    res.json(deletedCartItem);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
