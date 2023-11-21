import { Request, Response } from "express";
import { getOrderByUserService, postOrderService } from "./orderServices";
import { handleError } from "../../helpers/handleErrors";

export const getOrderByUser = async (req: Request, res: Response) => {
  try {
    return await getOrderByUserService(req.body.user.userId);
  } catch (error) {
    return handleError(res, error);
  }
};

export const postOrderCart = async (req: Request, res: Response) => {
  try {
    const response = await postOrderService(req.body);
    if (response.statusText === "OK") {
      res.json(response.data);
    } else {
      throw new Error("Order not found (controller)");
    }
  } catch (err) {
    handleError(res, err, 404);
  }
};
