import { User, UserInput } from "../../helpers/types";
import { createToken } from "../../helpers/jwt";
import { comparePassword, encryptPassword } from "../../helpers/bcrypt";
import { pool } from "../../postgresDB/postgres";

export const userRegister = async (user: User) => {
  const client = await pool.connect();
  console.log(user);

  const { email, password } = user;
  const usersPassword = encryptPassword(password);
  user.password = usersPassword;
  console.log(user.password);

  try {
    const uniquenessCheck = await client.query(
      `select * from users where email = $1`,
      [email]
    );
    console.log(uniquenessCheck.rows);

    if (uniquenessCheck.rows.length !== 0) {
      throw Error(`This user is already registered!`);
    }
    const newUser = await client.query(
      `INSERT INTO USERS (email,password)
    VALUES ($1, $2);`,
      [user.email, user.password]
    );
    console.log(newUser.rows);
    if (newUser.rows.length > 0) {
      const token = createToken(user);
      return token;
    }
  } catch (err) {
    return Promise.reject(err);
  }
  client.release();
};

export const userLoginDal = async (user: UserInput) => {
  const client = await pool.connect();
  try {
    const { email, password } = user.userInput;
    const userFromDB = await client.query(
      `select * from users where email = $1`,
      [email]
    );
    console.log(userFromDB.rows);
    
    if (userFromDB.rows.length === 0) throw Error(`User not found`);
    const comparePasswordFromUser = comparePassword(
      password,
      userFromDB.rows[0].password
    );
    console.log(comparePasswordFromUser);
    
    if (!comparePasswordFromUser) throw Error(`Password is incorrect`);
    // const userFromDBObject = JSON.parse(
    //   JSON.stringify(userFromDB.rows[0])
    // );
    // console.log(userFromDBObject);

    console.log("pppfff");
    
    const token = createToken(userFromDB.rows[0]);
    return token;
  } catch (err) {
    return Promise.reject(err);
  }
};
