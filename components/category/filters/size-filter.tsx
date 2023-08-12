import React from "react";
import { IFilterSearch, ISearchParams } from "@/utils/type";
import useParamsHook from "@/hooks/useParamsHook";
import { getDataFilterHandler, getDataHandler } from "@/utils/methods";
import { ISlug } from "@/utils/types/params";
import DisclosureBlock from "./disclosure-block";
import { TYPE_REQUEST_SIZE } from "@/constants";

interface IPropsFilter {
  data?: IFilterSearch[];
  querySearch: ISearchParams;
  params: ISlug;
}

interface ISize {
  _id: string;
  name: string;
}

interface IObject {
  size: ISize;
}

interface IResultSizes {
  variants: IObject[];
}

export default async function FilterSizes({
  querySearch,
  params,
}: IPropsFilter) {
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
    keySearch
  } = useParamsHook({ searchParams: querySearch });

  const result: IResultSizes[] = await getDataFilterHandler(
    TYPE_REQUEST_SIZE,
    1,
    100,
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

  const list = result
    .map((item: IResultSizes) => {
      return item.variants;
    })
    .flat();
  const uniqueArray = uniqueObjects(list);
  const sizesOption = [
    {
      id: "size",
      name: "size",
      searchInput: false,
      options: uniqueArray
        .sort((a: IObject, b: IObject) =>
          a.size.name.localeCompare(b.size.name)
        )
        .map((value: IObject) => {
          if (sizeParams.includes(value.size._id)) {
            return {
              value: value.size._id,
              label: value.size.name,
              checked: true,
            };
          }
          return {
            value: value.size._id,
            label: value.size.name,
            checked: false,
          };
        }),
    },
  ];
  return (
    <React.Fragment>
      <DisclosureBlock data={sizesOption} querySearch={querySearch} />
    </React.Fragment>
  );
}

function uniqueObjects<T>(array: T[]): T[] {
  const uniqueMap = new Map<string, T>();

  for (const item of array) {
    const key = JSON.stringify(item);
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, item);
    }
  }

  return Array.from(uniqueMap.values());
}
