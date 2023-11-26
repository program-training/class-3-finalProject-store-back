<<<<<<< HEAD
import { getAllProductsDal, getProductDal, similarProductsDal } from "./productsDal";
=======
import {
  getAllProductsDal,
  getCategoriesDal,
  getProductDal,
  similarProductsDal,
} from "./productsDal";
>>>>>>> develop

export const getAllProductsService = async () => await getAllProductsDal();

export const getProductService = async (productId: string) => await getProductDal(productId);

<<<<<<< HEAD
export const similarProductsService = async (categoryName: string, quantity: number) => await similarProductsDal(categoryName, quantity);
=======
  export const categoriesService = async () =>
    await getCategoriesDal();

export const similarProductsService = async (
  categoryName: string,
  quantity: number
) => await similarProductsDal(categoryName, quantity);
>>>>>>> develop
