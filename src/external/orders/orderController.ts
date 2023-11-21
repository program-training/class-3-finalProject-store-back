import { Request, Response } from "express";
import { getOrderByUserService } from "./orderServices";
import { handleError } from "../../helpers/handleErrors";

export const getOrderByUser = async (req: Request, res: Response) => {
  try {
    return await getOrderByUserService(req.body.user.userId);
  } catch (error) {
    return handleError(res, error);
  }
};
