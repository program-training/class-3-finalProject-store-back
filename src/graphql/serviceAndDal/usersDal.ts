import { User } from "../../helpers/types";
import { createToken } from "../../helpers/jwt";
import { comparePassword, encryptPassword } from "../../helpers/bcrypt";
import { pool } from "../../postgresDB/postgres";

export const userRegister = async (user: User) => {
  const client = await pool.connect();
  const { email, password } = user;
  const usersPassword = encryptPassword(password);
  user.password = usersPassword;
  try {
    const uniquenessCheck = await client.query(`select * from users where email = $1`, [email]);
    if (uniquenessCheck.rows.length !== 0) throw Error(`This user is already registered!`);
    const newUser = await client.query(
      `INSERT INTO users (email, password)
    VALUES ($1, $2);`,
      [user.email, user.password]
    );
    if (newUser.rows.length === 1) {
      const token = createToken(user);
      return token;
    }
  } catch (err) {
    return Promise.reject(err);
  }
  client.release();
};

export const userLoginDal = async (user: User) => {
  const client = await pool.connect();
  try {
    const { email, password } = user;
    const userFromDB = await client.query(`select * from users where email = $1`, [email]);
    if (userFromDB.rows.length === 0) throw Error(`User not found`);
    const comparePasswordFromUser = comparePassword(password, userFromDB.rows[2]);
    if (!comparePasswordFromUser) throw Error(`Password is incorrect`);
    const userFromDBObject: User = JSON.parse(JSON.stringify(userFromDB.rows[0]));
    const token = createToken(userFromDBObject);
    return token;
  } catch (err) {
    return Promise.reject(err);
  }
};
