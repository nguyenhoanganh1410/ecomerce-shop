import React from "react";
import { IFilterSearch, ISearchParams } from "@/utils/type";
import useParamsHook from "@/hooks/useParamsHook";
import { getDataFilterHandler } from "@/utils/methods";
import { ISlug } from "@/utils/types/params";
import DisclosureBlock from "./disclosure-block";
import { TYPE_REQUEST_BRAND } from "@/constants";

interface IPropsFilter {
  data?: IFilterSearch[];
  querySearch: ISearchParams;
  params: ISlug;
}

export default async function FilterBrand({
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

  const result = await getDataFilterHandler(
    TYPE_REQUEST_BRAND,
    page,
    limit,
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
  const uniqueArray = uniqueObjects(result);

  const brandsOption = [
    {
      id: "brand",
      name: "brand",
      searchInput: true,
      options: uniqueArray.map((value: any) => {
        if (brandsParams.includes(value?.brand?._id)) {
          return {
            value: value?.brand?._id,
            label: value?.brand?.name,
            checked: true,
            color: value?.brand?.name,
          };
        }
        return {
          value: value?.brand?._id,
          label: value?.brand?.name,
          checked: false,
          color: value?.brand?.name,
        };
      }),
    },
  ];
  return (
    <React.Fragment>
      <DisclosureBlock data={brandsOption} querySearch={querySearch} />
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
