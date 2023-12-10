import { CartReport } from "../helpers/types";
import { CartReportsModel } from "../monggoDB/models/cartReportModel";

export const getTimeTriggerDal = async () => {
  try {
    const cartReports: CartReport[] = await CartReportsModel.find({});
<<<<<<< HEAD
    return cartReports
=======
    console.log(cartReports);
    return cartReports;
>>>>>>> develop
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
