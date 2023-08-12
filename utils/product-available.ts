import { IProductResponse } from "./type";
import { IProductRoot } from "./types/product";

export const CheckProductIsAvailable = (product: IProductResponse) => {
  let inStock = false;
  const productVariants = product.variants
    ? [product.defaultProductVariant, ...product.variants]
    : [product.defaultProductVariant];

  for (let variant of productVariants) {
    for (let item of variant.variants) {
      if (item.stock > 0) {
        inStock = true;
        break;
      }
    }
    if (inStock) break;
  }
  return inStock;
};

export const checkInStockProduct = (product: IProductRoot) => {
  let inStock = false;
  for (let item of product.variants) {
    if (item.stock > 0) {
      inStock = true;
      break;
    }
  }
  return inStock;
};
