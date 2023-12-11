import { Request, Response } from "express";
import { userRegisterService, userLoginService } from "./usersServices";
import { User } from "../helpers/types";
import { userValidator } from "../helpers/joi";
import { handleError } from "../helpers/handleErrors";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const { error } = userValidator(user);
    if (error) throw Error(error.details[0].message);
    const userTokenFromDB = await userRegisterService(user);
    console.log(userTokenFromDB);
    res.status(201).json(userTokenFromDB);
  } catch (error) {
    return handleError(res, error, 401);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const { error } = userValidator(user);
    if (error) throw Error(error.details[0].message);
    const userTokenFromDB = await userLoginService(user);
    res.status(200).json(userTokenFromDB);
    console.log(userTokenFromDB);
  } catch (error) {
    return handleError(res, error, 401);
  }
};

