"use client";
import Button from "@/components/button/Button";
import { FormInput } from "@/components/form-input";
import useSettingHook from "@/hooks/useSettingHook";
import Link from "next/link";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormDeleteUser() {
  const { formikDeletePassword, handleDeleteAccount, loaddingDeleteAccount } =
    useSettingHook();
  return (
    <React.Fragment>
      <div className="relative isolate overflow-hidden lg:overflow-visible md:pt-24">
        <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
            <div className="lg:pr-4">
              <nav className="flex pt-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li>
                    <div className="flex items-center">
                      <Link
                        href="/account/settings"
                        className="text-xs font-medium text-[#242424] hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        Settings
                      </Link>
                    </div>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                      </svg>
                      <span className="ml-1 text-xs font-medium text-gray-500 md:ml-2 dark:text-gray-400 capitalize">
                        Delete my account
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
              <div className="lg:max-w-lg mt-10">
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#242424]">
                  Delete my account
                </h1>
                <p className="mt-2 text-base font-normal text-[#242424]">
                  For securyty purposes, please re-enter your password below.
                </p>
              </div>
              <div className="grid grid-cols-1 max-w-[720px] gap-x-6 gap-y-4 sm:grid-cols-2 mt-10">
                <FormInput
                  label="Current Password"
                  clasName="sm:col-span-2"
                  name="password"
                  type="password"
                  value={formikDeletePassword.values.password}
                  handleChange={formikDeletePassword.handleChange}
                  isError={formikDeletePassword.errors.password}
                />
              </div>
              <div>
                <div className="flex justify-end w-full sm:col-span-2">
                  {/* <button
                    className={`bg-[#E01A2B] mt-10 h-[54px] w-[160px] justify-center rounded-md px-5 text-sm font-bold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:opacity-95`}
                  >
                    DELETE
                  </button> */}
                  <Button
                    text="DELETE"
                    disabled={formikDeletePassword.values.password.length > 0}
                    handleSave={() => handleDeleteAccount()}
                    style="h-[54px] w-[160px]"
                    loadding={loaddingDeleteAccount}
                  />
                </div>
              </div>
            </div>
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
    </React.Fragment>
  );
}
