import {
  getAllProductsDal,
  getProductDal,
  similarProductsDal,
} from "./productsDal";

export const getAllProductsService = async () => await getAllProductsDal();

export const getProductService = async (productId: string) =>
  await getProductDal(productId);

export const similarProductsService = async (
  categoryName: string,
  quantity: number
) => await similarProductsDal(categoryName, quantity);
