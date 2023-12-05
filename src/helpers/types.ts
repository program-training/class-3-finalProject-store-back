interface Product {
  _id: string;
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

interface CartItem {
  userId: string;
  product: Product;
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

interface Category {
  _id: string;
  name: string;
  img: string;
  __v: number;
}

interface OrderProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  cartItems: OrderProduct[];
  orderTime: string;
  status: "Pending" | "Delivered" | "Refunded";
  price: number;
  shippingDetails: ShippingDetails;
}

interface ShippingDetails {
  address: string;
  userId: number;
  contactNumber: string;
  orderType: "Pickup" | "Express" | "Shipping";
}

const orderKeys = ["id", "cartItems", "orderTime", "status", "price", "shippingDetails"];

const productKeys = ["name", "salePrice", "quantity", "description", "category", "discountPercentage", "image"];

export { CartItem, Checkout, User, Product, Category, Order, OrderProduct, ShippingDetails, orderKeys, productKeys };
