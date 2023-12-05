import { PubSub } from "graphql-subscriptions";
import { Product, User } from "../helpers/types.js";
import { UserModel } from "../DB/models/userModel.js";
import { ProductModel } from "../DB/models/productModel.js";

const pubsub = new PubSub();
export const resolvers = {
  Query: {
    hello() {
      return {
        text: "hello world",
        number: 999,
      };
    },
    async getProducts() {
      return await ProductModel.find();
    },
    async findById(_, { _id }: { _id: String }) {
      return await ProductModel.findById(_id);
    },
  },
  Mutation: {
    async signUp(_, { user }: { user: User }) {
      const newUser = new UserModel(user);
      await newUser?.save();
      console.log("adding product, ", user);
      pubsub.publish("PRODUCT_CREATED", {
        productCreated: { ...user, _id: newUser._id },
      });
      return { ...user, _id: newUser._id.toString() };
    },
    async updateProduct(
      _,
      { productData, _id }: { productData: Product; _id: String }
    ) {
      const product = await ProductModel.findByIdAndUpdate(_id, productData);
      await product?.save();
      console.log("updating product, ", productData);
      return product;
    },
    async deleteProduct(_, { _id }: { _id: String }) {
      console.log("deleting product, ", _id);
      const product = await ProductModel.findByIdAndDelete(_id);
      return product;
    },
  },
  Subscription: {
    productCreated: {
      subscribe: () => {
        console.log("in subscription");
        return pubsub.asyncIterator(["PRODUCT_CREATED"]);
      },
    },
  },
};
