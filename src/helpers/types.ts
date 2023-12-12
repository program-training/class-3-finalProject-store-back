interface ServerContext  {
  token?: string
}

interface CartItem {
  userId: string;
  product: Product;
}

interface Product {
  _id: string
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  image: {
    large: string;
    medium: string;
    small: string;
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

interface OrderProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}
interface ShippingDetails {
  userId: number;
  address: string;
  contactNumber: string;
  orderType: string;
}
interface Order {
  id?: string;
  cartItems: OrderProduct[];
  orderTime: string;
  status: string;
  price: number;
  shippingDetails: ShippingDetails;
}
interface Time {
  time: {
    date: {
      year: number;
      month: number;
      day: number;
    };
    hour: number;
  }
}
interface CartReport {
  _id?: string
  user_id: string
  product_id: string
  time: Time
}
const orderKeys = ["id", "cartItems", "orderTime", "status", "price", "shippingDetails"];
const productKeys = ["name", "salePrice", "quantity", "description", "category", "discountPercentage", "image"];

export { ServerContext, CartItem, Checkout, User, Product, Category, Order, OrderProduct, ShippingDetails, CartReport, Time, orderKeys, productKeys };
