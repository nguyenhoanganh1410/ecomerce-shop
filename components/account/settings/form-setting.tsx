"use client";
import Button from "@/components/button/Button";
import { FormInput } from "@/components/form-input";
import useSettingHook from "@/hooks/useSettingHook";
import { isObjectEmpty } from "@/utils/methods";
import Link from "next/link";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormSetting() {
  const {
    formikPassword,
    loaddingChangePassword,
    handleChangePassword,
    loginWithEmailPassword,
    handleShowModel
  } = useSettingHook();

  const activeChangePassword =
    formikPassword.values.confirmPass.length > 0 &&
    formikPassword.values.newPassword.length > 0 &&
    formikPassword.values.oldPassword.length > 0 &&
    isObjectEmpty(formikPassword.errors);

  return (
    <React.Fragment>
      {loginWithEmailPassword ? (
        <React.Fragment>
          <div className="mx-auto mt-10 mb-10 sm:mt-20">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-2xl font-medium tracking-tight text-[#242424]">
                Current Password:
              </h2>
              <Button
                text="SAVE CHANGES"
                disabled={activeChangePassword}
                handleSave={() => handleChangePassword()}
                style="max-w-[164px]"
                loadding={loaddingChangePassword}
              />
            </div>
            <div className="grid grid-cols-1 max-w-[720px] gap-x-6 gap-y-4 sm:grid-cols-2">
              <FormInput
                label="Old Password"
                clasName="sm:col-span-2"
                name="oldPassword"
                value={formikPassword.values.oldPassword}
                handleChange={formikPassword.handleChange}
                isError={formikPassword.errors.oldPassword}
                type="password"
              />

              <FormInput
                label="New Password"
                clasName="sm:col-span-2"
                name="newPassword"
                value={formikPassword.values.newPassword}
                handleChange={formikPassword.handleChange}
                isError={formikPassword.errors.newPassword}
                type="password"
              />

              <FormInput
                label="Confirm New Password:"
                clasName="sm:col-span-2"
                name="confirmPass"
                value={formikPassword.values.confirmPass}
                handleChange={formikPassword.handleChange}
                isError={formikPassword.errors.confirmPass}
                type="password"
              />
            </div>
          </div>
          <div className="h-[2px] w-full bg-[#DDDDDD]"></div>
        </React.Fragment>
      ) : null}
      <div className="mx-auto mt-10 mb-32 lg:mb-44 sm:mt-20">
        <div className="flex md:items-center md:justify-between mb-8 flex-col md:flex-row">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-[#242424]">
              DELETE ACCOUNT
            </h2>
            <p className="text-[#242424] text-base font-normal md:w-[613px]">
              Permanently delete your account and all data asociated with it. If
              you experienced an issue with your account and need help, please
              contact us so we can assist you.
            </p>
          </div>
          {loginWithEmailPassword ? (
            <Link
              href="/account/settings/delete-user"
              className={`border-[#E01A2B] mt-10 md:mt-0 border-[1px] bg-transparent inline-flex w-[216px] h-[54px] justify-center items-center rounded-md py-4 text-sm font-bold text-[#E01A2B] shadow-sm hover:opacity-95`}
            >
              DELETE MY ACCOUNT
            </Link>
          ) : (
            <div
              onClick={handleShowModel}
              className={`border-[#E01A2B] mt-10 md:mt-0 border-[1px] bg-transparent inline-flex w-[216px] h-[54px] justify-center items-center rounded-md py-4 text-sm font-bold text-[#E01A2B] shadow-sm hover:opacity-95`}
            >
              DELETE MY ACCOUNT
            </div>
          )}
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
