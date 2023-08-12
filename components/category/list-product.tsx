import useParamsHook from "@/hooks/useParamsHook";
import { getDataHandler } from "@/utils/methods";
import { IPropsParams } from "@/utils/type";
import { IProductRoot, IResponsiveProduct } from "@/utils/types/product";
import CardProduct from "./item-product";
import React from "react";
import Pagination from "../panigation";
import EmptyDataComponent from "../empty-component";
import ListNumber from "./list-number";
import MyCombobox from "../combobox";
import ButtonFilter from "./filters/filter-button";
import InfiniteList from "./infinite-list";
import { checkInStockProduct } from "@/utils/product-available";

const SHOW_ALL_VALUE = 10000;
const ListProduct = async ({ params, searchParams }: IPropsParams) => {
  const {
    brandsParams,
    colorParams,
    priceParams,
    sizeParams,
    sortParam,
    typeParam,
    page,
    limit,
    subCategory,
    keySearch,
  } = useParamsHook({ searchParams });
  const pageSize = limit == SHOW_ALL_VALUE ? 12 : limit;
  const result: IResponsiveProduct = await getDataHandler(
    page,
    pageSize,
    brandsParams,
    colorParams,
    typeParam,
    priceParams,
    sortParam,
    subCategory,
    sizeParams,
    params.slug,
    keySearch
  );
  const { data, total } = result;

  return (
    <React.Fragment>
      <div>
        <div className="">
          {/* {keySearch ? null : (
            <h1 className="text-[40px] font-semibold tracking-tight text-[#212529] mb-4 capitalize">
              {params.slug?.replace("-", " ")}
            </h1>
          )} */}
          <h1 className="text-[40px] font-semibold tracking-tight text-[#212529] mb-4 capitalize">
            {params.slug?.replace("-", " ")}
          </h1>
          <div className="mt-2 pb-5 text-sm grid grid-cols-2 sm:flex sm:justify-between items-center">
            <dl className="flex">
              <dd className="font-bold text-xs text-textColor">
                {(Number(page) - 1) * Number(limit) + 1} -{" "}
                {(Number(page) - 1) * Number(limit) + data.length}
              </dd>
              <dt className="text-gray-500 mx-1 text-xs"> of</dt>
              <dd className="font-bold text-xs mr-1 text-textColor">{total}</dd>
              <dt className="text-gray-500 text-xs"> items</dt>
            </dl>
            <dl className="flex justify-end">
              <dd className="font-bold text-xs mr-3 text-textColor">Show: </dd>
              <ListNumber searchParams={searchParams} params={params} />
            </dl>
            <div className="mt-4 sm:mt-0 w-max flex justify-around">
              <MyCombobox searchParams={searchParams} />
              <ButtonFilter />
            </div>
          </div>
        </div>
        <>
          {limit != SHOW_ALL_VALUE ? (
            <>
              {data.length === 0 ? (
                <EmptyDataComponent />
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-4 xl:gap-x-8 transition-all">
                    {data &&
                      data.map((product: IProductRoot) => {
                        const inStock = checkInStockProduct(product);
                        return (
                          <CardProduct
                            key={product._id}
                            product={product}
                            outStock={!inStock}
                          />
                        );
                      })}
                  </div>
                  <Pagination
                    pageCount={Math.ceil(total / limit)}
                    searchParams={searchParams}
                    currentPage={+page}
                  />
                </>
              )}
            </>
          ) : (
            <InfiniteList
              searchParams={searchParams}
              params={params}
              total={Math.ceil(total / limit)}
              initValue={data}
            />
          )}
        </>
      </div>
    </React.Fragment>
  );
};
export default ListProduct;
