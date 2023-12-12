import { PubSub } from "graphql-subscriptions";
import { User } from "../helpers/types";
import { userValidator } from "../helpers/joi";
import {userRegister} from "./serviceAndDal/usersDal"

const pubsub = new PubSub();
export const resolvers = {
  Query: {
  //   getAllProducts: async (parent, { categoryName }, context) => {
  //     // Implement logic to fetch all products based on the provided category name
  //     // You might use a database query or any other data source
  //     // Example: return context.db.getAllProductsByCategory(categoryName);
  //   },
  //   getProduct: async (parent, { productId }, context) => {
  //     // Implement logic to fetch a single product based on the provided product ID
  //     // Example: return context.db.getProductById(productId);
  //   },
  //   getCategories: async (parent, args, context) => {
  //     // Implement logic to fetch all categories
  //     // Example: return context.db.getAllCategories();
  //   },
  //   similarProducts: async (parent, { categoryName, quantity }, context) => {
  //     // Implement logic to fetch similar products based on the provided category name and quantity
  //     // Example: return context.db.getSimilarProducts(categoryName, quantity);
  //   },
  //   getOrderByUser: async (parent, { userId }, context) => {
  //     // Implement logic to fetch an order based on the provided user ID
  //     // Example: return context.db.getOrderByUser(userId);
  //   },
  //   getCartByUser: async (parent, { userId }, context) => {
  //     // Implement logic to fetch the user's cart based on the provided user ID
  //     // Example: return context.db.getCartByUser(userId);
  //   },
  },
  Mutation: {
    async register(_: any, { user }: { user: User }) {
      try {
        const { error } = userValidator(user);
        if (error) throw Error(error.details[0].message);
        const userTokenFromDB = await userRegister(user);
        return userTokenFromDB;
      } catch (error) {
        return error;
      }
    },
    // async postOrderCart(
    //   _: any,
    //   // { productData, _id }: { productData: Product; _id: String }
    // ) {
    //   // const product = await ProductModel.findByIdAndUpdate(_id, productData);
    //   // await product?.save();
    //   // console.log("updating product, ", productData);
    //   // return product;
    // },
    
    async deleteCartItem(_: any, { productId,  userId}: {productId: String ,userId: String }) {
      productId
      userId
    },
  },
};




















