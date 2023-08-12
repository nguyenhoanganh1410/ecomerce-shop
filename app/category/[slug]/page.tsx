import CategoryPage from "@/components/category";
import FollowerComponent from "@/components/home/follower-component";
import { IPropsParams } from "@/utils/type";
import React from "react";

export default async function CategoryNewPage({ params, searchParams }: IPropsParams) {
  return (
    <React.Fragment>
      <CategoryPage
        searchParams={searchParams}
        params={params}
      />
      <FollowerComponent />
    </React.Fragment>
  );
}
