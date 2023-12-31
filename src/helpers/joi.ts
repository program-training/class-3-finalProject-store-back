import Joi from "joi";
import { User } from "../helpers/types";

export const userValidator = (user: User) => {
  const schema = Joi.object({
    _id: Joi.string().allow(""),
    email: Joi.string()
      .ruleset.pattern(/^\S+@\S+$/i)
      .rule({ message: 'User "mail" mast be a valid mail' })
      .required(),
    password: Joi.string()
      .min(8)
      .max(20)
      .ruleset.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&()*-+=]).+$/)
      .rule({
        message:
          'User "password" must be at least eight characters long and maximum 20 characters and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-',
      })
      .required(),
  });
  return schema.validate(user);
};
