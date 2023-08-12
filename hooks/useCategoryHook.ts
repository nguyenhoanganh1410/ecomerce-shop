"use client"
import { IFilterSearch, IOptions, ISearchParams } from "@/utils/type";
import { brand, searchQuery } from "@/constants";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useCategoryHook = (searchParams: ISearchParams) => {
  const isSearchPage = usePathname() === "/search-result";
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [textSearch, setTextSearch] = useState<string>("");
 // const [optionsData, setOptionData] = useState<IFilterSearch[]>(filterOptions);
  const pathType = searchParams.type
  const limitPage = searchParams.limit || 12;
  const searchParamsState = useSearchParams();
  const page = searchParamsState.get(searchQuery.page) || 1;
  const [searchResult, setSearchResult] = useState<boolean>(false);

  return {
    isSearchPage,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    setTextSearch,
    textSearch,
    pathType,
    searchResult,
    limitPage,
    page,
  };
};

export default useCategoryHook;
