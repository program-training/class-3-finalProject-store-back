import axios from "axios";
import { Product, productKeys } from "../helpers/types";
import { hasRequiredKeys } from "../helpers/function";

export const getAllProductsDal = async () => {
  try {
<<<<<<< HEAD
    const productsResult = await axios(`${process.env.BASE_URL_ERP}/api/shop_inventory`);
=======
    const productsResult = await axios.get(`${process.env.BASE_URL_ERP}/api/shop_inventory/`);
>>>>>>> develop
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
<<<<<<< HEAD
    const productData: Product = productResult.data;
    return productData;
=======
    if (productResult.status === 200 && hasRequiredKeys(productResult.data, productKeys)) {
      const productData: Product = productResult.data;
      return productData;
    } else {
      throw { status: 404, message: `Product not found` };
    }
>>>>>>> develop
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getCategoriesDal = async () => {
  try {
    const categoriesResult = await axios.get(`${process.env.BASE_URL_ERP}/api/shop_inventory/categories`);
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
