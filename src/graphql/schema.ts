const typeDefs = `#graphql
type Image {
  large: String!
  medium: String!
  small: String!
  alt: String!
}

input ImageInput {
  large: String!
  medium: String!
  small: String!
  alt: String!
}

type Product {
  _id: ID!
  name: String!
  salePrice: Float!
  quantity: Float!
  description: String!
  category: String!
  discountPercentage: Float!
  image: Image!
}

input ProductInput {
  _id: ID!
  name: String!
  salePrice: Float!
  quantity: Float!
  description: String!
  category: String!
  discountPercentage: Float!
  image: ImageInput!
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
  _id: String!
  cartItems: [OrderProduct!]!
  orderTime: String!
  status: String!
  price: Float!
  shippingDetails: ShippingDetails!
}

type Token {
token: String!
}

input CartItemUpdateInput {
   _id: String
   product: ProductInput
}

input UserInput {
  email: String
  password: String
}

input DeleteCartInput {
  productId: String
  userId: String
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

type TrrigerCart {
  trrigerCart: String
}

type TrrigerPostgres {
  triggerUser: TrrigerUserHourlyCount!
}

type TrrigerUserHourlyCount {
  hour:  String!
  count: Int!
}

type Query {
  getAllProducts(categoryName: String): [Product]!
  getProduct(productId: ID!): Product
  getCategories: [Category]!
  similarProducts(categoryName: String, quantity: Int): [Product]!
  getOrderByUser(userId: String!): Order
  getCartByUser(userId: String!): [CartItem]
  getTrrigerCart: TrrigerCart
  getTriggerPostgres: TrrigerPostgres

}

type Mutation {
  register(userInput: UserInput!): Token!
  login(userInput: UserInput!):Token!
  postOrderCart(order: CartItemUpdateInput!): CartItem
  addCartItem( cartItem: CartItemUpdateInput!): CartItem
  deleteCartItem(deleteCartInput: DeleteCartInput ): CartItem
}
`;
export default typeDefs;
