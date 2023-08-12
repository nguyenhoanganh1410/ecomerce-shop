import React from "react";
import { IFilterSearch, ISearchParams } from "@/utils/type";
import { ISlug } from "@/utils/types/params";
import { getColorsHandler } from "@/utils/sanity/colorService";
import { IColor } from "@/utils/types/product/color";
import DisclosureBlock from "./disclosure-block";
import useParamsHook from "@/hooks/useParamsHook";

interface IPropsFilter {
  data?: IFilterSearch[];
  querySearch: ISearchParams;
  params: ISlug;
}

export default async function ColorFilter({
  querySearch,
  params,
}: IPropsFilter) {
  const { colorParams } = useParamsHook({ searchParams: querySearch });
  const colors: IColor[] = await getColorsHandler();
  const colorsOption = [
    {
      id: "color",
      name: "color",
      searchInput: false,
      options: colors.map((value) => {
        if(colorParams.includes(value._id)) {
          return {
            value: value._id,
            label: value.name,
            checked: true,
          };
        }
        return {
          value: value._id,
          label: value.name,
          checked: false,
        };
      }),
    },
  ];

  return (
    <React.Fragment>
      <DisclosureBlock data={colorsOption} querySearch={querySearch} />
    </React.Fragment>
  );
}
