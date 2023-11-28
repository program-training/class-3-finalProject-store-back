import { CartItemModel } from "../DB/models/cartModel";
import { CartItem } from "../helpers/types";

export const getCartDal = async (userId: string) => {
  try {
    const cartFromDB = await CartItemModel.findOne({ userId: userId });
    console.log(cartFromDB);
    if (!cartFromDB) throw Error(`Cart not found`);
    return cartFromDB;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const setCartDal = async (cart: CartItem) => {
  const { userId, items } = cart;
  try {
    const updatedCart = await CartItemModel.findOneAndUpdate(
      { userId : userId},
      { $set: { items } },
      { new: true }
    );
    if (!updatedCart) {
      throw new Error(`Cart not found for userId: ${userId}`);
    }
    console.log("Cart updated successfully:", updatedCart);
    return updatedCart; 
  } catch (err) { 
    console.error("Error updating cart:", err);
    throw err;
  }
};
