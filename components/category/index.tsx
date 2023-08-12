import { Suspense } from "react";
import Image from "next/image";
import Breadcrumbs from "../breadcrumbs";
import { ISearchParams } from "@/utils/type";
import ButtonScroll from "./button-scroll";
import ListProduct from "./list-product";
import { ISlug } from "@/utils/types/params";
import Filter from "./filters";
import FilterMobile from "./filters/filter-mobile";
import FilterCategory from "./filters/filter-category";

interface IProps {
  searchParams: ISearchParams;
  params: ISlug;
}

export default function CategoryPage({ searchParams, params }: IProps) {
  return (
    <div className="bg-[#F8F8F8] pb-4 lg:pb-12">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[74px]">
        <Breadcrumbs data={[params.slug?.replace("-", " ") || ""]} />
        <div>
          <FilterMobile>
            <Suspense fallback={<p>Loading...</p>}>
              {/* @ts-expect-error Server Component */}
              <Filter querySearch={searchParams} params={params} />
            </Suspense>
          </FilterMobile>
          <main className="mx-auto sm:px-6 lg:px-0">
            <section aria-labelledby="products-heading">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <div className="hidden h-fit lg:block bg-[#FFFFFF] rounded-lg border-[#E8E8E8] border-[1px]">
                  <form className="pt-4 pb-4">
                    {/* @ts-expect-error Server Component */}
                    <FilterCategory
                      querySearch={searchParams}
                      params={params}
                    />
                  </form>
                  <form className="p-4">
                    <Suspense fallback={<p>Loading...</p>}>
                      {/* @ts-expect-error Server Component */}
                      <Filter querySearch={searchParams} params={params} />
                    </Suspense>
                  </form>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:gap-y-10 lg:col-span-3 lg:gap-x-8 h-max">
                  {searchParams.text && searchParams.text.length > 0 ? (
                    <p className="text-[#212529] font-semibold text-xl break-words">
                      You searched for “{searchParams.text}”
                    </p>
                  ) : (
                    <div className="overflow-hidden relative  group aspect-w-3 aspect-h-1 max-h-[298px]">
                      <Image src="/banner.png" fill alt="" />
                    </div>
                  )}
                  <Suspense fallback={<p>Loading...</p>}>
                    {/* @ts-expect-error Server Component */}
                    <ListProduct searchParams={searchParams} params={params} />
                  </Suspense>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <ButtonScroll />
    </div>
  );
}
