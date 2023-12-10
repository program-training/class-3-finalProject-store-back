import { CartItemModel } from "../monggoDB/models/cartModel";
import { CartItem } from "../helpers/types";

const isExist = async (productId: string, userId: string) => {
  const item = await CartItemModel.findOne({
    "product._id": productId,
    userId: userId,
  });
  return item ? item : null;
};

export const getCartDal = async (userId: string) => {
  try {
    const cartItems = await CartItemModel.find({ userId });
    if (!cartItems) throw Error(`Cart not found`);
    console.log(cartItems);

    return cartItems;
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    throw new Error("Internal Server Error");
  }
};

export const addItemDal = async (newCartItem: CartItem) => {
  try {
    const item = await isExist(newCartItem.product._id, newCartItem.userId);
    if (item) {
      item.product.quantity += 1;
      const updatedItem = await item.save();
      return updatedItem;
    } else {
      const cartItemInstance = new CartItemModel(newCartItem);
      const createdCartItem = await cartItemInstance.save();
      return createdCartItem;
    }
  } catch (error) {
    console.error("Error creating cart item:", error);
    throw new Error("Internal Server Error");
  }
};

export const deleteItemDal = async (productId: string, userId: string) => {
  try {
    const item = await isExist(productId, userId);
    if (item) {
      item.product.quantity -= 1;
      const updatedItem = await item.save();
      return updatedItem;
    } else {
      const deletedCartItem = await CartItemModel.deleteOne({
        "product._id": productId,
        userId: userId,
      });
      return deletedCartItem;
    }
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw new Error("Internal Server Error");
  }
};
