import { Product } from "../../internal/products/productModel";

export const getAllProductsDal = async () => {
  const products = await Product.find({});
  console.log(products);
  return products;
};

export const productDal = async (productId: string) => {
  try {
    const productResult = await Product.findOne({ _id: productId });
    if (productResult) {
      return productResult;
    } else throw Error(`Product not  find (dal erorrs)`);
  } catch (err) {
    return err;
  }
};
