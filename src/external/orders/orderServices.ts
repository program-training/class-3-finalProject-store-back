import { getOrderByUserDal } from "./orderDal";

export async function getOrderByUserService(userId: string) {
  return await getOrderByUserDal(userId);
}
