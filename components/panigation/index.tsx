"use client";
import React from "react";
import ReactPaginate from "react-paginate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "./style.css";
import ArrowIcon from "../icons/arrow";
import { searchQuery } from "@/constants";
import { ISearchParams } from "@/utils/type";
import queryString from "query-string";
interface IPropsPagination {
  pageCount: number;
  currentPage: number;
  searchParams: ISearchParams;
}

interface IPropsSelectedPage {
  selected: number;
}

function Pagination({
  pageCount,
  currentPage,
  searchParams,
}: IPropsPagination) {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (selectedPage: IPropsSelectedPage) => {
    const page = selectedPage.selected + 1;
    searchParams.page = page;
    const queryParams = queryString.stringify(searchParams);
    router.push(`${pathname + `?${queryParams}`}`);
  };
  return (
    <ReactPaginate
      onPageChange={handlePageChange}
      pageCount={pageCount}
      previousLabel={<ArrowIcon />}
      nextLabel={<ArrowIcon />}
      containerClassName={"pagination"}
      pageLinkClassName={"page-number"}
      previousLinkClassName={"page-number"}
      nextLinkClassName={"page-number"}
      activeLinkClassName={"active"}
      forcePage={currentPage - 1}
      // initialPage={currentPage-1}
    />
  );
}

export default Pagination;
