import { CartItemModel } from "../../mongoDB/models/cartModel";
import { CartItem } from "../../helpers/types";
import { updateRedisJsonArray } from "../../redis/redisClient";

const isExist = async (productId: string, userId: string) => {
  const item = await CartItemModel.findOne({
    "product._id": productId,
    userId: userId,
  });
  return item ? item : null;
};

const getCartDal = async (userId: string) => {
  try {
    const cartItems = await CartItemModel.find({ userId });
    if (!cartItems) throw Error(`Cart not found`);
    await updateRedisJsonArray("cart", cartItems);
    return cartItems;
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    throw new Error("Internal Server Error");
  }
};

const addItemDal = async (newCartItem: CartItem) => {
  try {
    const item = await isExist(newCartItem.product._id, newCartItem.userId);
    if (item) {
      item.product.quantity += 1;
      const updatedItem = await item.save();
      const cartItems = await CartItemModel.find({});
      await updateRedisJsonArray("cart", cartItems);
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

const deleteItemDal = async (productId: string, userId: string) => {
  try {
    const item = await isExist(productId, userId);
    if (item) {
      item.product.quantity -= 1;
      const updatedItem = await item.save();
      const cartItems = await CartItemModel.find({});
      await updateRedisJsonArray("cart", cartItems);
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
const carts = {
  deleteItemDal,
  addItemDal,
  getCartDal,
};
export default carts;
