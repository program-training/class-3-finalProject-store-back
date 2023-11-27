import axios from "axios";
import { Product, productKeys } from "../helpers/types";
import { hasRequiredKeys } from "../helpers/function";

export const getAllProductsDal = async (categoryId?: string) => {
  try {
    const url = categoryId
      ? `${process.env.BASE_URL_ERP}/api/shop_inventory/${categoryId}`
      : `${process.env.BASE_URL_ERP}/api/shop_inventory`;
    const productsResult = await axios.get(url);
    const products: Product[] = productsResult.data;
    return products;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getProductDal = async (productId: string) => {
  try {
    const productResult = await axios(
      `${process.env.BASE_URL_ERP}/api/shop_inventory/${productId}`
    );
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
    return Promise.reject(error);
  }
};

export const getCategoriesDal = async () => {
  try {
    const categoriesResult = await axios.get(
      `${process.env.BASE_URL_ERP}/api/shop_inventory/categories`
    );
    const categoriesData = categoriesResult.data;
    type Category = {
      name: string;
      id: string;
    };
    const categoriesNames: Category[] = [];
    if (categoriesResult.status === 200) {
      for (let i = 0; i < categoriesData.length; i++) {
        categoriesNames.push({
          name: categoriesData[i].name,
          id: categoriesData[i]._id,
        });
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
    const productsFromBannerServer = await axios(
      `${process.env.BASE_URL_BANNERS}/api/recommended/categoryName`,
      {
        params: {
          categoryName,
          quantity,
        },
      }
    );
    const bannerProductsList: Product[] = productsFromBannerServer.data;
    return bannerProductsList;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
