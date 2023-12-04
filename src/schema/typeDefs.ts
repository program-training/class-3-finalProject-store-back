const typeDefs = `#graphql
type Image {
  url: String!
  alt: String!
}

type Product {
  _id: String!
  name: String!
  salePrice: Float!
  quantity: Int!
  description: String!
  category: String!
  discountPercentage: Float!
  image: Image!
}

type CartItem {
  userId: String!
  product: Product!
}

type Checkout {
  orderId: String!
  cartItems: [CartItem!]!
}

type User {
  _id: String
  email: String!
  password: String!
}

type Category {
  _id: String!
  name: String!
  img: String!
  __v: Int!
}

type OrderProduct {
  _id: String!
  name: String!
  description: String!
  price: Float!
  quantity: Int!
}

type ShippingDetails {
  address: String!
  userId: String!
  contactNumber: String!
  orderType: String!
}

type Order {
  id: String!
  cartItems: [OrderProduct!]!
  orderTime: String!
  status: String!
  price: Float!
  shippingDetails: ShippingDetails!
}

enum OrderStatus {
  PENDING
  DELIVERED
  REFUNDED
}

enum OrderType {
  PICKUP
  EXPRESS
  SHIPPING
}

type Query {
  getAllProducts(categoryName: String): [Product]!
  getProduct(productId: ID!): Product
  getCategories: [Category]!
  similarProducts(categoryName: String, quantity: Int): [Product]!
  getOrderByUser(userId: String!):Order
}

type Mutation {
    regestier(user: User!): string
    login(user: User!): string
    postOrderCart(order: Order!) Order!
    }
`;
