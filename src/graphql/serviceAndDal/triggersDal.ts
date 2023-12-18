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

export const getTrrigerPostgres = async (): Promise<{ [hour: string]: number }> => {
  const client = await pool.connect();
  console.log(222);
  try {
    const result = await client.query<{ login_time: Date }>('SELECT login_time FROM reports');
    const dates = result.rows.map(row => new Date(row.login_time));
    const hourCount: { [hour: string]: number } = {};
    dates.forEach(date => {
      const hour = date.getHours().toString();
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
