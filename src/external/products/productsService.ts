import { getAllProductsDal, getProductDal } from "./productsDal";

export const getAllProductsService = async () => await getAllProductsDal();
export const productGetService = async (productId: string) => await getProductDal(productId);