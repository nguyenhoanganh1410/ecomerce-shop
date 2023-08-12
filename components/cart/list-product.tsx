"use client";
import { USDollar } from "@/utils/dollarFomat";
import useCartHook from "./hook";
import Link from "next/link";
import OrderSumary from "./order-sumary";
import {
  MESSAGE_REQUIED_ADDRESS_CART,
  MESSAGE_REQUIED_QUANITY_AVAILABLE,
  unAuthenticated,
} from "@/constants";
import EmptyDataComponent from "../empty-component";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "../loadding/loading-animation";
export default function ListProduct() {
  const {
    handleChange,
    handleDress,
    handlePluss,
    handleGoToCheckout,
    handleRemove,
    handleMoveToWishList,
    totalMoney,
    status,
    loadingGoToCheckout,
    listProduct,
    disableButton,
    loadding,
  } = useCartHook();

  return (
    <>
      <form className="mt-3 md:mt-11 xl:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>
          <ul role="list" className="divide-y border-b">
            {listProduct.length === 0 ? <EmptyDataComponent /> : null}
            {listProduct.map((product) => {
              return (
                <li
                  key={product.id + Math.random()}
                  className="flex flex-col py-6 sm:py-10 justify-start"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {product.product[0].stock <= 0 ? (
                        <span className="font-bold text-xs text-[#D32F2F] ml-[20px] capitalize">
                          Sold Out
                        </span>
                      ) : null}
                      <img
                        src={
                          product.product[0]?.images
                            ? product.product[0]?.images[0]?.url
                            : ""
                        }
                        alt={product.title}
                        className="h-24 w-24 rounded-lg object-cover object-center sm:h-[110px] sm:w-[86px] mt-[8px]"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          {product.giftSigma ? (
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <span className="font-bold text-xs text-[#9F7D83]">
                                  @{product.giftSigma.toLowerCase()}
                                </span>
                              </h3>
                            </div>
                          ) : null}
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <span className="font-bold text-xs text-[#212529] hover:text-gray-800 capitalize">
                                {product.brand.toLowerCase()}
                              </span>
                            </h3>
                          </div>
                          <div className="flex justify-between mt-1">
                            <h3 className="text-sm">
                              <Link
                                href={`product/${product.slug}`}
                                className="font-bold text-[15px] text-textColor hover:text-gray-800 cursor-pointer capitalize"
                              >
                                {product.title.length > 26
                                  ? product.title
                                      .substring(0, 26)
                                      .toLowerCase() + "..."
                                  : product.title.toLowerCase()}
                              </Link>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="font-normal text-xs text-textColor capitalize">
                              Size: {product.product[0].size.name}
                            </p>
                            <p className="ml-6 font-normal text-xs text-textColor capitalize">
                              Color:{" "}
                             {
                              product.product[0].color
                             }
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="mt-4 sm:mt-0 flex justify-between items-center">
                            <span className="inline-flex  text-textColor font-semibold text-xs hover:text-gray-500">
                              Item price
                            </span>

                            <span className="inline-flex  text-textColor font-semibold text-xs hover:text-gray-500">
                              Item total
                            </span>
                          </div>
                          <div className="mt-2 sm:mt-2 flex justify-between items-center">
                            <div className="">
                              <span className="-m-2 inline-flex p-2 text-textColor text-sm hover:text-gray-500">
                                {product.product[0].discountPrice
                                  ? USDollar.format(
                                      product.product[0].discountPrice
                                    )
                                  : USDollar.format(product.product[0].price)}
                              </span>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                              <span
                                className={`${
                                  product.giftSigma ? "mt-5 sm:mt-0" : ""
                                } inline-flex  text-textColor font-semibold text-xs hover:text-gray-500 absolute top-[80px] sm:top-0`}
                              >
                                Quantity
                              </span>
                              <div className="flex items-center justify-between">
                                <button
                                  className="p-2 cursor-pointer text-[20px] font-semibold"
                                  onClick={() => handleDress(product)}
                                  type="button"
                                >
                                  -
                                </button>
                                <input
                                  value={product.quantity}
                                  onChange={(e) =>
                                    handleChange(+e.target.value)
                                  }
                                  className="px-4 w-12 sm:w-16 text-center bg-transparent border-gray-200 text-xs border-[1px] py-2 font-semibold"
                                />
                                <button
                                  className="p-2 cursor-pointer text-[20px] font-semibold"
                                  onClick={() => handlePluss(product)}
                                  type="button"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="">
                              <span className="-m-2 inline-flex p-2 text-textColor font-semibold text-sm hover:text-gray-500">
                                {product.product[0].discountPrice
                                  ? USDollar.format(
                                      product.product[0].discountPrice *
                                        product.quantity
                                    )
                                  : USDollar.format(
                                      product.product[0].price *
                                        product.quantity
                                    )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-[110px]">
                    <span
                      className="font-normal text-xs underline cursor-pointer hover:text-[#9F7D83]"
                      onClick={() => handleRemove(product)}
                    >
                      Remove
                    </span>
                    {status === unAuthenticated ? null : (
                      <span
                        onClick={() => handleMoveToWishList(product)}
                        className="font-normal text-xs ml-6 underline cursor-pointer hover:text-[#9F7D83]"
                      >
                        Move to Wish List
                      </span>
                    )}
                  </div>
                  {product.product[0].stock > 0 && !product.product[0].valid ? (
                    <span className="font-bold text-xs text-[#D32F2F] capitalize mt-2">
                      {MESSAGE_REQUIED_QUANITY_AVAILABLE}
                    </span>
                  ) : null}
                  {!product.giftAddress && product.giftUserId ? (
                    <span className="font-bold text-xs text-[#D32F2F] capitalize mt-2">
                      {MESSAGE_REQUIED_ADDRESS_CART}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
        <OrderSumary
          totalMoney={totalMoney}
          onPlaceOrder={handleGoToCheckout}
          disable={disableButton}
          isLoading={loadingGoToCheckout}
          textButton="proceed Check out"
        />
      </form>
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
