import { Request, Response } from "express";
import { getAllProductsService } from "./productsService";

export const getAllProducts = async (res: Response) => {
  try {
    const productsData = await getAllProductsService();
    res.status(200).json(productsData);
  } catch (err) {
    console.error(err);
    res.status(403).json(err);
  }
};

export const product = async (req: Request, res: Response) => {
  try {
    const productGet = await productGetService(req.params.productId);
    if (typeof productGet === `number`)
      res.status(200).json(productGet);
    else throw productGet;
  } catch (err) {
    console.error(err);
    res.status(403).json(err);
  }
};
