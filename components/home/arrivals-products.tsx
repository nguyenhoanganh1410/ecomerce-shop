import { golobalUrl } from "@/utils/globalUrl";
import {
  getDataLastedProductHandler,
} from "@/utils/sanity/productService";
import Link from "next/link";
import CarouselComponent from "../carousel";
import { IProductRoot } from "@/utils/types/product";
const PAGE = 1;
const PAGE_SIZE = 12;

export default async function ArrivalsProductsComponent() {
  
  const data: IProductRoot[] = await getDataLastedProductHandler(
    PAGE,
    PAGE_SIZE
  );
  if (data.length === 0) return null;
  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20">
      <div className="sm:flex sm:items-baseline sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-black">
          New Arrivals
        </h2>
        <Link
          href={golobalUrl.category_newArrivals}
          className="text-sm font-semibold text-black hover:text-indigo-500 sm:block flex items-center"
        >
          SEE ALL
          <span aria-hidden="true" className="ml-1 mb-[16px]">
            {" "}
            &rarr;
          </span>
        </Link>
      </div>

      <div className="mt-8">
        <CarouselComponent relatedProducts={data} />
      </div>
    </div>
  );
}
