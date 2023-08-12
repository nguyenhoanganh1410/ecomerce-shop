"use client";
import { IBilling, Iuser } from "@/utils/type";
import Image from "next/image";
import Link from "next/link";
import React, { useState, Fragment, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { deleteBilling, getDataById } from "@/utils/sanity/userService";
import { DELETE_SUCCESS_FAILED, DELETE_SUCCESS_MESSAGE } from "@/constants";
import { useAppSelector } from "@/redux/store";

interface IProps {
  dataProps: Iuser;
}
export default function ListCard({ dataProps }: IProps) {
  const { data } = useSession();
  const statusChange = useAppSelector((state) => state.notification.status);
  //const [dataAddress, setDataAddress] = useState<Iuser>(dataProps);
  const [billingList, setBillingList] = useState<IBilling[]>(
    dataProps?.Billing?.filter((item) => {
      return item.deleted === false;
    }) || []
  );
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const handleRemove = () => {
    if (billingList[0]?.id) {
      deleteBilling(billingList[0]?.id)
        .then(() => {
          setBillingList([]);
          toast(DELETE_SUCCESS_MESSAGE);
        })
        .catch(() => {
          toast(DELETE_SUCCESS_FAILED);
        });
    }
  };

  useEffect(() => {
    if (data?.user.id) {
      getDataById(data?.user.id).then((result: Iuser[]) => {
        if (result.length > 0) {
          const dataValid =
            result[0].Billing?.filter((val) => {
              return val.deleted === false;
            }) || [];
          setBillingList(dataValid);
        }
      });
    }
  }, [statusChange]);

  return (
    <React.Fragment>
      <div className="mx-auto mt-10 mb-10 sm:mt-20">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-2xl font-medium tracking-tight text-[#242424]">
              Manage billing methods
            </h2>
            <p className="text-base font-normal tracking-tight text-[#242424]">
              Add, update, or remove your billing methods
            </p>
          </div>
          {billingList?.length > 0 ? (
            <a
              className={`${
                billingList?.length === 0 ? "bg-[#242424]" : "bg-[#D6D6D6]"
              } mt-3 w-[235px] inline-flex justify-center rounded-md px-5 py-4 text-sm font-bold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:opacity-95 sm:mt-0`}
            >
              ADD A BILLING METHOD
            </a>
          ) : (
            <Link
              href="/account/billing/add-billing"
              className={`${
                billingList?.length === 0 ? "bg-[#242424]" : "bg-[#D6D6D6]"
              } mt-3 w-[235px] inline-flex justify-center rounded-md px-5 py-4 text-sm font-bold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:opacity-95 sm:mt-0`}
            >
              ADD A BILLING METHOD
            </Link>
          )}
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#DDDDDD]"></div>
      {billingList.length === 0 ? null : (
        <div className="flex flex-col">
          <h3 className="text-[20px] font-medium tracking-tight text-[#242424] pt-[40px] pb-[40px]">
            Primary
          </h3>
          <div className="flex flex-col sm:flex-row justify-between">
            {billingList.map((item) => {
              return (
                <div key={item.id}>
                  <div className="w-[340px] flex flex-col justify-between h-[240px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="font-normal flex justify-end text-gray-700 dark:text-gray-400">
                      <Link
                        href={"account/billing/edit-billing"}
                        className="text-[#242424] font-medium text-sm"
                      >
                        Edit
                      </Link>{" "}
                      <span className="text-[#242424] font-medium text-sm cursor-pointer pl-1 pr-1">
                        |
                      </span>
                      <span
                        className="text-[#242424] font-medium text-sm cursor-pointer"
                        onClick={() => openModal()}
                      >
                        Remove
                      </span>
                    </div>
                    <div className="flex justify-between items-end dark:text-white break-all">
                      <div className="flex flex-col">
                        <span className="text-[#242424] font-medium text-sm cursor-pointer">
                          ••••{item.cardNumber}
                        </span>
                        <span className="text-[#242424] font-medium text-sm cursor-pointer">
                          {item.firstName + " " + item.lastName}
                        </span>
                      </div>
                      <div className="relative w-[45px] h-[28px] ml-2 mb-[16px] cursor-pointer hover:opacity-55">
                        <Image
                          src="/icon_card.png"
                          width={45}
                          height={28}
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-2xl md:text-2xl font-medium tracking-tight text-[#242424]">
                      Debit Card
                    </h2>
                    <p className="text-base font-normal tracking-tight text-[#242424]">
                      Debit card ending in •••• {item.cardNumber}
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="pl-4 border-l-2 border-[#DDDDDD] w-[284px] h-[44px] hidden sm:flex">
              <p className="text-base text-[#242424] font-normal w-[284px]">
                Your primary billing method is used for all recurring payments
              </p>
            </div>
          </div>
        </div>
      )}
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
                      DELETE BILLING?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to remove this billing?
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
                          handleRemove();
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
