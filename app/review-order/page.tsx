"use client";
import OrderSumary from "@/components/cart/order-sumary";
import useReviewOrderHook from "@/hooks/useReviewOrderHook";
import { DiscoveryError } from "@auth0/nextjs-auth0/dist/auth0-session/utils/errors";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function ReviewOrder() {
  const { orderDetails, totalOrder, loading, handlePlaceTheOrder } =
    useReviewOrderHook();

  return (
    <div className="">
      <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-6 xl:gap-x-6">
          <div className="lg:col-span-7">
            {orderDetails ? (
              <>
                <div className="bg-white h-fit rounded p-3">
                  <h2 className="text-2xl font-normal text-gray-900">
                    Shipping Address
                  </h2>
                  <div className="mt-6">
                    {orderDetails?.address ? (
                      <p className="text-xs font-normal text-[#686868] mb-2 capitalize">
                        {orderDetails?.address.firstName +
                          " " +
                          orderDetails?.address.lastName}
                      </p>
                    ) : null}
                    <p className="text-xs font-normal text-[#686868] mb-2">
                      {orderDetails?.contract.phone}
                    </p>
                    <p className="text-xs font-normal text-[#686868] mb-2">
                      {orderDetails?.contract.email}
                    </p>
                    {orderDetails?.address ? (
                      <>
                        <p className="text-xs font-normal text-[#686868] mb-2 capitalize">
                          {orderDetails?.address.apartment +
                            " " +
                            orderDetails?.address.address}
                        </p>
                        <p className="text-xs font-normal text-[#686868] mb-2 capitalize">
                          {orderDetails?.address.city +
                            " " +
                            orderDetails?.address.state.split(",,")[0] +
                            " " +
                            orderDetails?.address.country.split(",,")[0]}
                        </p>
                      </>
                    ) : null}
                    <Link
                      href="/checkout?option=edit"
                      className="text-xs font-normal text-[#0085FF] mt-4"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
                <div className="bg-white h-fit rounded mt-6 p-3">
                  <div>
                    <h2 className="text-2xl font-normal text-gray-900">
                      Payment
                    </h2>
                    <div className="flex mt-6">
                      <div>
                        <Image
                          src="/visa_icon.png"
                          width={60}
                          height={20}
                          alt="Picture of the visa"
                          className="mb-6"
                        />
                        <p className="text-xs font-bold text-[#111010] mb-2 capitalize">
                          Billing Address
                        </p>
                        <p className="text-xs font-normal text-[#686868] mb-2 capitalize">
                          {orderDetails?.billing.firstName +
                            " " +
                            orderDetails?.billing.lastName}
                        </p>
                        <p className="text-xs font-normal text-[#686868] mb-2 capitalize">
                          {orderDetails?.billing.apartment +
                            " " +
                            orderDetails?.billing.address +
                            " " +
                            orderDetails?.billing.city +
                            " " +
                            orderDetails?.billing.state.split(",,")[0] +
                            " " +
                            orderDetails?.billing.country.split(",,")[0]}
                        </p>
                        <Link
                          href="/checkout?option=edit"
                          className="text-xs font-normal text-[#0085FF] mt-4"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-xs font-normal text-[#686868] mb-2 capitalize">
                Payment session has expired,
                <Link href="/cart" className="text-[#0084FF] ml-1">
                  Go back to cart.
                </Link>
              </p>
            )}
          </div>

          <OrderSumary
            totalMoney={totalOrder === -1 ? 0 : totalOrder}
            onPlaceOrder={handlePlaceTheOrder}
            isLoading={loading.length > 0}
            //disable={!active}
            buttonColor="bg-[#0084FF]"
            haveText={true}
            messageLoading={loading}
          />
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
    </div>
  );
}
