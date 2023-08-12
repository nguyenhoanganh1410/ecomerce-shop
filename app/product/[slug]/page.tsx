import NotFoundComponent from "@/components/404-component";
import ProductDetail from "@/components/product";
import ListProductsRelated from "@/components/product/products-related";
import { fetchProductHandler } from "@/utils/sanity/productService";
import { IProductRoot } from "@/utils/types/product";
import React, { Suspense } from "react";
export default async function ProductDetailsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { color?: string };
}) {
  const data: IProductRoot = await fetchProductHandler(params.slug);
  if (!data) {
    return <NotFoundComponent />;
  }
  const listSize = data.variants
    .sort((a, b) => a.size.name.localeCompare(b.size.name))
    .map((variant) => {
      return {
        id: variant.size._id,
        name: variant.size.name,
        inStock: variant.stock > 0 ? true : false,
        stock: variant.stock,
        price: {
          normal: variant.price,
          discount: variant.discountPrice,
        },
      };
    });

  return (
    <React.Fragment>
      <ProductDetail
        data={data}
        slug={params.slug}
        searchParams={searchParams}
        listSize={listSize}
      />
      <Suspense>
        <ListProductsRelated data={data} />
      </Suspense>
    </React.Fragment>
  );
}