import axios from "axios";
import { Product, productKeys } from "../helpers/types";

export const getAllProductsDal = async () => {
  try {
    const productsResult = await axios(`${process.env.BASE_URL_ERP}/api/shop_inventory`);
    const products: Product[] = productsResult.data;
    return products;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getProductDal = async (productId: string) => {
  try {
    const productResult = await axios(`${process.env.BASE_URL_ERP}/api/shop_inventory/${productId}`);
    const productData: Product = productResult.data;
    return productData;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const similarProductsDal = async (categoryName: string, quantity: number) => {
  try {
    const productsFromBannerServer = await axios(`${process.env.BASE_URL_BANNERS}/api/recommended/categoryName`, {
      params: {
        categoryName,
        quantity,
      },
    });
    const bannerProductsList: Product[] = productsFromBannerServer.data;
    return bannerProductsList;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
