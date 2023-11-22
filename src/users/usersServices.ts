import { userRegisterDal, userLoginDal } from "./usersDal";
import { User } from "../helpers/types";
import { encryptPassword } from "../helpers/bcrypt";

export const userRegisterService = async (user: User) => {
  const usersPassword = encryptPassword(user.password);
  user.password = usersPassword;
  return await userRegisterDal(user);
};

export const userLoginService = async (user: User) => await userLoginDal(user);
