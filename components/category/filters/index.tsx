import React, { Suspense } from "react";
import { IFilterSearch, ISearchParams } from "@/utils/type";
import { ISlug } from "@/utils/types/params";
import { filters } from "@/utils/data";
import DisclosureBlock from "./disclosure-block";
import ColorFilter from "./color-filter";
import FilterBrand from "./brand-filter";
import FilterSizes from "./size-filter";
import useParamsHook from "@/hooks/useParamsHook";

interface IPropsFilter {
  data?: IFilterSearch[];
  onChange?: (text: string) => void;
  onCloseMobileTab?: (value: boolean) => void;
  querySearch: ISearchParams;
  params: ISlug;
}

export default async function Filter({ querySearch, params }: IPropsFilter) {
  const { priceParams } = useParamsHook({ searchParams: querySearch });
  if (priceParams) {
    const newOption = filters[0].options.map((item) => {
      if (priceParams.includes(item.value)) {
        return { value: item.value, label: item.label, checked: true };
      }
      return { value: item.value, label: item.label, checked: false };
    });

    filters[0].options = newOption;
  }

  return (
    <React.Fragment>
      <Suspense fallback={<Loading text="Color" />}>
        {/* @ts-expect-error Server Component */}
        <ColorFilter querySearch={querySearch} />
      </Suspense>
      <Suspense fallback={<Loading text="Brand" />}>
        {/* @ts-expect-error Server Component */}
        <FilterBrand querySearch={querySearch} params={params} />
      </Suspense>
      <Suspense fallback={<Loading text="Size" />}>
        {/* @ts-expect-error Server Component */}
        <FilterSizes querySearch={querySearch} params={params} />
      </Suspense>
      <DisclosureBlock data={filters} querySearch={querySearch} />
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
