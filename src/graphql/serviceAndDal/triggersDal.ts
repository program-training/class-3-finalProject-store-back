import { CartReport } from "../../helpers/types";
import { CartReportsModel } from "../../mongoDB/models/cartReportModel";
import { pool } from "../../postgresDB/postgres";

export const getTimeTriggerDal = async () => {
  try {
    const cartReports: CartReport[] = await CartReportsModel.find({});
    console.log(cartReports);
    return cartReports;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const getTrrigerPostgresDal = async () => {
  const client = await pool.connect();
  const hourCount: { [hour: string]: number } = {};
  try {
    const result = await client.query("SELECT login_time FROM reports");
    if (result.rows.length === 0) throw result;
    const dates = result.rows.map((row) => {
      const hour = new Date(row.login_time).getHours().toString();
      hourCount[hour] = (hourCount[hour] || 0) + 1;
    });
    return hourCount;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  } finally {
    client.release();
  }
};
