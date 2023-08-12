"use client";
import useParamsHook from "@/hooks/useParamsHook";
import { IPropsParams } from "@/utils/type";
import React from "react";
import { dataShow } from "@/utils/data";
import { usePathname, useRouter } from "next/navigation";
import queryString from "query-string";

const ListNumber = ({ params, searchParams }: IPropsParams) => {
  const { limit } = useParamsHook({ searchParams });

  const route = useRouter();
  const pathName = usePathname();

  const handleChangeShow = (item: { id: string; number: string }) => {
    searchParams.limit = +item.number;
    searchParams.page = 1;
    const queryParams = queryString.stringify(searchParams);
    route.push(`${pathName + `?${queryParams}`}`);
    route.refresh();
  };

  return (
    <React.Fragment>
      {dataShow.map((item, idx) => {
        return (
          <dt
            key={item.id}
            onClick={() => handleChangeShow(item)}
            className={`text-xs cursor-pointer hover:opacity-50 capitalize ${
              idx === 1 ? "mx-3" : ""
            } ${
              limit == +item.number
                ? "text-textColor font-bold"
                : "text-gray-500"
            }`}
          >
            {Number(item.number) == 10000 ? "All" : item.number}
          </dt>
        );
      })}
    </React.Fragment>
  );
};
export default ListNumber;
