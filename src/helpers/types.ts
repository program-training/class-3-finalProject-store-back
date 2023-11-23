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
}
const orderKeys = ["id", "cartItems", "orderTime", "status", "price", "shippingDetails"];
const productKeys = ["name", "salePrice", "quantity", "description", "category", "discountPercentage", "image"];

export { CartItem, Checkout, User, Product, Category, Order, OrderProduct, ShippingDetails, orderKeys, productKeys };