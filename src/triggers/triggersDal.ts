import { CartReport } from "../helpers/types";
import { CartReportsModel } from "../DB/models/cartReportModel";

export const getTimeTriggerDal = async () => {
  try {
    const cartReports: CartReport[] = await CartReportsModel.find({});
    console.log(cartReports);
    return cartReports
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};


