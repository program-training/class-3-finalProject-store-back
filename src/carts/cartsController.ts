import { Request, Response } from "express";
import { getCartService, setCartService } from "./cartsServices";
import { handleError } from "../helpers/handleErrors";

export const getCartControler = async (req: Request, res: Response) => {
 try {
    const cartData = await getCartService(req.body.user.userId);
    res.status(200).json(cartData);
  } catch (error) {
    return handleError(res, error, 401);
  }
};

export const setCartControler = async (req: Request, res: Response) => {
  try {
    const updatedCart = await setCartService(req.body.cart);
    res.status(200).json(updatedCart);
  } catch (error) {
    return handleError(res, error, 401);
  }
};
