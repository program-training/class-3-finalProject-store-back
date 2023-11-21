import { Product } from "../types";
import { productKeys } from "../types";

const hasRequiredKeys = (obj: Record<string, any>, keys: string[]): obj is Product => {
  return keys.every((key) => key in obj);
};

// const test = {
//   salePrice: "173.00",
//   name: "Jana Nitzsche",
//   quantity: 73,
//   description: "description 1",
//   category: "category 1",
//   discountPercentage: 17,
//   image: { url: "2024-06-10T11:00:01.707Z", alt: "2023-03-08T17:27:10.152Z" },
// };

// hasRequiredKeys(test, productKeys);
