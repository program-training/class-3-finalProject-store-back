interface CartItem {
  productId: string;
  quantity: number;
}

interface Checkout {
  orderId: string;
  cartItems: CartItem[];
}

interface User {
  _id? : string,
  email: string;
  password: string;
  userId?: string;
}

interface Product {}
interface Category {}

interface Order {
  cartItems: Product[];
  orderTime: Date;
  status: string;
  price: number;
  shippingDetails: {
    address: string;
    contactNumber: string;
  };
}

export { CartItem, Checkout, User, Product, Category, Order };
