import { CartReport } from "../../helpers/types";
import { CartReportsModel } from "../../mongoDB/models/cartReportModel";
import { pool } from "../../postgresDB/postgres";

export const getTriggerMongoDal = async () => {
  const hourCount: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  try {
    const cartReports: CartReport[] = await CartReportsModel.find({});
    cartReports.forEach((trigger) => {
      const hour = new Date(trigger.date).getHours();
      hourCount[hour] += 1;
    });
    return hourCount;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const getTriggerPostgresDal = async () => {
  const client = await pool.connect();
  const hourCount: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  try {
    const result = await client.query("SELECT login_time FROM reports");
    if (result.rows.length === 0) throw result;
    result.rows.map((row) => {
      const hour = new Date(row.login_time).getHours();
      hourCount[hour] += 1;
    });
    return hourCount;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  } finally {
    client.release();
  }
};
