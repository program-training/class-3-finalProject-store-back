import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../helpers/types";

const secret = process.env.SECRET || "jwt";

export const createToken = (user: User) => {
  const userObj = { email: user.email, id: user.id };
  const token = jwt.sign(userObj, secret);
  return token;
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) next();
  else
    jwt.verify(token, secret, (err, user) => {
      console.log(err);
      if (err) res.status(403).send(err.message);
      req.body.user = user;
      next();
    });
};
