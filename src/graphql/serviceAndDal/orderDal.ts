import axios from "axios";
import { Order, orderKeys } from "../../helpers/types";
import { hasRequiredKeys } from "../../helpers/function";

export async function getOrderByUserDal(userId: string) {
  try {
    const result = await axios.get(`/orders/${userId}`);
    const checkData = hasRequiredKeys(result.data, orderKeys);
    if (result.statusText !== "OK" && checkData) {
      throw new Error(`data can't found`);
    }
    return result.data as unknown as Order;
  } catch (error) {
    return error;
  }
}

export async function postOrderDal(requestBody: Order) {
  try {
    const result = await axios.post(`${process.env.BASE_URL_OSM}/api/orders`, requestBody);
    console.log(result.data, result.status, result.statusText);
    if (result.statusText !== `OK` && hasRequiredKeys(result.data, orderKeys)) {
      throw { status: 404, message: `Product not found(dal)` };
    } else {
      return result.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
