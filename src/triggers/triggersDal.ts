import { CartReport } from "../helpers/types";
import { CartReportsModel } from "../mongoDB/models/cartReportModel";

export const getTimeTriggerDal = async () => {
  try {
    const cartReports: CartReport[] = await CartReportsModel.find({});
    return cartReports
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};