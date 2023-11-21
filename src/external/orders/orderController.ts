import { Request, Response } from "express";
import { getOrderByUserService ,postOrderService} from "./orderServices";

export const getOrderByUser = async (req: Request, res: Response) => {
  try {
    const response = await getOrderByUserService();
  } catch (error) {}
};

export const postOrderCart = async (req: Request, res: Response) => {
  try {
    const response = await postOrderService(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "fail", error: "Internal Server Error" });
  }
};
