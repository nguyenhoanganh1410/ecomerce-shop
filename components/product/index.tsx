"use client";
import Breadcrumbs from "../breadcrumbs";
import { USDollar } from "@/utils/dollarFomat";
import SelectComponent from "../select";
import {
  IColorPicker,
  IOption,
  IProduct,
  IProductResponse,
} from "@/utils/type";
import { useProductHook } from "@/hooks/useProductHook";
import { dataNumber } from "@/utils/data";
import { signIn } from "next-auth/react";
import useNavbarHook from "@/hooks/useNavbarHook";
import { ToastContainer } from "react-toastify";
import CarouselImages from "./carousel-images";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { checkInStockProduct } from "@/utils/product-available";
import { IProductRoot, Image } from "@/utils/types/product";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface Iprops {
  data: IProductRoot;
  relatedProducts?: IProduct[];
  searchParams: { color?: string };
  slug: string;
  listSize: IOption[];
}

export default function ProductDetail({
  data,
  slug,
  searchParams,
  listSize,
}: Iprops) {
  const {
    setLabelSize,
    setLabelQuality,
    setProductSizePick,
    setQuality,
    handleAddToCart,
    handleAddtoWishlist,
    sizes,
    labelSize,
    labelQuality,
    productSizePicked,
    loadding,
  } = useProductHook(data, slug, searchParams);
  const { authenticated } = useNavbarHook();
  const [mobileImage, setMobileImage] = useState<string>(data.images[0].url);
  const inStock = checkInStockProduct(data);
  return (
    <>
      <Breadcrumbs data={[data.title]} subLink={[data.category[0]?.title]} />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-0 overflow-hidden pb-7 md:pb-[50px]">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex justify-between">
              <h1 className="text-xs text-textColor font-bold mb-3 capitalize">
                {data.brand.name}
              </h1>
            </div>
            <p className="text-2xl font-light text-textColor capitalize">
              {data && data.title}
            </p>
          </div>

          <div
            className={`mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0 ${
              data.images.length === 1 ? "lg:h-[300px]" : ""
            }`}
          >
            {data.images.length === 0 ? (
              <span className="font-bold text-sm text-gray-500">No Images</span>
            ) : null}
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
              <img
                src={mobileImage}
                alt="image"
                className="lg:col-span-2 lg:row-span-2 w-full max-h-full object-cover rounded-lg lg:hidden"
              />
              {data.images.map((image: Image, idx: number) => {
                return (
                  <img
                    key={image?.url + idx}
                    src={image?.url}
                    alt="image"
                    className={classNames(
                      idx === 0
                        ? "lg:col-span-2 lg:row-span-2 w-full max-h-full object-cover"
                        : "hidden lg:block",
                      "rounded-lg hidden lg:block"
                    )}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-4 carousel-images lg:hidden">
            <CarouselImages
              data={data.images}
              setMobileImage={setMobileImage}
            />
          </div>

          <div className="lg:col-span-5">
            <form>
              <div className="my-8">
                <div className="flex items-center">
                  {productSizePicked ? (
                    <>
                      <h2 className="text-[20px] font-semibold text-textColor">
                        {productSizePicked.price?.discount
                          ? USDollar.format(
                              productSizePicked.price?.discount
                            )
                          : USDollar.format(
                              productSizePicked.price?.normal || 0
                            )}
                      </h2>
                      <h2 className="text-xs font-normal text-textColor ml-2 line-through">
                        {productSizePicked.price?.normal &&
                        productSizePicked.price?.discount
                          ? USDollar.format(productSizePicked.price?.normal)
                          : null}
                      </h2>
                    </>
                  ) : (
                    <>
                      <h2 className="text-[20px] font-semibold text-textColor">
                        {data.variants[0].discountPrice
                          ? USDollar.format(
                              data.variants[0].discountPrice
                            )
                          : USDollar.format(data.variants[0].price)}
                      </h2>
                      <h2 className="text-xs font-normal text-textColor ml-2 line-through">
                        {data.variants[0].discountPrice
                          ? USDollar.format(data.variants[0].price)
                          : null}
                      </h2>
                    </>
                  )}
                </div>
              </div>
              <div
                className="prose prose-sm mt-4 mb-8 text-[#686868] font-normal text-sm"
                dangerouslySetInnerHTML={{
                  __html: data?.description?.replace(/\n/g, "<br>") || "",
                }}
              />

              <div>
                {data.color && data.color.length > 0 ? (
                  <div className="flex items-center">
                    <h2 className="text-sm font-medium text-gray-900">
                      Color:
                    </h2>
                    <span className="text-xs font-normal text-gray ml-2 capitalize">
                      {data.color.map((item) => {
                        return item.name + " ";
                      })}
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="grid grid-cols-5 gap-[10px] xlgap-4">
                <div className="mt-10 col-span-3 md:col-span-3 xl:col-span-4">
                  <div className="flex items-end">
                    <h2 className="text-sm font-medium text-black-slate">
                      Size:
                    </h2>
                    <span className="text-xs font-normal text-gray ml-2">
                      (Required)
                    </span>
                  </div>
                  <SelectComponent
                    options={listSize}
                    label={labelSize}
                    onChangeLabel={() => setLabelSize("")}
                    onChange={setProductSizePick}
                  />
                </div>
                <div className="mt-10 col-span-2 md:col-span-2 xl:col-span-1">
                  <div className="flex items-end">
                    <h2 className="text-sm font-medium text-black-slate">
                      Quantity
                    </h2>
                  </div>
                  <SelectComponent
                    options={dataNumber}
                    label={labelQuality}
                    onChangeLabel={() => setLabelQuality("")}
                    onChange={setQuality}
                    limitStock={productSizePicked?.stock}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`${
                  loadding || !inStock
                    ? "cursor-not-allowed opacity-70 hover:opacity-70"
                    : ""
                } mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-[#242424] px-8 py-3 text-[14px] font-semibold text-[#FFFFFF] focus:outline-none focus:ring-2 hover:opacity-95`}
              >
                ADD TO BAG
              </button>
              <button
                type="button"
                onClick={handleAddtoWishlist}
                className="mt-4 flex w-full items-center justify-center rounded-md border border-textColor bg-transparent px-8 py-3 text-[14px] font-semibold text-textColor focus:outline-none focus:ring-2 hover:opacity-95"
              >
                WISHLIST
              </button>
              {!authenticated ? (
                <p className="text-xs text-[#9F7D83] text-center mt-4 font-medium uppercase">
                  Please{" "}
                  <a
                    onClick={() => signIn("auth0")}
                    className="underline cursor-pointer"
                  >
                    login
                  </a>{" "}
                  to add items to wishlist
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}