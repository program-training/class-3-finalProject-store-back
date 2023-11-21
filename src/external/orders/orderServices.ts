import { getOrderByUserDal,postOrderDal } from "./orderDal";

export async function getOrderByUserService() {
  return await getOrderByUserDal();
}

export async function postOrderService(requestBody: CheckoutInterface) {
  return await postOrderDal(requestBody);
}
