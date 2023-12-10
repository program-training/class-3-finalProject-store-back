import { Request, Response } from "express";
import { getTimeTriggerService, getUserTriggerService } from "./triggersServices";
import { handleError } from "../helpers/handleErrors";

export const getTimeTrigger = async (req: Request, res: Response) => {
  try {
    const timeTrigger = await getTimeTriggerService();
    res.status(200).json(timeTrigger);
  } catch (error) {
    return handleError(res, error, 401);
  }
};

export const userReportsRouter = async (req: Request, res: Response) => {
  try {
    const timeTrigger = await getUserTriggerService();
    res.status(200).json(timeTrigger);
  } catch (error) {
    return handleError(res, error, 401);
  }
};
