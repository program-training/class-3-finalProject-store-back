import axios from "axios";

export async function getOrderByUserDal(userId: string) {
  try {
    const result = await axios.get(`api/orders/${userId}`);
    if (result.statusText === "OK") {
    }
  } catch {}
}

export async function postOrderDal(requestBody: CheckoutInterface) {
  try {
    const result = await axios.post(`api/users`, requestBody);
    if (result.statusText === "OK") {
      return result.data;
    } else {
      throw { status: 404, message: `Product not found` };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
