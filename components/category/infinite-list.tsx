"use client";
import { getDataHandler, getListProfuct } from "@/utils/methods";
import { ISearchParams } from "@/utils/type";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ISlug } from "@/utils/types/params";
import { IProductRoot, IResponsiveProduct } from "@/utils/types/product";
import CardProduct from "./item-product";
import { useSearchParams } from "next/navigation";
import { searchQuery } from "@/constants";
import { checkInStockProduct } from "@/utils/product-available";

interface IProps {
  searchParams: ISearchParams;
  params: ISlug;
  total: number;
  initValue: IProductRoot[];
}

const InfiniteList = ({ searchParams, total, params, initValue }: IProps) => {
  const [items, setItems] = useState<IProductRoot[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(12);
  const queryParams = useSearchParams();

  const fetchData = async () => {
    const searchText = queryParams.get(searchQuery.text) || "";
    const subCategory = queryParams.get(searchQuery.subCategory)?.split(",") || [];
    const sortParam = queryParams.get(searchQuery.sort) || "";
    const brandsParams = queryParams.get(searchQuery.brand)?.split(",") || [];
    const colorParams = queryParams.get(searchQuery.color)?.split(",") || [];
    const priceParams = queryParams.get(searchQuery.price)?.split(",") || [];
    const sizeParams = queryParams.get(searchQuery.size)?.split(",") || [];
    const typeParam = queryParams.get(searchQuery.type) || "";

    const result: IResponsiveProduct = await getDataHandler(
      page,
      limit,
      brandsParams,
      colorParams,
      typeParam,
      priceParams,
      sortParam,
      subCategory,
      sizeParams,
      params.slug
    );
    setItems([...items, ...result.data]);
    setPage(page + 1);
  };

  useEffect(() => {
    setItems([]);
    fetchData();
  }, [searchParams]);

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={items.length === total ? false : true}
      loader={<></>}
      //loader={<p className="text-sm mt-3 font-medium">Loading...</p>}
      endMessage={
        <p className="mt-8 text-center">
          <span className="text-gray-500">Yay! You have seen it all</span>
        </p>
      }
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-4 xl:gap-x-8 transition-all">
        {items.map((product: IProductRoot) => {
          const inStock = checkInStockProduct(product);
          return <CardProduct key={product._id} product={product} outStock={!inStock}/>;
        })}
      </div>
    </InfiniteScroll>
  );
};
export default InfiniteList;
