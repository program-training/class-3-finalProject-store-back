import { Request, Response } from "express";
import { getAllProductsService, getProductService, similarProductsService } from "./productsService";
import { handleError } from "../helpers/handleErrors";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const productsData = await getAllProductsService();
    if (productsData) {
      res.status(200).json(productsData);
    } else {
      throw new Error("get all product not found (controller)");
    }
  } catch (err) {
    return handleError(res, err, 401);
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

export const similarProducts = async (req: Request, res: Response) => {
  try {
    const { categoryName, quantity } = req.body.params;
    const bannerProductsList = await similarProductsService(categoryName, quantity);
    res.status(201).json(bannerProductsList);
  } catch (error) {
    handleError(res, error, 401);
  }
};
