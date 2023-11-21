import axios from "axios";
import { Order, orderKeys } from "../../types";
import { hasRequiredKeys } from "../../helpers/function";

export async function getOrderByUserDal(userId: string) {
  try {
    const result = await axios.get(`api/orders/${userId}`);
    const checkData = hasRequiredKeys(result.data, orderKeys);
    if (result.statusText !== "OK" && checkData) {
      throw new Error(`data can't found`);
    }
    return result.data as unknown as Order;
  } catch (error) {
    return error;
  }
}
