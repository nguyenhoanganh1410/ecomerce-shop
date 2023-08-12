import React, { Suspense } from "react";
import { IFilter, IFilterSearch, ISearchParams } from "@/utils/type";
import { ISlug } from "@/utils/types/params";
import FilterSubCategory from "./filter-category-component";
import useParamsHook from "@/hooks/useParamsHook";
import { getDataCategories } from "@/utils/sanity/categoryService";
import { PRODUCT_TYPE } from "@/constants";

interface IPropsFilter {
  querySearch: ISearchParams;
  params: ISlug;
}
const PAGE = 1;
const PAGE_SIZE = 12;
export default async function FilterCategory({
  querySearch,
  params,
}: IPropsFilter) {
  const { typeParam, subCategory } = useParamsHook({
    searchParams: querySearch,
  });

  let optionsData: IFilter[] = [];
  if (typeParam !== PRODUCT_TYPE.shop) {
    const subCategoryIdList = await getDataCategories(
      typeParam,
      PAGE,
      PAGE_SIZE
    );
    optionsData = [
      {
        id: 43243,
        name: "Product Type",
        subFilter: [
          {
            id: "sub01",
            name: typeParam,
            options: subCategoryIdList.map((val) => {
              if (subCategory.includes(val._id)) {
                return { value: val._id, label: val.title, checked: true };
              }
              return { value: val._id, label: val.title, checked: false };
            }),
          },
        ],
      },
    ];
  } else {
    const [men, women] = await Promise.all([
      getDataCategories(PRODUCT_TYPE.men, PAGE, PAGE_SIZE),
      getDataCategories(PRODUCT_TYPE.women, PAGE, PAGE_SIZE),
    ]);
    optionsData = [
      {
        id: 43243,
        name: "Product Type",
        subFilter: [
          {
            id: "sub01",
            name: "Men",
            options: men.map((val) => {
              if (subCategory.includes(val._id)) {
                return { value: val._id, label: val.title, checked: true };
              }
              return { value: val._id, label: val.title, checked: false };
            }),
          },
          {
            id: "sub02",
            name: "Women",
            options: women.map((val) => {
              if (subCategory.includes(val._id)) {
                return { value: val._id, label: val.title, checked: true };
              }
              return { value: val._id, label: val.title, checked: false };
            }),
          },
        ],
      },
    ];
  }
  return (
    <React.Fragment>
      <Suspense fallback={<Loading text="Loading" />}>
        <FilterSubCategory data={optionsData} searchParams={querySearch} />
      </Suspense>
    </React.Fragment>
  );
}

const Loading = ({ text }: { text: string }) => {
  return (
    <p className={`font-semibold text-[16px] text-[#06163F] capitalize pt-2`}>
      {text}...
    </p>
  );
};
