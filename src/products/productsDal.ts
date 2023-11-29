import axios from "axios";
import { Category, Product, productKeys } from "../helpers/types";
import { hasRequiredKeys } from "../helpers/function";

export const getAllProductsDal = async (categoryName?: string) => {
  try {
    console.log(categoryName);

    const url = categoryName
      ? `${process.env.BASE_URL_ERP}/api/shop_inventory/categories/${categoryName}`
      : `${process.env.BASE_URL_ERP}/api/shop_inventory`;
    const productsResult = await axios.get(url);
    const products: Product | Product[] = productsResult.data;
    // console.log(products);

    return products;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getProductDal = async (productId: string) => {
  try {
    const url = `${process.env.BASE_URL_ERP}/api/shop_inventory/${productId}`;
    const productResult = await axios.get(url);
    if (
      productResult.status === 200 &&
      hasRequiredKeys(productResult.data, productKeys)
    ) {
      const productData: Product = productResult.data;
      return productData;
    } else {
      throw { status: 402, message: `Product not found` };
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getCategoriesDal = async () => {
  try {
    const url = `${process.env.BASE_URL_ERP}/api/shop_inventory/categories`;
    const categoriesResult = await axios.get(url);
    const categoriesData: Category[] = categoriesResult.data;
    console.log(categoriesData);
    
    if (categoriesResult.status === 200) {
      return categoriesData;
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
