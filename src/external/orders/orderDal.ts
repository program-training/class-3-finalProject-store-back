import axios from "axios";
import { Order, orderKeys } from "../../types";
import { hasRequiredKeys } from "../../helpers/function";

export async function getOrderByUserDal(userId: string) {
  try {
    const result = await axios.get(`api/orders/${userId}`);
    if (result.statusText === "OK") {
    }
  } catch {}
}

export async function postOrderDal(requestBody: Order) {
  try {
    const result = await axios.post(`api/users`, requestBody);
    if (result.statusText === "OK" && hasRequiredKeys(result, orderKeys)) {
      return result.data;
    } else {
      throw { status: 404, message: `Product not found` };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
