import { CartReport } from "../helpers/types";
import { CartReportsModel } from "../mongoDB/models/cartReportModel";
import { pool } from "../postgresDB/postgres";

export const getTimeTriggerDal = async () => {
  try {
    const cartReports: CartReport[] = await CartReportsModel.find({});
    return cartReports;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const getUsersTimeTriggerDal = async () => {
  const client = await pool.connect();
  try {
    const userTrigerrrFromDB = await client.query(`select time from report`);
    if (!userTrigerrrFromDB) throw Error(`User not found`);
    const userFromDBObject: string = JSON.parse(JSON.stringify(userTrigerrrFromDB.rows[0]));
  } catch (err) {
    return Promise.reject(err);
  }
};
