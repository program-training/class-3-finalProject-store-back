import { Request, Response } from "express";
<<<<<<< HEAD
import { getAllProductsService, getProductService, similarProductsService } from "./productsService";
=======
import {
  categoriesService,
  getAllProductsService,
  productGetService,
  similarProductsService,
} from "./productsService";
>>>>>>> develop
import { handleError } from "../helpers/handleErrors";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const productsData = await getAllProductsService();
    res.status(201).json(productsData);
  } catch (error) {
    return handleError(res, error, 401);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const productData = await getProductService(req.params.productId);
    res.status(201).json(productData);
  } catch (error) {
    handleError(res, error, 401);
  }
};

export const categories = async (req: Request, res: Response) => {
  try {
    const categories = await categoriesService();
    if (categories) {
      res.status(200).json(categories);
    } else {
      throw new Error("Failed to get categories");
    }
  } catch (err) {
    handleError(res, err, 401);
  }
};

export const similarProducts = async (req: Request, res: Response) => {
  try {
<<<<<<< HEAD
    const { categoryName, quantity } = req.params;
    const bannerProductsList = await similarProductsService(categoryName, Number(quantity));
=======
    const { categoryName, quantity } = req.body;
    const bannerProductsList = await similarProductsService(
      categoryName,
      quantity
    );
>>>>>>> develop
    res.status(201).json(bannerProductsList);
  } catch (error) {
    handleError(res, error, 401);
  }
};
