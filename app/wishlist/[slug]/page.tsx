import ButtonScroll from "@/components/category/button-scroll";
import MyCombobox from "@/components/combobox";
import RequiredLoginComponent from "@/components/helper/require-login-coponent";
import BackgroundSkeleton from "@/components/skeleton-loading/background-skeleton";
import CardSkeleton from "@/components/skeleton-loading/card-skeleton";
import EmptyWishListComponent from "@/components/wishlist/empty-wishlist";
import CardProductWishList from "@/components/wishlist/product-card-wishlist";
import ProfileWishListComponent from "@/components/wishlist/profile-wishlist";
import {
  INDEX_BEST_SELLER,
  INDEX_FEATURED,
  INDEX_NEW_ARRIVAL,
  INDEX_PRICE_HIGHT_TO_LOW,
  INDEX_PRICE_LOW_TO_HIGHT,
} from "@/constants";
import { getWishlistByUser } from "@/lib/wishlist";
import { IWishList } from "@/redux/features/wishlist-slice";
import { authOptions } from "@/utils/authOptions";
import { handleProductsInWishList } from "@/utils/methods";
import { getDataById } from "@/utils/sanity/userService";
import { IProductWishList, IWishListProduct } from "@/utils/type";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

export interface IParamWishListPage {
  sort?: string;
  page?: number;
  mode?: string;
  token?: string;
  sigma?: string;
  email?: string
}

interface IProps {
  slug: string;
  searchParams: IParamWishListPage;
}

export default async function WishListPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: IParamWishListPage;
}) {
  
  const session = await getServerSession(authOptions);
  if (!session && !searchParams.mode) {
    return <RequiredLoginComponent />;
  }
  
  return (
    <div className="">
      <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-5 rounded-lg">
        <Suspense fallback={<BackgroundSkeleton />}>
          {/* @ts-expect-error Server Component */}
          <Profile slug={params.slug} searchParams={searchParams} />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          {/* @ts-expect-error Server Component */}
          <ItemsWishListComponent
            slug={params.slug}
            searchParams={searchParams}
          />
        </Suspense>
      </div>
    </div>
  );
}

async function Profile({ slug, searchParams }: IProps) {
  const dataUser = await getDataById(slug);

  return (
    <ProfileWishListComponent
      slug={slug}
      isSharingMode={searchParams.mode ? true : false}
      dataUser={dataUser[0]}
    />
  );
}

async function ItemsWishListComponent({ slug, searchParams }: IProps) {
  const products = await getWishlistByUser(slug);
  const productsWishList = await featchDetailsData(products, searchParams);
  const sortValue =
    searchParams.sort &&
    (+searchParams.sort === 3 ||
      +searchParams.sort === 4 ||
      +searchParams.sort === 5)
      ? true
      : false;
  if (productsWishList.length === 0 && !sortValue) {
    return <EmptyWishListComponent />;
  }
  return (
    <React.Fragment>
      <div className="mx-auto mt-4 mb-4">
        <main className="mx-auto">
          <div className="mt-4 pb-5 text-sm flex justify-between items-center">
            <dl className="flex">
              <dd className="font-bold text-xs text-textColor">Products:</dd>
              <dt className="text-gray-500 mx-1 text-xs">
                {productsWishList.length || 0}
              </dt>
            </dl>

            <div className="w-max flex justify-around">
              <MyCombobox searchParams={searchParams} />
            </div>
          </div>

          <>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-3 lg:gap-x-4 xl:gap-x-8 transition-all">
              {productsWishList &&
                productsWishList.map((product: IProductWishList) => {
                  return (
                    <CardProductWishList
                      key={product.id}
                      product={product}
                      isSharingMode={searchParams.mode ? true : false}
                      slug={slug}
                      sigmaName={searchParams.sigma}
                      giftEmail={searchParams.email}
                    />
                  );
                })}
            </div>
          </>
        </main>
      </div>
      <ButtonScroll />
    </React.Fragment>
  );
}

async function featchDetailsData(
  data: IWishList[],
  searchParams: IParamWishListPage
) {
  const idProductUnique = data
    .filter((value: IWishListProduct, idx: number) => {
      return (
        idx ===
        data.findIndex((v: IWishListProduct) => v.idProduct === value.idProduct)
      );
    })
    .map((val) => {
      return val.idProduct;
    });
  if (idProductUnique.length > 0) {
    const result: IProductWishList[] = await handleProductsInWishList(
      idProductUnique,
      data
    );
    if (!searchParams?.sort || +searchParams?.sort === 0) {
      return result;
    }
    if (+searchParams?.sort == INDEX_NEW_ARRIVAL) {
      return result.filter((item) => {
        return item.newArrival == true;
      });
    } else if (+searchParams?.sort == INDEX_BEST_SELLER) {
      return result.filter((item) => {
        return item.bestSeller == true;
      });
    } else if (+searchParams.sort == INDEX_FEATURED) {
      return result.filter((item) => {
        return item.featured == true;
      });
    } else if (+searchParams.sort == INDEX_PRICE_LOW_TO_HIGHT) {
      return result.sort((a, b) => {
        let aPrice;
        if (a.product[0].discountPrice) {
          aPrice = a.product[0].discountPrice;
        } else {
          aPrice = a.product[0].price;
        }

        let bPrice;
        if (b.product[0].discountPrice) {
          bPrice = b.product[0].discountPrice;
        } else {
          bPrice = b.product[0].price;
        }

        return bPrice - aPrice;
      });
    } else if (+searchParams.sort == INDEX_PRICE_HIGHT_TO_LOW) {
      return result.sort((a, b) => {
        let aPrice;
        if (a.product[0].discountPrice) {
          aPrice = a.product[0].discountPrice;
        } else {
          aPrice = a.product[0].price;
        }

        let bPrice;
        if (b.product[0].discountPrice) {
          bPrice = b.product[0].discountPrice;
        } else {
          bPrice = b.product[0].price;
        }

        return aPrice - bPrice;
      });
    }
  }
  return [];
}
