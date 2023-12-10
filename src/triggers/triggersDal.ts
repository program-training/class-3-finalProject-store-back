import { CartReport } from "../helpers/types";
import { CartReportsModel } from "../mongoDB/models/cartReportModel";
import { pool } from "../postgresDB/postgres";

export const getTimeTriggerDal = async () => {
  try {
    const cartReports: CartReport[] = await CartReportsModel.find({});
    return cartReports
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const getUserTriggerDal = async () => {
  const client = await pool.connect();
  try {
    const trigerr = await client.query(`SELECT  hours FROM usersReports`);
    if (!trigerr.rows) {
      throw new Error(`trigerr not found`);
    } else {
      return trigerr.rows;
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  } finally {
    client.release();
  }
};
