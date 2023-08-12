"use client";
import Button from "@/components/button/Button";
import { FormInput } from "@/components/form-input";
import useProfileHook from "@/hooks/useProfileHook";
import { isObjectEmpty } from "@/utils/methods";
import { Iuser } from "@/utils/type";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface IProps {
  data: Iuser;
}
export default function FormProfile({ data }: IProps) {
  const {
    handleSaveAccountInfo,
    handleSaveSocialData,
    formik,
    formikSocial,
    loaddingProfile,
    loadding,
  } = useProfileHook(data);
  const active =
    formik.values.firstName.length > 0 &&
    formik.values.sigmaUserName.length > 0 &&
    formik.values.lastName.length > 0 &&
    isObjectEmpty(formik.errors);
    
  return (
    <React.Fragment>
      <div className="mx-auto mt-10 mb-10 sm:mt-20">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl md:text-2xl font-medium tracking-tight text-[#242424]">
            Account Info
          </h2>
          <Button
            text="SAVE CHANGES"
            handleSave={() => handleSaveAccountInfo()}
            style="max-w-[164px]"
            disabled={active}
            loadding={loaddingProfile}
          />
        </div>
        <form className="grid grid-cols-1 max-w-[720px] gap-x-6 gap-y-4 sm:grid-cols-2">
          <FormInput
            label="First Name*"
            clasName="sm:col-span-1"
            name="firstName"
            value={formik.values.firstName}
            handleChange={formik.handleChange}
            isError={formik.errors.firstName}
          />
          <FormInput
            label="Last Name*"
            clasName="sm:col-span-1"
            name="lastName"
            value={formik.values.lastName}
            handleChange={formik.handleChange}
            isError={formik.errors.lastName}
          />
          <FormInput
            label="Your SIGMA® username*"
            clasName="sm:col-span-2"
            name="sigmaUserName"
            value={formik.values.sigmaUserName}
            handleChange={formik.handleChange}
            isError={formik.errors.sigmaUserName}
          />

          <FormInput
            label="Your Message"
            isTextArea
            clasName="sm:col-span-2"
            name="message"
            value={formik.values.message}
            handleChange={formik.handleChange}
            isError={formik.errors.message}
          />
        </form>
      </div>
      <div className="h-[2px] w-full bg-[#DDDDDD]"></div>
      <div className="mx-auto mt-10 mb-32 lg:mb-44 sm:mt-10">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-medium tracking-tight text-[#242424]">
            Social Links
          </h2>
          <Button
            text="SAVE CHANGES"
           disabled={true}
            handleSave={() => handleSaveSocialData()}
            style="max-w-[164px]"
            loadding={loadding}
          />
        </div>
        <div className="grid grid-cols-1 max-w-[720px] gap-x-6 gap-y-4 sm:grid-cols-2">
          <FormInput
            label="Onlyfans"
            urlImage="/lock-icon.png"
            clasName="sm:col-span-1"
            name="onlyFansUrl"
            value={formikSocial.values.onlyFansUrl}
            handleChange={formikSocial.handleChange}
            isError={formikSocial.errors.onlyFansUrl}
          />

          <FormInput
            label="Instagram"
            urlImage="/insta-icon.png"
            clasName="sm:col-span-1"
            name="instagramUrl"
            value={formikSocial.values.instagramUrl}
            handleChange={formikSocial.handleChange}
            isError={formikSocial.errors.instagramUrl}
          />

          <FormInput
            label="TikTok"
            urlImage="/toptop.png"
            clasName="sm:col-span-1"
            name="titokUrl"
            value={formikSocial.values.titokUrl}
            handleChange={formikSocial.handleChange}
            isError={formikSocial.errors.titokUrl}
          />

          <FormInput
            label="Twitter"
            urlImage="/twice.png"
            clasName="sm:col-span-1"
            name="twitterUrl"
            value={formikSocial.values.twitterUrl}
            handleChange={formikSocial.handleChange}
            isError={formikSocial.errors.twitterUrl}
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
    </React.Fragment>
  );
}
