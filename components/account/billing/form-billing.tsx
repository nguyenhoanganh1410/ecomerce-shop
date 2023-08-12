"use client";
import { FormInput } from "@/components/form-input";
import React, { useEffect } from "react";
import Link from "next/link";
import { Country, State, City } from "country-state-city";
import Image from "next/image";
import { REQUIRED_FIELD_ERROR_MESSAGE } from "@/constants";
import { cc_format, formatString, isObjectEmpty } from "@/utils/methods";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Iuser } from "@/utils/type";
import SelectData from "../shipping/dropdown-list-countries";
import useBillingHook from "@/hooks/useBillingHook";
import getStripePromise, { useOptions } from "@/utils/stripe";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
} from "@stripe/react-stripe-js";

interface IProps {
  isAdd?: boolean;
  dataProps?: Iuser;
}

function FormComponent({ dataProps, isAdd }: IProps) {
  const {
    formik,
    loadding,
    selectedCountry,
    selectedState,
    errorCardNumber,
    errorExp,
    errorCvc,
    setErrorCardNumber,
    setErrorExp,
    setErrorCvc,
    setSelectedCountry,
    setSelectedState,
    handleSave,
  } = useBillingHook(isAdd, dataProps);
  const active =
    formik.values.lastName.length > 0 &&
    formik.values.firstName.length > 0 &&
    formik.values.address.length > 0 &&
    formik.values.city.length > 0 &&
    formik.values.zipCode.length > 0 &&
    selectedCountry &&
    errorCardNumber.length === 0 &&
    errorCvc.length === 0 &&
    errorExp.length === 0 &&
    isObjectEmpty(formik.errors);

  const activeEditOption =
    formik.values.lastName.length > 0 &&
    formik.values.firstName.length > 0 &&
    formik.values.address.length > 0 &&
    formik.values.city.length > 0 &&
    formik.values.zipCode.length > 0 &&
    selectedCountry &&
    isObjectEmpty(formik.errors);

  const status = isAdd ? active : activeEditOption;
  const options: any = useOptions();
  return (
    <React.Fragment>
      <div className="mx-auto pt-10 pb-10 sm:pt-20">
        <nav className="flex pt-5 mb-10" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <div className="flex items-center">
                <Link
                  href="/account/billing"
                  className="text-xs font-medium text-[#242424] hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  Billing
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
                  {isAdd ? "Add Billing" : "Edit Billing"}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-medium tracking-tight text-[#242424]">
            {isAdd ? "Add a billing method" : "Edit Billing"}
          </h2>
        </div>
        <form className="grid grid-cols-1 max-w-[720px] gap-x-[14px] gap-y-4 sm:grid-cols-2">
          <FormInput
            label="First Name"
            clasName="sm:col-span-1"
            name="firstName"
            value={formik.values.firstName}
            handleChange={formik.handleChange}
            isError={formik.errors.firstName}
          />
          <FormInput
            label="Last Name"
            clasName="sm:col-span-1"
            name="lastName"
            value={formik.values.lastName}
            handleChange={formik.handleChange}
            isError={formik.errors.lastName}
          />
          {isAdd ? (
            <React.Fragment>
              <div>
                <span className="block text-sm font-semibold leading-6 text-gray-900 mb-[10px]">
                  Card Number
                  <span className="text-[#E01A2B]">*</span>
                </span>
                <div className="h-[50px] bg-white rounded-md border-0 pl-4 pt-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <CardNumberElement
                    options={options}
                    onReady={() => {
                      //console.log("CardNumberElement [ready]");
                    }}
                    onChange={(event) => {
                      //console.log("CardNumberElement [change]", event);
                      if (event.error) {
                        setErrorCardNumber(event.error.message);
                      } else {
                        setErrorCardNumber("");
                      }
                    }}
                    onBlur={() => {
                      //console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                      //console.log("CardNumberElement [focus]");
                    }}
                  />
                </div>
                {errorCardNumber.length > 0 ? (
                  <div className="mt-2 flex items-center">
                    <div className="relative w-4 h-4 mr-1">
                      <Image
                        src="/error-icon.png"
                        width={16}
                        height={16}
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <span className="text-sm font-medium text-[#E01A2B] capitalize">
                      {errorCardNumber}
                    </span>
                  </div>
                ) : null}
              </div>
              <div>
                <span className="block text-sm font-semibold leading-6 text-gray-900  mb-[10px]">
                  Expiration date
                  <span className="text-[#E01A2B]">*</span>
                </span>
                <div className="h-[50px] bg-white rounded-md border-0 pl-4 pt-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <CardExpiryElement
                    options={options}
                    onReady={() => {
                      //console.log("CardNumberElement [ready]");
                    }}
                    onChange={(event) => {
                      //console.log("CardNumberElement [change]", event);
                      if (event.error) {
                        setErrorExp(event.error.message);
                      } else {
                        setErrorExp("");
                      }
                    }}
                    onBlur={() => {
                      //console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                      // console.log("CardNumberElement [focus]");
                    }}
                  />
                </div>
                {errorExp.length > 0 ? (
                  <div className="mt-2 flex items-center">
                    <div className="relative w-4 h-4 mr-1">
                      <Image
                        src="/error-icon.png"
                        width={16}
                        height={16}
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <span className="text-sm font-medium text-[#E01A2B] capitalize">
                      {errorExp}
                    </span>
                  </div>
                ) : null}
              </div>
              <div>
                <span className="block text-sm font-semibold leading-6 text-gray-900 mb-[10px]">
                  Security Code
                  <span className="text-[#E01A2B]">*</span>
                </span>
                <div className="h-[50px] bg-white rounded-md border-0 pl-4 pt-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <CardCvcElement
                    options={options}
                    onChange={(event) => {
                      if (event.complete) {
                        setErrorCvc("");
                      } else {
                        setErrorCvc("Error");
                      }
                    }}
                  />
                </div>
              </div>
            </React.Fragment>
          ) : (
            <>
              <FormInput
                label="Card Number"
                clasName="sm:col-span-2"
                placeholder={`*********${formik.values.cardNumber}`}
                disabled
              />

              <FormInput
                label="Expires On"
                clasName="sm:col-span-1"
                name="expiresOn"
                value={formik.values.expiresOn}
                placeholder="MM/YY"
                maxlength={5}
                disabled
              />

              <FormInput
                label="Security Code"
                clasName="sm:col-span-1"
                name="securityCode"
                placeholder="CVV"
                maxlength={3}
                value="***"
                disabled
              />
            </>
          )}
        </form>
        <div className="flex items-baseline justify-between mb-8 mt-8">
          <h2 className="text-2xl font-medium tracking-tight text-[#242424]">
            Billing Address
          </h2>
        </div>
        <form className="grid grid-cols-1 max-w-[720px] gap-x-[14px] gap-y-4 sm:grid-cols-2">
          <FormInput
            label="Address*"
            clasName="sm:col-span-2"
            name="address"
            value={formik.values.address}
            handleChange={formik.handleChange}
            isError={formik.errors.address}
          />

          <FormInput
            label="Apartment, suite, etc. (optional)"
            clasName="sm:col-span-2"
            name="apartment"
            value={formik.values.apartment}
            handleChange={formik.handleChange}
            isError={formik.errors.apartment}
          />

          <FormInput
            label="City*"
            clasName="sm:col-span-2"
            name="city"
            value={formik.values.city}
            handleChange={formik.handleChange}
            isError={formik.errors.city}
          />

          <div className="sm:col-span-2">
            <p className="flex justify-between items-center">
              <span className="block text-sm font-semibold leading-6 text-gray-900">
                Country / Region
              </span>
            </p>
            <SelectData
              data={Country.getAllCountries()}
              onChange={setSelectedCountry}
              defaultValue={selectedCountry}
              optionChange={setSelectedState}
            />
            {!selectedCountry && !isObjectEmpty(formik.errors) ? (
              <div className="mt-2 flex items-center">
                <div className="relative w-4 h-4 mr-1">
                  <Image
                    src="/error-icon.png"
                    width={16}
                    height={16}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <span className="text-sm font-medium text-[#E01A2B] capitalize">
                  {REQUIRED_FIELD_ERROR_MESSAGE}
                </span>
              </div>
            ) : null}
          </div>

          <div className="sm:col-span-1">
            <p className="flex justify-between items-center">
              <span className="block text-sm font-semibold leading-6 text-gray-900">
                State
              </span>
            </p>
            <SelectData
              data={State?.getStatesOfCountry(selectedCountry?.isoCode)}
              onChange={setSelectedState}
              defaultValue={selectedState}
            />
          </div>

          <FormInput
            label="Zip Code"
            clasName="sm:col-span-1"
            name="zipCode"
            value={formik.values.zipCode}
            handleChange={formik.handleChange}
            isError={formik.errors.zipCode}
          />
          <div className="flex justify-end w-full sm:col-span-2">
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={!status}
              className={`${status ? "bg-[#242424]" : "bg-[#D6D6D6]"} mt-10 ${
                loadding ? "" : "max-w-[164px]"
              } justify-center rounded-md px-5 py-4 text-sm font-bold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:opacity-95 sm:w-auto`}
            >
              {loadding ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline mr-3 w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  ></path>
                </svg>
              ) : null}
              SAVE CHANGES
            </button>
          </div>
        </form>
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

export default function FormBilling({ dataProps, isAdd }: IProps) {
  const stripePromise = getStripePromise();
  return (
    <Elements stripe={stripePromise}>
      <FormComponent isAdd={isAdd} />
    </Elements>
  );
}