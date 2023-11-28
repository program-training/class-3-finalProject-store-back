import { CartItem } from "../helpers/types";
import { getCartDal, setCartDal } from "./cartsDal";

export const getCartService = async (userId: string) => {
  return await getCartDal(userId);
};

export const setCartService = async (cart: CartItem) => {
  return await setCartDal(cart);
};
