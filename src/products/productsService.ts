import {
  getAllProductsDal,
  getCategoriesDal,
  getProductDal,
  similarProductsDal,
} from "./productsDal";

export const getAllProductsService = async () => await getAllProductsDal();

export const productGetService = async (productId: string) =>
  await getProductDal(productId);

  export const categoriesService = async () =>
    await getCategoriesDal();

export const similarProductsService = async (
  categoryName: string,
  quantity: number
) => await similarProductsDal(categoryName, quantity);
