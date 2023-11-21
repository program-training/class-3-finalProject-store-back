import { getOrderByUserDal } from "./orderDal";

export async function getOrderByUserService() {
  return await getOrderByUserDal();
}
