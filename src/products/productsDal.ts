import axios from "axios";
import { Product, productKeys } from "../helpers/types";
import { hasRequiredKeys } from "../helpers/function";

export const getAllProductsDal = async () => {
  try {
    const productsResult = await axios.get(`${process.env.BASE_URL_ERP}/api/shop_inventory/`);
    const products: Product[] = productsResult.data;
    console.log(products, productsResult.status);
    if (productsResult.statusText !== "OK") {
      console.log(products, productsResult.status);
      throw { status: 404, message: `Product not found (dal)` };
    } else {
      return products;
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: `Internal Server Error (dal)` };
  }
};

export const getProductDal = async (productId: string) => {
  try {
    const productResult = await axios.get(`/api/products/${productId}`);
    const productData: Product = productResult.data;
    if (productResult.status === 200 && hasRequiredKeys(productData, productKeys)) {
      return productData;
    } else {
      throw { status: 404, message: `Product not found` };
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: `Internal Server Error` };
  }
};

export const similarProductsDal = async (categoryName: string, quantity: number) => {
  try {
    const productsFromBannerServer = await axios("//", {
      params: {
        categoryName,
        quantity,
      },
    });
    const bannerProductsList: Product[] = productsFromBannerServer.data;
    return bannerProductsList;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
