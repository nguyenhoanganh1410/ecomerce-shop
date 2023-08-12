"use client";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AvatarButtonComponent from "./avatar-button";
import { Iuser } from "@/utils/type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import { getDataById } from "@/utils/sanity/userService";
import { updateUser } from "@/redux/features/user-slice";
import { toast } from "react-toastify";
import { MESSAGE_REQUIED_SHIPPING_ADDRESS } from "@/constants";
import { wisListLink } from "@/lib/path";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  slug: string;
  isSharingMode?: boolean;
  dataUser: Iuser;
}

const countSocial = (dataUser: Iuser) => {
  if (!dataUser) return 0;
  let count = 0;
  if (dataUser.titokUrl) count += 1;
  if (dataUser.twitterUrl) count += 1;
  if (dataUser.onlyFansUrl) count += 1;
  if (dataUser.instagramUrl) count += 1;

  return count;
};
export default function ProfileWishListComponent({
  slug,
  isSharingMode,
  dataUser,
}: IProps) {
  const { data } = useSession();
  const dispatch = useAppDispatch();
  const dataRedux = useAppSelector((state) => state.user.user);

  const [stateCopy, setStateCopy] = useState<boolean>(false);
  const SocialComponent = () => {
    if (!dataUser) return null;
    return (
      <>
        {dataUser.onlyFansUrl ? (
          <a
            href={dataUser.onlyFansUrl}
            className="relative w-5 h-5 cursor-pointer"
          >
            <Image
              src="/lock-icon.png"
              width={20}
              height={20}
              alt=""
              className="h-full w-full object-contain invert"
            />
          </a>
        ) : null}
        {dataUser.instagramUrl ? (
          <a
            href={dataUser.instagramUrl}
            className="relative w-5 h-5 cursor-pointer"
          >
            <Image
              src="/insta-icon.png"
              width={20}
              height={20}
              alt=""
              className="h-full w-full object-contain invert"
            />
          </a>
        ) : null}
        {dataUser.titokUrl ? (
          <a
            href={dataUser.titokUrl}
            className="relative w-5 h-5 cursor-pointer"
          >
            <Image
              src="/toptop.png"
              width={20}
              height={20}
              alt=""
              className="h-full w-full object-contain"
            />
          </a>
        ) : null}
        {dataUser.twitterUrl ? (
          <a
            href={dataUser.twitterUrl}
            className="relative w-5 h-5 cursor-pointer"
          >
            <Image
              src="/twice.png"
              width={20}
              height={20}
              alt=""
              className="h-full w-full object-contain"
            />
          </a>
        ) : null}
      </>
    );
  };

  const handleCopyLink = async () => {
    if (stateCopy) return;
    const dataAvailibale =
      dataUser?.shippingAddress?.filter((item) => {
        return item.deleted !== true;
      }) || [];
    if (dataAvailibale.length === 0) {
      toast(MESSAGE_REQUIED_SHIPPING_ADDRESS);
      return;
    }
    if (data?.user.email) {
      await navigator.clipboard.writeText(
        wisListLink(slug, encodeURIComponent(data?.user.email))
      );
    } else {
      await navigator.clipboard.writeText(wisListLink(slug));
    }
    setStateCopy(true);
    setTimeout(() => {
      setStateCopy(false);
    }, 5000);
  };

  useEffect(() => {
    if (data?.user.id == slug) {
      getDataById(data.user.id)
        .then((value) => {
          dispatch(updateUser(value));
        })
        .catch(() => dispatch(updateUser([])));
    }
  }, [data?.user]);

  return (
    <>
      <div className="relative w-full h-[460px] flex justify-center items-center">
        <div className="absolute w-full h-full bg-[#0000008F] opacity-60 z-[4]"></div>
        {dataRedux.length > 0 && dataRedux[0].backgroundImageUrl ? (
          <Image
            src={dataRedux[0].backgroundImageUrl}
            fill
            alt=""
            className="object-cover rounded"
          />
        ) : (
          <>
            {dataUser && dataUser.backgroundImageUrl ? (
              <Image
                src={dataUser.backgroundImageUrl}
                fill
                alt=""
                className="object-cover rounded"
              />
            ) : (
              <Image
                src="/bg_wishlist.jpg"
                fill
                alt=""
                className="object-cover rounded"
              />
            )}
          </>
        )}

        <AvatarButtonComponent
          isBgModel={true}
          classString="absolute w-14 h-14 top-4 right-4 cursor-pointer z-[9]"
          user={dataUser}
          isSharingMode={isSharingMode}
        />
        <div className="flex flex-col justify-center items-center relative z-[5] max-w-[420px]">
          <AvatarButtonComponent
            isBgModel={false}
            classString="relative w-32 h-32 cursor-pointer rounded-full border-[4px] border-white z-[9]"
            user={dataUser}
            isSharingMode={isSharingMode}
          />

          <div className="flex flex-col mt-4 justify-center items-center max-w-[85vw] sm:max-w-[500px]">
            <h3 className="font-normal text-white ">
              <p className="sm:text-[22px] lg:text-2xl font-semibold ">
                {dataUser && dataUser.firstName && dataUser.lastName
                  ? dataUser.firstName + " " + dataUser.lastName
                  : "Your Name"}
              </p>
            </h3>
            <p
              aria-hidden="true"
              className="mt-2 mb-2 text-[12px] font-semibold text-white"
            >
              {dataUser && dataUser.sigmaUserName
                ? "@" + dataUser.sigmaUserName
                : "@sigma.com"}
            </p>
            {dataUser && dataUser.message ? (
              <p
                aria-hidden="true"
                className="text-[14px] font-normal text-white text-center break-words w-full pl-3 pr-3 sm:p-0"
              >
                {dataUser.message}
              </p>
            ) : null}
          </div>
          <div
            className={`${
              countSocial(dataUser) <= 2
                ? "w-16 justify-around"
                : "w-36 justify-between"
            } flex mt-4 items-center`}
          >
            <SocialComponent />
          </div>
          {isSharingMode ? null : (
            <button
              onClick={handleCopyLink}
              className="bg-transparent hover:bg-blue-500 text-white mt-8 text-[11px] rounded-[97px] font-bold hover:text-white py-2 px-4 border border-white hover:border-transparent"
            >
              {stateCopy ? "Copied" : "Share Wishlist"}
            </button>
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
    </>
  );
}
