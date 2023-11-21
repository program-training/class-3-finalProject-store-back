import { Request, Response } from "express";
import { getOrderByUserService } from "./orderServices";

export const getOrderByUser = async (req: Request, res: Response) => {
  try {
    const response = await getOrderByUserService();
  } catch (error) {}
};
