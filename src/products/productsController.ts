import { Request, Response } from "express";
import { categoriesService, getAllProductsService, getProductService, similarProductsService } from "./productsService";
import { handleError } from "../helpers/handleErrors";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const productsData = req.params.categoryName ? await getAllProductsService(req.params.categoryName) : await getAllProductsService();
    // console.log(productsData);
    console.log();
    res.status(200).json(productsData);
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

export const getCategories = async (req: Request, res: Response) => {
  try {
    console.log("ppp");

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
    const { categoryName, quantity } = req.query;
    if (typeof categoryName === `string` && quantity) {
      const bannerProductsList = await similarProductsService(categoryName, Number(quantity));
      res.status(201).json(bannerProductsList);
    }
  } catch (error) {
    handleError(res, error, 401);
  }
};
