"use client";
import OrderSumary from "@/components/cart/order-sumary";
import { FormInput } from "@/components/form-input";
import SelectData from "@/components/account/shipping/dropdown-list-countries";
import { Country, State } from "country-state-city";
import useCheckoutHook from "@/hooks/useCheckoutHook";
import {
  isObjectEmpty,
  isObjectEmptyExceptSpecifiedProps,
} from "@/utils/methods";
import { REQUIRED_FIELD_ERROR_MESSAGE } from "@/constants";
import Image from "next/image";
import React from "react";
import {
  Elements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import getStripePromise, { useOptions } from "../../utils/stripe";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckoutForm() {
  const {
    setSelectedCountry,
    setSelectedState,
    setSelectedCountryBilling,
    setSelectedStateBilling,
    handleChangeShipping,
    handleChangeBilling,
    handlePlaceTheOrder,
    setErrorCardNumber,
    setErrorExp,
    setErrorCvc,
    formik,
    selectedCountry,
    selectedState,
    dataAddress,
    loadding,
    disableBilling,
    disableShippingAddress,
    formikBilling,
    formikkContact,
    selectedCountryBilling,
    selectedStateBilling,
    data,
    asAddress,
    totalorder,
    errorCardNumber,
    errorExp,
    errorCvc,
    billingAsAdressShipping,
    checkoutWithOnlyMyProduct,
    handleBillingAsShipping,
    checkoutWithGift,
  } = useCheckoutHook();

  const checkErrorsCard = () => {
    if (disableBilling) {
      return true;
    }
    return (
      errorCardNumber.length === 0 &&
      errorCvc.length === 0 &&
      errorExp.length === 0
    );
  };

  const checkAddressShippingIsAvailable = () => {
    if (checkoutWithGift && !checkoutWithOnlyMyProduct) return true;
    return (
      isObjectEmpty(formik.errors) &&
      selectedCountry &&
      isObjectEmptyExceptSpecifiedProps(formik.values, [
        "apartment",
        "country",
        "state",
      ])
    );
  };
  const active =
    formikkContact.values.email.length > 0 &&
    formikkContact.values.phone.length > 0 &&
    formikBilling.values.addressBilling.length > 0 &&
    formikBilling.values.firstNameBilling.length > 0 &&
    formikBilling.values.lastNameBilling.length > 0 &&
    formikBilling.values.cityBilling.length > 0 &&
    formikBilling.values.zipCodeBilling.length > 0 &&
    checkAddressShippingIsAvailable() &&
    selectedCountryBilling &&
    checkErrorsCard() &&
    isObjectEmpty(formikBilling.errors) &&
    isObjectEmpty(formikkContact.errors);
  const options: any = useOptions();

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-10">
        <form className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-7">
            {totalorder !== -1 ? (
              <>
                {checkoutWithGift ? (
                  <React.Fragment>
                    <p className="text-sm font-normal">
                      Rest assured that your gift will be shipped to the
                      recipients address. You will be notified when the gift has
                      been delivered, and we ask for your patience in allowing
                      time for the delivery to be completed.
                    </p>
                    <p className="text-sm font-normal mt-4 mb-8">
                      Thank you for your understanding in ensuring the safety
                      and privacy of our valued customers.
                    </p>
                  </React.Fragment>
                ) : null}
                {checkoutWithOnlyMyProduct ? (
                  <div>
                    <h2 className="text-2xl font-normal text-gray-900">
                      Shipping Address
                    </h2>
                    <span className="text-xs font-normal">
                      <span className="text-[#E01A2B] pr-1">*</span>
                      Required
                    </span>

                    <div className="grid grid-cols-1 max-w-[720px] gap-x-[14px] gap-y-4 sm:grid-cols-2 mt-6">
                      <FormInput
                        label="First Name"
                        clasName="sm:col-span-1"
                        name="firstName"
                        isImportant
                        disabled={disableShippingAddress}
                        value={formik.values.firstName}
                        handleChange={formik.handleChange}
                        isError={formik.errors.firstName}
                      />
                      <FormInput
                        label="Last Name"
                        clasName="sm:col-span-1"
                        name="lastName"
                        isImportant
                        disabled={disableShippingAddress}
                        value={formik.values.lastName}
                        handleChange={formik.handleChange}
                        isError={formik.errors.lastName}
                      />

                      <FormInput
                        label="Address"
                        clasName="sm:col-span-2"
                        name="address"
                        isImportant
                        disabled={disableShippingAddress}
                        value={formik.values.address}
                        handleChange={formik.handleChange}
                        isError={formik.errors.address}
                      />

                      <FormInput
                        label="Apartment, suite, etc. (optional)"
                        clasName="sm:col-span-2"
                        name="apartment"
                        disabled={disableShippingAddress}
                        value={formik.values.apartment}
                        handleChange={formik.handleChange}
                        isError={formik.errors.apartment}
                      />

                      <FormInput
                        label="City"
                        clasName="sm:col-span-2"
                        name="city"
                        disabled={disableShippingAddress}
                        isImportant
                        value={formik.values.city}
                        handleChange={formik.handleChange}
                        isError={formik.errors.city}
                      />

                      <div className="sm:col-span-2">
                        <p className="flex justify-between items-center">
                          <span className="block text-sm font-semibold leading-6 text-gray-900">
                            Country / Region{" "}
                            <span className="text-[#E01A2B]">*</span>
                          </span>
                        </p>
                        <SelectData
                          data={Country.getAllCountries()}
                          onChange={setSelectedCountry}
                          disabled={disableShippingAddress}
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
                          data={State?.getStatesOfCountry(
                            selectedCountry?.isoCode
                          )}
                          onChange={setSelectedState}
                          disabled={disableShippingAddress}
                          defaultValue={selectedState}
                        />
                      </div>

                      <FormInput
                        label="Zip Code"
                        clasName="sm:col-span-1"
                        name="zipCode"
                        isImportant
                        disabled={disableShippingAddress}
                        value={formik.values.zipCode}
                        handleChange={formik.handleChange}
                        isError={formik.errors.zipCode}
                      />
                      {data?.user &&
                      dataAddress?.shippingAddress &&
                      dataAddress?.shippingAddress.length > 0 ? (
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                          <input
                            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="checkbox"
                            value=""
                            id="checkboxDefault"
                            onChange={handleChangeShipping}
                            defaultChecked={disableShippingAddress}
                          />
                          <label
                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="checkboxDefault"
                          >
                            Use current account shipping address
                          </label>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-2xl font-normal text-gray-900">
                    Contact info
                  </h2>
                  <span className="text-xs font-normal">
                    <span className="text-[#E01A2B] pr-1">*</span>
                    Required
                  </span>
                  <div className="grid grid-cols-1 max-w-[720px] gap-x-[14px] gap-y-4 sm:grid-cols-2 mt-6">
                    <FormInput
                      label="Email"
                      clasName="sm:col-span-2"
                      name="email"
                      isImportant
                      value={formikkContact.values.email}
                      handleChange={formikkContact.handleChange}
                      isError={formikkContact.errors.email}
                    />

                    <FormInput
                      label="Phone number"
                      clasName="sm:col-span-2"
                      name="phone"
                      isImportant
                      value={formikkContact.values.phone}
                      handleChange={formikkContact.handleChange}
                      isError={formikkContact.errors.phone}
                    />
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-2xl font-normal text-gray-900">
                    Payment
                  </h2>
                  <span className="text-xs font-normal">
                    <span className="text-[#E01A2B] pr-1">*</span>
                    Required
                  </span>
                  <div className="grid grid-cols-1 max-w-[720px] gap-x-[14px] gap-y-4 sm:grid-cols-2 mt-6">
                    {disableBilling ? (
                      <>
                        <FormInput
                          label="Card Number"
                          clasName="sm:col-span-2"
                          isImportant
                          placeholder={`********${formikBilling.values.cardNumber}`}
                          disabled={disableBilling}
                        />
                        <FormInput
                          label="Expiration date"
                          clasName="sm:col-span-1"
                          isImportant
                          name="expiresOn"
                          value={formikBilling.values.expiresOn}
                          placeholder="MM/YY"
                          disabled={disableBilling}
                          maxlength={5}
                        />

                        <FormInput
                          label="Security Code"
                          clasName="sm:col-span-1"
                          name="securityCode"
                          isImportant
                          placeholder="***"
                          disabled={disableBilling}
                          maxlength={3}
                        />
                      </>
                    ) : (
                      <React.Fragment>
                        <div>
                          <span className="block text-sm font-semibold leading-6 text-gray-900">
                            Card Number
                            <span className="text-[#E01A2B]">*</span>
                          </span>
                          <div className="h-[50px] bg-white rounded-md border-0 pl-4 pt-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <CardNumberElement
                              options={options}
                              onChange={(event) => {
                                if (event.error) {
                                  setErrorCardNumber(event.error.message);
                                } else {
                                  setErrorCardNumber("");
                                }
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
                          <span className="block text-sm font-semibold leading-6 text-gray-900">
                            Expiration date
                            <span className="text-[#E01A2B]">*</span>
                          </span>
                          <div className="h-[50px] bg-white rounded-md border-0 pl-4 pt-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <CardExpiryElement
                              options={options}
                              onChange={(event) => {
                                if (event.error) {
                                  setErrorExp(event.error.message);
                                } else {
                                  setErrorExp("");
                                }
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
                          <span className="block text-sm font-semibold leading-6 text-gray-900">
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
                    )}
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-2xl font-normal text-gray-900">
                    Billing address
                  </h2>
                  {checkoutWithOnlyMyProduct ? (
                    <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] mt-4">
                      <input
                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="checkbox"
                        value=""
                        id="checkboxAsShipping"
                        onChange={handleBillingAsShipping}
                        defaultChecked={billingAsAdressShipping}
                        checked={billingAsAdressShipping}
                      />
                      <label
                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="checkboxAsShipping"
                      >
                        Billing Information is same as Shipping Address
                      </label>
                    </div>
                  ) : null}
                  {asAddress ? null : (
                    <div className="grid grid-cols-1 max-w-[720px] gap-x-[14px] gap-y-4 sm:grid-cols-2 mt-6">
                      <FormInput
                        label="First Name"
                        clasName="sm:col-span-1"
                        name="firstNameBilling"
                        isImportant
                        disabled={disableBilling || billingAsAdressShipping}
                        value={formikBilling.values.firstNameBilling}
                        handleChange={formikBilling.handleChange}
                        isError={formikBilling.errors.firstNameBilling}
                      />
                      <FormInput
                        label="Last Name"
                        clasName="sm:col-span-1"
                        name="lastNameBilling"
                        isImportant
                        disabled={disableBilling || billingAsAdressShipping}
                        value={formikBilling.values.lastNameBilling}
                        handleChange={formikBilling.handleChange}
                        isError={formikBilling.errors.lastNameBilling}
                      />
                      <FormInput
                        label="Address"
                        clasName="sm:col-span-2"
                        name="addressBilling"
                        isImportant
                        disabled={disableBilling || billingAsAdressShipping}
                        value={formikBilling.values.addressBilling}
                        handleChange={formikBilling.handleChange}
                        isError={formikBilling.errors.addressBilling}
                      />
                      <FormInput
                        label="Apartment, suite, etc. (optional)"
                        clasName="sm:col-span-2"
                        name="apartmentBilling"
                        disabled={disableBilling || billingAsAdressShipping}
                        value={formikBilling.values.apartmentBilling}
                        handleChange={formikBilling.handleChange}
                        isError={formikBilling.errors.apartmentBilling}
                      />
                      <FormInput
                        label="City"
                        clasName="sm:col-span-2"
                        name="cityBilling"
                        isImportant
                        disabled={disableBilling || billingAsAdressShipping}
                        value={formikBilling.values.cityBilling}
                        handleChange={formikBilling.handleChange}
                        isError={formikBilling.errors.cityBilling}
                      />
                      <div className="sm:col-span-2">
                        <p className="flex justify-between items-center">
                          <span className="block text-sm font-semibold leading-6 text-gray-900">
                            Country / Region{" "}
                            <span className="text-[#E01A2B]">*</span>
                          </span>
                        </p>
                        <SelectData
                          data={Country.getAllCountries()}
                          onChange={setSelectedCountryBilling}
                          defaultValue={selectedCountryBilling}
                          disabled={disableBilling || billingAsAdressShipping}
                          optionChange={setSelectedStateBilling}
                        />
                        {!selectedCountryBilling ? (
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
                          data={State?.getStatesOfCountry(
                            selectedCountryBilling?.isoCode
                          )}
                          onChange={setSelectedStateBilling}
                          defaultValue={selectedStateBilling}
                          disabled={disableBilling || billingAsAdressShipping}
                        />
                      </div>
                      <FormInput
                        label="Zip Code"
                        clasName="sm:col-span-1"
                        name="zipCodeBilling"
                        isImportant
                        disabled={disableBilling || billingAsAdressShipping}
                        value={formikBilling.values.zipCodeBilling}
                        handleChange={formikBilling.handleChange}
                        isError={formikBilling.errors.zipCodeBilling}
                      />
                      {data?.user &&
                      dataAddress?.Billing &&
                      dataAddress.Billing.length > 0 ? (
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                          <input
                            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="checkbox"
                            value=""
                            id="checkboxBilling"
                            onChange={handleChangeBilling}
                            defaultChecked={disableBilling}
                            checked={disableBilling}
                          />
                          <label
                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="checkboxBilling"
                          >
                            Use current account billing address
                          </label>
                        </div>
                      ) : null}
                    </div>
                  )}
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
            totalMoney={totalorder === -1 ? 0 : totalorder}
            onPlaceOrder={handlePlaceTheOrder}
            isLoading={loadding}
            disable={!active}
          />
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const stripePromise = getStripePromise();
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
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
    </Elements>
  );
}
