interface CartItem {
  productId: string;
  quantity: number;
}

interface Product {
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  image: {
    url: string;
    alt: string;
  };
}
interface Checkout {
  orderId: string;
  cartItems: CartItem[];
}

interface User {
  _id?: string;
  email: string;
  password: string;
  userId?: string;
}

interface Category {}

interface Order {
  id: string;
  cartItems: OrderProduct[];
  orderTime: string;
  status: string;
  price: number;
  shippingDetails: ShippingDetails;
}
<<<<<<< HEAD
interface OrderProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}
interface ShippingDetails {
  address: string;
  userId: number;
  contactNumber: string;
  orderType: string;
  id: string;
}
const orderKeys = ["id", "cartItems", "orderTime", "status", "price", "shippingDetails"];
=======
export const productKeys: string[] = ["name", "salePrice", "quantity", "description", "category", "discountPercentage", "image"];
>>>>>>> 8c7c81e76a7c7437d040f7ee3af0a519344d34cd

export { CartItem, Checkout, User, Product, Category, Order, OrderProduct, ShippingDetails, orderKeys };
