import axios from "axios";

export async function getOrderByUserDal(userId: string) {
  try {
    const result = await axios.get(`api/orders/${userId}`);
    if (result.statusText === "OK") {
    }
  } catch {}
}
