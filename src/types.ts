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
  userId: string;
  email: string;
  password: string;
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
