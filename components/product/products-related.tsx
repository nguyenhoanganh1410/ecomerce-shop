import { IProductResponse } from "@/utils/type";
import CarouselComponent from "../carousel";
import { fetchProductsWithIdCategory, fetchProductsWithIdCategoryHandler } from "@/utils/sanity/productService";
import { use } from "react";
import { CheckProductIsAvailable, checkInStockProduct } from "@/utils/product-available";
import { IProductRoot } from "@/utils/types/product";
interface Iprops {
  data: IProductRoot;
}
const page = 1;
const pageSize = 24
const ListProductsRelated = ({ data }: Iprops) => {
  const relatedProducts: IProductRoot[] = use(
    fetchProductsWithIdCategoryHandler(data.category[0]?._id, data._id, page, pageSize)
  );
  const relatedProductsInStock = relatedProducts.filter((product) => {
    return checkInStockProduct(product);
  });
  return (
    <div className="mt-5 md:mt-10">
      <h2 className="text-[19px] mb-4 font-bold text-gray-900 text-center">
        You might also like these
      </h2>
      {relatedProductsInStock.length > 0 ? (
        <CarouselComponent relatedProducts={relatedProductsInStock} />
      ) : null}
    </div>
  );
};

export default ListProductsRelated;
