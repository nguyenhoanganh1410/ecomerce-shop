"use client"
import React from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateStatus } from "@/redux/features/filter-mobile";

const ButtonFilter = () => {
  const dispatch = useAppDispatch();
  const handleOpen = () => {
    dispatch(updateStatus(true))
  }
  return (
    <button
      type="button"
      className="inline-flex items-center lg:hidden ml-4"
      onClick={() => handleOpen()}
    >
      <span className="text-sm font-medium text-gray-700">Filters</span>
      <PlusIcon
        className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
        aria-hidden="true"
      />
    </button>
  );
};
export default ButtonFilter;
