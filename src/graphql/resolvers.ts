import { PubSub } from "graphql-subscriptions";
import { CartItem, Order, User } from "../helpers/types";
import { userValidator } from "../helpers/joi";
import { userLoginDal, userRegister } from "./serviceAndDal/usersDal";
import {
  getAllProductsDal,
  getCategoriesDal,
  getProductDal,
  similarProductsDal,
} from "./serviceAndDal/productsDal";
import carts from "./serviceAndDal/cartsDal";
import { getOrderByUserDal, postOrderDal } from "./serviceAndDal/orderDal";

const pubsub = new PubSub();

export const resolvers = {
  Query: {
    getAllProducts: async (_: unknown, categoryName: string | undefined) => {
      try {
        return await getAllProductsDal(categoryName);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching all products: ${error.message}`);
        }
      }
    },
    getProduct: async (_: unknown, productId: string) => {
      try {
        return await getProductDal(productId);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching product: ${error.message}`);
        }
      }
    },
    getCategories: async () => {
      try {
        return await getCategoriesDal();
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching categories: ${error.message}`);
        }
      }
    },
    similarProducts: async (
      _: unknown,
      args: { categoryName: string; quantity: number }
    ) => {
      try {
        return await similarProductsDal(args.categoryName, args.quantity);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching similar products: ${error.message}`);
        }
      }
    },
    getCartByUser: async (_: unknown, userId: string) => {
      try {
        return await carts.getCartDal(userId);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error retrieving cart items: ${error.message}`);
        }
      }
    },
    getOrderByUser: async (_: unknown, userId: string) => {
      try {
        const order = await getOrderByUserDal(userId);
        return order;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error retrieving order: ${error.message}`);
        }
      }
    },
  },
  Mutation: {
    addCartItem: async (_: unknown, newCartItem: CartItem) => {
      try {
        const updatedItem = await carts.addItemDal(newCartItem);
        return updatedItem;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error adding item to cart: ${error.message}`);
        }
      }
    },
    deleteCartItem: async (
      _: unknown,
      args: { productId: string; userId: string }
    ) => {
      try {
        const result = await carts.deleteItemDal(args.productId, args.userId);
        return result;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error deleting item from cart: ${error.message}`);
        }
      }
    },
    register: async (_: unknown, user: User) => {
      try {
        const token = await userRegister(user);
        return { token };
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error registering user: ${error.message}`);
        }
      }
    },
    login: async (_: unknown, user: User) => {
      try {
        const token = await userLoginDal(user);
        return { token };
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error logging in: ${error.message}`);
        }
      }
    },
    postOrderCart: async (_: unknown, order: Order) => {
      try {
        const newOrder = await postOrderDal(order);
        return newOrder;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error posting order: ${error.message}`);
        }
      }
    },
  },
};

export default resolvers;
