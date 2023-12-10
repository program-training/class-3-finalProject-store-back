import { User } from "../helpers/types";
import { Pool, Client } from "pg";
import { createToken } from "../helpers/jwt";
import { comparePassword } from "../helpers/bcrypt";

const pool = new Pool();

export const userRegisterDal = async (user: User) => {
  const { email, password } = user;
  const client = await pool.connect();
  try {
    const checkEmailQuery = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkEmailQuery.rows.length > 0) {
      throw new Error(`This user is already registered!`);
    }

    const insertUserQuery = "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *";
    const newUserResult = await pool.query(insertUserQuery, [email, password]);

    const newUser = newUserResult.rows[0];
    console.log(newUser);

    if (newUser) {
      const token = createToken(newUser);
      return token;
    }
  } catch (err) {
    return Promise.reject(err);
  } finally {
    client.release();
  }
};

export const userLoginDal = async (user: User) => {
  const { email, password } = user;
  const client = await pool.connect();

  try {
    const getUserQueryResult = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    const userFromDB = getUserQueryResult.rows[0];

    if (!userFromDB) {
      throw new Error(`User not found`);
    }

    const comparePasswordFromUser = comparePassword(password, userFromDB.password);
    if (!comparePasswordFromUser) {
      throw new Error(`Password is incorrect`);
    }

    const userFromDBObject: User = {
      email: userFromDB.email,
      password: userFromDB.password,
    };

    const token = createToken(userFromDBObject);
    return token;
  } catch (err) {
    return Promise.reject(err);
  } finally {
    client.release();
  }
};
