import { getOrderByUserDal, postOrderDal } from "./orderDal";
import { Order } from "../../types";

export async function getOrderByUserService() {
  return await getOrderByUserDal();
}

export async function postOrderService(requestBody: Order) {
  return await postOrderDal(requestBody);
}
