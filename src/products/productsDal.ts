import axios from "axios";
import { Product, productKeys } from "../helpers/types";
import { hasRequiredKeys } from "../helpers/function";
import { log } from "console";

export const getAllProductsDal = async () => {
  try {
    const productsResult = await axios.get(`${process.env.BASE_URL_ERP}/api/shop_inventory`);
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
    const productResult = await axios.get(`${process.env.BASE_URL_ERP}/api/shop_inventory/${productId}`);
    const productData: Product = productResult.data;
    console.log(productData);
    return productData;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const similarProductsDal = async (categoryName: string, quantity: number) => {
  try {
    const productsFromBannerServer = await axios(`https://beckend-banners-deploy.onrender.com/api/recommended/categoryName`, {
      params: {
        categoryName, quantity,
      },
    });
    const bannerProductsList: Product[] = productsFromBannerServer.data;
    return bannerProductsList;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
