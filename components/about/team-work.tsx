import { accountSetting } from "@/utils/data";
import { Image_Url } from "@/utils/imageUrl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TeamWorkComponent() {
  return (
    <div className="sm:mx-10">
      <div className="flex items-start justify-start flex-col my-10 md:my-40">
        <p className="mt-1 text-3xl sm:text-6xl font-light text-[#FFF]">
          Teamwork
        </p>
        <p className="text-base sm:text-2xl font-light text-[#ADB5BD] mt-6">
          SIGMA WORLD is driven to provide a one-of-a-kind shopping experience
          giving the consumer the ability to add items from a curated assortment
          of luxury fashion onto one wishlist that is convenient to share and
          secure to purchase from.
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-y-6 lg:grid-cols-3 lg:grid-rows-1 lg:gap-20">
        <div className="col-span-1 rounded-lg h-60 w-60 xl:h-[360px] xl:w-[360px] relative">
          <Image
            className="h-full w-full object-contain md:object-cover rounded-full"
            src={Image_Url.about_avatar_team_work}
            alt=""
            fill
          />
        </div>
        <div className="col-span-2">
          <div>
            <p className="mt-1 sm:text-[32px] font-normal text-[#FFF] playfair-display">
              Sigma was a travelling salesman - and above it there hung a
              picture that he had recently cut out of an illustrated magazine
              and housed in a nice, gilded frame.
            </p>
            <p className="my-5 sm:my-10 sm:text-xl font-semibold text-[#FFF]">
              — Frankie Kafka, Founder
            </p>
            <p className="mt-1 text-sm font-normal text-[#FFF]">
              Sigma was a travelling salesman - and above it there hung a
              picture that he had recently cut out of an illustrated magazine
              and housed in a nice, gilded frame.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
