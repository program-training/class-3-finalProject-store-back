import axios from "axios";
import { Order, orderKeys } from "../../types";

export async function getOrderByUserDal(userId: string) {
  try {
    const result = await axios.get(`api/orders/${userId}`);
    if (result.statusText !== "OK") {
      throw new Error(`data can't found`);
    }
    return result.data as unknown as Order;
  } catch (error) {
    return error;
  }
}
