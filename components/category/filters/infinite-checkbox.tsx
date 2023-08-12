"use client";
import { ICheckBox, ISearchParams } from "@/utils/type";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ISlug } from "@/utils/types/params";
import { useSearchParams } from "next/navigation";
import { searchQuery } from "@/constants";
import { getDataCategories } from "@/utils/sanity/categoryService";

interface IProps {
  initValue: ICheckBox[];
  name: string;
  handleChange: any;
}

const InfiniteCheckBox = ({ initValue, name, handleChange }: IProps) => {
  const [items, setItems] = useState<ICheckBox[]>(initValue);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(12);
  const queryParams = useSearchParams();
  const typeParam = queryParams.get(searchQuery.type) || "";
  const subCategory =
    queryParams
      .get(searchQuery.subCategory)
      ?.split(",")
      .filter((item) => item != "") || [];
  const fetchData = async () => {
    const subCategoryIdList = await getDataCategories(typeParam, page, limit);
    const options = subCategoryIdList.map((val) => {
      if (subCategory.includes(val._id)) {
        return { value: val._id, label: val.title, checked: true };
      }
      return { value: val._id, label: val.title, checked: false };
    });
    setItems([...items, ...options]);
    setPage(page + 1);
  };

  return (
    <div
      id="scrollableDiv"
      className="pl-4 pt-2 space-y-4 max-h-[350px] custom overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300"
    >
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={true}
        loader={<></>}
        scrollableTarget="scrollableDiv"
        endMessage={
          <p className="mt-8 text-center">
            <span className="text-gray-500">Yay! You have seen it all</span>
          </p>
        }
      >
        {items.map((option, optionIdx) => (
          <div key={option.value} className="flex items-center pb-4">
            <label
              className={`capitalize font-normal text-xs  cursor-pointer text-[#44506F]`}
            >
              <input
                id={`filter-${option.value}-${optionIdx}`}
                defaultValue={option.value}
                type="checkbox"
                defaultChecked={option.checked}
                onChange={(e) => handleChange(e, option, name)}
                className="h-5 w-5 mr-3 rounded border-gray-300  cursor-pointer text-[#000000] focus:ring-[#000000]"
              />
              {option.label}
            </label>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
export default InfiniteCheckBox;
