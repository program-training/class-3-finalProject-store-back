import { User } from "../helpers/types";
import { UserDB } from "../DB/models/userModel";
import { createToken } from "../helpers/jwt";
import { comparePassword } from "../helpers/bcrypt";

export const userRegisterDal = async (user: User) => {
  const { email } = user;
  try {
    const uniquenessCheck = await UserDB.findOne({ email: email });
    if (uniquenessCheck) throw Error(`This user is already registered!`);
    const newUser = new UserDB(user);
    const userRegister = await newUser.save();
    console.log(userRegister);
    if (userRegister) {
      const token = createToken(user);
      return token;
    }
  } catch (err) {
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
    const userFromDBObject: User = JSON.parse(JSON.stringify(userFromDB));
    const token = createToken(userFromDBObject);
    return token;
  } catch (err) {
    return Promise.reject(err);
  }
};
