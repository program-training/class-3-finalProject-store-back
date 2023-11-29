import { CartItem } from "../helpers/types";
import { addItemDal, deleteItemDal, getCartDal } from "./cartsDal";

export const getCartService = async (userId: string) => {
  console.log("lll");

  return await getCartDal(userId);
};

export const addItemService = async (newCartItem: CartItem) => {
  return await addItemDal(newCartItem);
};

export const deleteItemService = async (productId: string, userId: string) => {
  return await deleteItemDal(productId, userId);
};
