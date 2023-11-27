import { Request, Response } from "express";
<<<<<<< HEAD
import { getAllProductsService, getProductService, similarProductsService, categoriesService } from "./productsService";
=======
import { categoriesService, getAllProductsService, getProductService, similarProductsService } from "./productsService";
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
    const { categoryName, quantity } = req.query;
    if (typeof categoryName === `string` && quantity) {
      const bannerProductsList = await similarProductsService(categoryName, Number(quantity));
      res.status(201).json(bannerProductsList);
    }
=======
    const { categoryName, quantity } = req.body;
    const bannerProductsList = await similarProductsService(categoryName, quantity);
    res.status(201).json(bannerProductsList);
>>>>>>> develop
  } catch (error) {
    handleError(res, error, 401);
  }
};
