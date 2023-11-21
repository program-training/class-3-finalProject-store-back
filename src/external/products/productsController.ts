import { Request, Response } from "express";
import { getAllProductsService, productGetService } from "./productsService";
import { handleError } from "../../helpers/handleErrors";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const productsData = await getAllProductsService();
    if (productsData) {
      res.status(200).json(productsData);
    } else {
      throw new Error("get all product not found (controler)");
    }
  } catch (err) {
    return handleError(res, err, 404);
  }
};

export const product = async (req: Request, res: Response) => {
  try {
    const productGet = await productGetService(req.params.productId);
    if (productGet) {
      res.status(200).json(productGet);
    } else {
      throw new Error("Product not found (controler)");
    }
  } catch (err) {
    handleError(res, err, 404);
  }
};
