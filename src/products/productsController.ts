import { Request, Response } from "express";
import { getAllProductsService, productGetService, similarProductsService } from "./productsService";
import { handleError } from "../helpers/handleErrors";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const productsData = await getAllProductsService();
    if (productsData) {
      res.status(200).json(productsData);
    } else {
      throw new Error("get all product not found (controler)");
    }
  } catch (err) {
    return handleError(res, err, 401);
  }
};

export const product = async (req: Request, res: Response) => {
  try {
    const productGet = await productGetService(req.params.productId);
    if (productGet) {
      res.status(200).json(productGet);
    } else {
      throw new Error("Product not found (controller)");
    }
  } catch (err) {
    handleError(res, err, 401);
  }
};

export const similarProducts = async (req: Request, res: Response) => {
  try {
    const { categoryName, quantity } = req.body;
    const bannerProductsList = await similarProductsService(categoryName, quantity);
    res.status(201).json(bannerProductsList);
  } catch (error) {
    handleError(res, error, 401);
  }
};
