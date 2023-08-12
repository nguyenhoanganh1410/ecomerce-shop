"use client";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Archivo } from "next/font/google";
import { ICheckBox, IFilter, ISearchParams } from "@/utils/type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { searchQuery } from "@/constants";
import InfiniteCheckBox from "./infinite-checkbox";

const archivoScript = Archivo({ subsets: ["latin"] });

interface IPropsFilter {
  data: IFilter[];
  searchParams: ISearchParams;
}

export default function FilterSubCategory({
  data,
  searchParams,
}: IPropsFilter) {
  const route = useRouter();
  const currentPath = usePathname();
  const params = useSearchParams();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: ICheckBox,
    parentName: string
  ) => {
    let subCategoryList =
      params
        .get(searchQuery.subCategory)
        ?.split(",")
        .filter((item) => item != "") || [];
    const path = currentPath?.split("/").filter((item) => item != "")[0];
    const slugUrl = currentPath?.split("/").filter((item) => item != "")[1];
    if (e.target.checked) {
      subCategoryList.push(value.value);
      searchParams.page = 1;
      searchParams.type = parentName.toLowerCase();
      searchParams.subCategory = subCategoryList.toString();
      const queryParams = queryString.stringify(searchParams);

      if (subCategoryList.length === 1) {
        route.push(
          `${
            path +
            `/${parentName.toLowerCase()}` +
            `?type=${parentName.toLowerCase()}&limit=12&page=1&subCategory=${
              value.value
            }`
          }`
        );
      } else {
        route.push(`${path + `/${slugUrl}` + `?${queryParams}`}`);
      }
    } else {
      subCategoryList = subCategoryList.filter((item) => {
        return item !== value.value;
      });
      searchParams.type = parentName.toLowerCase();
      searchParams.page = 1;
      searchParams.subCategory = subCategoryList.toString();
      const queryParams = queryString.stringify(searchParams);
      route.push(`${path + `/${slugUrl}` + `?${queryParams}`}`);
    }
  };

  return (
    <React.Fragment>
      {data.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 pb-6"
          defaultOpen={true}
        >
          {({ open }: any) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="pl-4 pr-4 flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className={`font-semibold text-[16px] text-[#06163F]`}>
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

              <Disclosure.Panel className="">
                {section.subFilter.map((item) => {
                  return (
                    <Disclosure
                      as="div"
                      key={section.id + Math.random()}
                      className=" border-gray-200 pt-6"
                      data-headlessui-state="open"
                      defaultOpen={true}
                    >
                      {({ open }: any) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="pl-4 pr-4 flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span
                                className={
                                  open
                                    ? `font-bold text-sm text-[#44506F] ${archivoScript.className} capitalize`
                                    : `font-normal text-sm text-[#44506F] ${archivoScript.className} capitalize`
                                }
                              >
                                {item.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>

                          <Disclosure.Panel className="pt-4">
                            <InfiniteCheckBox
                              initValue={item.options}
                              name={item.name}
                              handleChange={handleChange}
                            />
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  );
                })}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </React.Fragment>
  );
}
