import Image from "next/image";
import {
  getDataLastedProductHandler,
} from "@/utils/sanity/productService";
import Link from "next/link";
import { USDollar } from "@/utils/dollarFomat";
import { checkInStockProduct } from "@/utils/product-available";
import { IProductRoot } from "@/utils/types/product";

const PAGE = 2;
const PAGE_SIZE = 12;
export default async function ProductListComponent() {
  const data: IProductRoot[] = await getDataLastedProductHandler(
    PAGE,
    PAGE_SIZE
  );
  if (data.length === 0) return null;
  return (
    <div className="mx-auto mt-10 lg:mt-24 px-6 max-w-[1440px] overflow-hidden sm:px-6 lg:px-20">
      <h2 className="sr-only">Products</h2>
      <div className="-mx-px grid grid-cols-2 gap-6 sm:pl-2 sm:mr-2 md:grid-cols-3 lg:grid-cols-6">
        {data.map((product) => {
          const inStock = checkInStockProduct(product);
          return (
            <div key={product._id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <Image
                  src={product.images[0].url}
                  fill
                  className="h-full w-full object-contain sm:object-cover"
                  alt={product.title}
                />
                <div className="absolute z-1 top-0 flex justify-between w-full align-center p-4">
                  <div className="flex flex-col">
                    {!inStock ? (
                      <div className="w-[60px] h-[20px] bg-[#F24C3D] flex justify-center items-center rounded ml-[-8px] mt-2">
                        <span className="text-[11px] font-bold text-[#FFFFFF]">
                          Sold Out
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
                {!inStock ? (
                  <div className="absolute z-1 bottom-0 flex justify-between w-full align-center">
                    <div className="w-full absolute h-[40px] bottom-0 bg-textColor flex justify-center items-center rounded opacity-75">
                      <span className="text-[11px] font-bold text-[#FFFFFF]">
                        Item Unavailable
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="pb-4 pt-3.5 text-start">
                <h3 className="text-sm font-bold text-[15px] text-gray-900">
                  <Link href={`product/${product.slug.current}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.title.length > 25
                      ? product.title.substring(0, 22) + "..."
                      : product.title}
                  </Link>
                </h3>
                <p className="mt-2 text-xs font-normal text-gray-900">
                  {USDollar.format(
                    product.variants[0].price || 0
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
