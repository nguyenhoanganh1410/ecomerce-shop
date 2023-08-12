"use client";
import Image from "next/image";
import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { deleteShippingAddress, getDataById } from "@/utils/sanity/userService";
import { Iuser } from "@/utils/type";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_SUCCESS_FAILED, DELETE_SUCCESS_MESSAGE } from "@/constants";
import { Dialog, Transition } from "@headlessui/react";
interface IProps {
  slug: string;
}

export default function ListAddress() {
  const { data } = useSession();
  const [dataAddress, setDataAddress] = useState<Iuser>();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const handleRemove = (id: any) => {
    dataAddress &&
      setDataAddress({
        ...dataAddress,
        shippingAddress: [],
      });

    deleteShippingAddress(id)
      .then(() => {
        toast(DELETE_SUCCESS_MESSAGE);
      })
      .catch(() => {
        toast(DELETE_SUCCESS_FAILED);
      });
  };

  useEffect(() => {
    if (data?.user.id) {
      getDataById(data?.user.id).then((result: Iuser[]) => {
        if(result.length > 0) {
          const dataValid =
            result[0].shippingAddress?.filter((val) => {
              return val.deleted === false;
            }) || [];
  
          setDataAddress({
            ...result[0],
            shippingAddress: [...dataValid],
          });    
        }
      });
    }
  }, [data]);

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <h3 className="text-[24px] font-medium tracking-tight text-[#242424] pt-[48px] md:pt-[60px]">
          Your Shipping Address
        </h3>
        <h5 className="text-base font-normal tracking-tight text-[#242424]">
          We take your privacy seriously.
        </h5>
        <div className="mt-[50px] mb-[50px] pl-4 border-l-2 border-[#DDDDDD]">
          <div className="relative w-6 h-6 mb-2 cursor-pointer hover:opacity-55">
            <Image
              src="/icon-protected.png"
              fill
              alt=""
              className="h-full w-full object-contain"
            />
          </div>
          <p className="text-base text-[#242424] font-medium md:w-[40%]">
            An item that is purchased from your wishlist will get sent to your
            shipping address. Your address is hidden and secure from anyone
            purchasing an item from your wishlist. <a className="text-[#9F7D83] text-bold underline" href="#">Learn More</a>
          </p>
        </div>

        {dataAddress &&
        dataAddress.shippingAddress &&
        dataAddress?.shippingAddress?.length > 0 ? (
          <div className="w-[340px] flex flex-col justify-between h-[240px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p className="mb-2 text-[19px] w-[292px] font-medium tracking-tight text-[#000000] dark:text-white">
              {dataAddress.shippingAddress[0].address +
                ", " +
                dataAddress.shippingAddress[0].city +
                ", " +
                dataAddress.shippingAddress[0].state.split(",,")[0] +
                ", " +
                dataAddress.shippingAddress[0].country.split(",,")[0]}
            </p>
            <div className="font-normal text-gray-700 dark:text-gray-400">
              <Link
                href={"account/shipping/edit-address"}
                className="text-[#242424] font-medium text-sm"
              >
                Edit{" "}
              </Link>
              <span
                className="text-[#242424] font-medium text-sm cursor-pointer"
                onClick={() => openModal()}
              >
                | Remove
              </span>
            </div>
          </div>
        ) : (
          <Link
            href="account/shipping/add-address"
            className={`max-w-[198px] pt-4 bg-[#242424] h-[54px] justify-center rounded-md px-5 text-sm font-bold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:opacity-95`}
          >
            ADD A NEW SHIPPING
          </Link>
        )}
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
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      DELETE ADDRESS?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to remove this address?
                      </p>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex mr-3 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          handleRemove(
                            dataAddress &&
                              dataAddress?.shippingAddress &&
                              dataAddress?.shippingAddress[0].id
                          );
                          closeModal();
                        }}
                      >
                        Yes
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </React.Fragment>
  );
}
