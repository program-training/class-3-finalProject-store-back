import axios from "axios";
import { Product, productKeys } from "../../types";
import { hasRequiredKeys } from "../../helpers/function";

export const getAllProductsDal = async () => {
  try {
    const productsResult = await axios.get("/api/products");
    const products: Product[] = productsResult.data;
    if (productsResult.status === 200) {
      return products;
    } else {
      throw { status: 404, message: `Product not found` };
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: `Internal Server Error` };
  }
};

export const getProductDal = async (productId: string) => {
  try {
    const productResult = await axios.get(`/api/products/${productId}`);
    const productData: Product = productResult.data;
    if (
      productResult.status === 200 &&
      hasRequiredKeys(productData, productKeys)
    ) {
      return productData;
    } else {
      throw { status: 404, message: `Product not found` };
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: `Internal Server Error` };
  }
};
