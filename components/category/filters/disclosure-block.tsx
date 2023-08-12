"use client";
import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Archivo } from "next/font/google";
import SearchIcon from "../../icons/search-icon";
import {
  IFilterSearch,
  IOptions,
  IQueryParamsOption,
  ISearchParams,
} from "@/utils/type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { color, price, searchQuery } from "@/constants";
import queryString from "query-string";
import { filters } from "@/utils/data";
const archivoScript = Archivo({ subsets: ["latin"] });

interface IPropsFilter {
  data: IFilterSearch[];
  onChange?: (text: string) => void;
  onCloseMobileTab?: (value: boolean) => void;
  querySearch: ISearchParams;
}

interface IFilter {
  brand: string[];
  color: string[];
  price: string[];
  size: string[];
}

export default function DisclosureBlock({
  data,
  onChange,
  querySearch,
}: IPropsFilter) {
  const route = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const pageSize = searchParams.get(searchQuery.limit) || 12;
  const page = searchParams.get(searchQuery.page) || 1;
  const pathType = searchParams.get(searchQuery.type);
  const searchText = searchParams.get(searchQuery.text);
  const subCategory = searchParams.get(searchQuery.subCategory);
  const sortParams = searchParams.get(searchQuery.sort);

  const [dataOptions, setDataOptions] = useState(data);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value || "");
    const newData = data[0].options.filter((item: IOptions) => {
      return (
        item.label.toUpperCase().indexOf(e.target.value.toUpperCase()) != -1
      );
    });
    setDataOptions([
      {
        ...dataOptions[0],
        options: newData,
      },
    ]);
  };

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    value: string,
    id?: string
  ) => {
    const brandsParams = querySearch.brand?.split(",") || [];
    const colorParams = querySearch.color?.split(",") || [];
    const priceParams = querySearch.price?.split(",") || [];
    const sizeParams = querySearch.size?.split(",") || [];

    let filterParams: IFilter = {
      brand: brandsParams,
      color: colorParams,
      price: priceParams,
      size: sizeParams,
    };

    if (e.target.checked) {
      if (type === "color") {
        filterParams.color = [...filterParams.color, id ? id : value];
      } else if (type === "brand") {
        filterParams.brand = [...filterParams.brand, id ? id : value];
      } else if (type === "size") {
        filterParams.size = [...filterParams.size, id ? id : value];
      } else {
        filterParams.price = [...filterParams.price, id ? id : value];
      }
    } else {
      if (type === "color") {
        filterParams.color = filterParams.color.filter((item: string) => {
          if (id) return item !== id;
          return item !== value;
        });
      } else if (type === "brand") {
        filterParams.brand = filterParams.brand.filter((item: string) => {
          if (id) return item !== id;
          return item !== value;
        });
      } else if (type === "size") {
        filterParams.size = filterParams.size.filter((item: string) => {
          if (id) return item !== id;
          return item !== value;
        });
      } else {
        filterParams.price = filterParams.price.filter((item: string) => {
          if (id) return item !== id;
          return item !== value;
        });
      }
    }

    let dataString: any = {};

    if (filterParams.brand.length > 0) {
      dataString.brand = filterParams.brand.toString();
    }
    if (filterParams.color.length > 0) {
      dataString.color = filterParams.color.toString();
    }
    if (filterParams.price.length > 0) {
      dataString.price = filterParams.price.toString();
    }
    if (filterParams.size.length > 0) {
      dataString.size = filterParams.size.toString();
    }

    let url = `&${queryString.stringify(dataString)}`;
    console.log(url);
    if (sortParams) {
      url += `&sort=${sortParams}`;
    }
    const string = searchText
      ? `?text=${searchText}&type=${pathType}&page=${1}&limit=${pageSize}`
      : `?type=${pathType}&page=${1}&limit=${pageSize}`;
    route.push(`${currentPath + string + url}`);
  };

  return (
    <React.Fragment>
      {dataOptions.map((section, idx: number) => (
        <Disclosure
          as="div"
          key={section.id}
          className={
            section.id !== price
              ? `border-b border-gray-200 py-6 ${
                  section.id === color ? "pt-0" : ""
                }`
              : "pt-6"
          }
          defaultOpen={true}
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span
                    className={`font-semibold text-[16px] text-[#06163F] capitalize`}
                  >
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>

              <Disclosure.Panel className="pt-6">
                <div className="p-[4px] space-y-4 max-h-[350px] custom overflow-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300">
                  {section.searchInput ? (
                    <div>
                      <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                      >
                        Search
                      </label>
                      <div className="relative h-[44px]">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <SearchIcon />
                        </div>
                        <input
                          type="search"
                          onChange={handleSearch}
                          id="default-search"
                          className="block text-xs placeholder-[#A9B2BF] text-[#A9B2BF] bg-white w-full h-[44px] pl-10 font-normal border border-[#A9B2BF] rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="SEARCH"
                        />
                      </div>
                    </div>
                  ) : null}
                  {section.options.map((option: any, optionIdx: number) => (
                    <div
                      key={option.value}
                      className="flex items-center cursor-pointer max-h-96 scroll-auto"
                    >
                      <label
                        className={`text-xs text-[#44506F] capitalize  cursor-pointer`}
                      >
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          className="h-5 w-5 mr-3 rounded text-[#000000] cursor-pointer"
                          onChange={(e) =>
                            // handleChange(e, section.id, option.value, option.id)
                            handleChangeValue(
                              e,
                              section.id,
                              option.value,
                              option.id
                            )
                          }
                        />
                        {option.label.toLowerCase()}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </React.Fragment>
  );
}
