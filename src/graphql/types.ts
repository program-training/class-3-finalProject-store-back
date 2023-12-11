export const typeDefs = `
type Hello{
    text:String
    number:Int
}
type Query{
    hello:Hello
    getProducts:[IProduct]
    findById(_id:String!):IProduct
}

type IProduct{
    name:String!
    description:String
    price:Int!
    quantity:Int!
    image:String
    _id:String
}
type IUser{
    _id:ID!
    email: String!
    password: String!
}
input UserInput{
    email: String!
    password: String!
}
input ProductData{
    name:String
    description:String
    price:Int
    quantity:Int
    image:String
}
type Mutation{
    signUp(user:UserInput!):IUser!
    updateProduct(_id:String! productData:ProductData!):IProduct
    deleteProduct(_id:String!):IProduct
}

type Subscription{
    productCreated:IProduct
}
schema {
    query:Query
    mutation:Mutation
    subscription:Subscription
} 
`;
