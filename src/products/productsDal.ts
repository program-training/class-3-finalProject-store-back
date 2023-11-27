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

export const getCategoriesDal = async () => {
  try {
    const categoriesResult = await axios.get(
      `${process.env.BASE_URL_ERP}/api/shop_inventory/categories`
    );
    const categoriesData = categoriesResult.data;
    const categoriesNames: string[] = [];
    if (categoriesResult.status === 200) {
      for (let i = 0; i < categoriesData.length; i++) {
        categoriesNames.push(categoriesData[i].name);
      }
      return categoriesNames;
    } else {
      throw { status: 404, message: `Categories not found` };
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: `Internal Server Error` };
  }
};

export const similarProductsDal = async (
  categoryName: string,
  quantity: number
) => {
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
