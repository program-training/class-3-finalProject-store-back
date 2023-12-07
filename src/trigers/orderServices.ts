import { getOrderByUserDal, postOrderDal } from "./orderDal";
import { Order } from "../helpers/types";

export async function getOrderByUserService(userId: string) {
  return await getOrderByUserDal(userId);
}

export async function postOrderService(requestBody: Order) {
  return await postOrderDal(requestBody);
}
