import { User } from "../../types";
import { UserDB } from "./userModel";
import { createToken } from "../../helpers/jwt";
// import chalk from "chalk";
import { comparePassword } from "../../helpers/bcrypt";

export const userRegisterDal = async (user: User) => {
  const { email } = user;
  try {
    const uniquenessCheck = await UserDB.findOne({ email: email });
    if (uniquenessCheck) throw Error(`This user is already registered!`);
    const newUser = new UserDB(user);
    const userRegister = await newUser.save();
    const userFromDBObject: User = JSON.parse(JSON.stringify(userRegister))
    if (userRegister) {
      const token = createToken(userFromDBObject);
      return token;
    }
  } catch (err) {
    // console.error(chalk.redBright(err));
    console.error(err);
    return Promise.reject(err);
  }
};

export const userLoginDal = async (user: User) => {
  try {
    const { email, password } = user;
    const userFromDB = await UserDB.findOne({ email: email });
    if (!userFromDB) throw Error(`User not found`);
    const comparePasswordFromUser = comparePassword(
      password,
      userFromDB.password
    );
    if (!comparePasswordFromUser) throw Error(`Password is incorrect`);
    const userFromDBObject: User = JSON.parse(JSON.stringify(userFromDB))
    const token = createToken(userFromDBObject);
    return token;
  } catch (err) {
    // console.error(chalk.redBright(err));
    console.error(err);
    return Promise.reject(err);
  }
};
