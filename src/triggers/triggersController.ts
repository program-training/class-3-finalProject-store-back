import { Request, Response } from "express";
import { getTimeTriggerService } from "./triggersServices";
import { handleError } from "../helpers/handleErrors";

export const getTimeTrigger = async (req: Request, res: Response) => {
  try {
    const timeTrigger = await getTimeTriggerService();
    res.status(200).json(timeTrigger);
  } catch (error) {
    return handleError(res, error, 401);
  }
};
