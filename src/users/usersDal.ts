import { User } from "../helpers/types";
import { createToken } from "../helpers/jwt";
import { comparePassword } from "../helpers/bcrypt";
import { pool } from "../postgresDB/postgres";

export const userRegisterDal = async (user: User) => {
  const client = await pool.connect();
  const { email } = user;
  try {
    const uniquenessCheck = await client.query(`select * from users where email = $1`, [email]);
    if (uniquenessCheck.rows.length !== 0) throw Error(`This user is already registered!`);
    const newUser = await client.query(
      `INSERT INTO Users (email, password)
    VALUES ($1, $2);`,
      [user.email, user.password]
    );
    console.log(newUser.rows);
    if (newUser.rows) {
      const token = createToken(user);
      return token;
    }
  } catch (err) {
    return Promise.reject(err);
  } finally {
    client.release();
  }
  client.release();
};

export const userLoginDal = async (user: User) => {
  const client = await pool.connect();
  try {
    const { email, password } = user;
    const userFromDB = await client.query(`select * from users where email = $1`, [email]);
    if (userFromDB.rows.length === 0) throw Error(`User not found`);
    const comparePasswordFromUser = comparePassword(password, userFromDB.rows[0].password);
    if (!comparePasswordFromUser) throw Error(`Password is incorrect`);
    const userFromDBObject: User = JSON.parse(JSON.stringify(userFromDB.rows[0].id));
    console.log(userFromDB.rows);
    const token = createToken(userFromDBObject);
    return token;
  } catch (err) {
    return Promise.reject(err);
  } finally {
    client.release();
  }
};

