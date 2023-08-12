import { accountSetting } from "@/utils/data";
import { Image_Url } from "@/utils/imageUrl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function GridContentComponent() {
  return (
    <React.Fragment>
      <div className="py-10 sm:py-24">
        <div className="mt-6 grid grid-cols-1 gap-y-6 lg:grid-cols-3 lg:grid-rows-1 lg:gap-20">
          <div className="col-span-2 rounded-lg">
            <div className="grid grid-cols-1 gap-5 sm:grid-rows-2">
              <div className="sm:row-span-1 flex items-center flex-col align-center">
                <Image
                  src={Image_Url.about_she_is_sigma}
                  alt="she is ..."
                  width={513}
                  height={78}
                />
                <div className="flex items-center justify-center flex-col mt-3">
                  <p
                    aria-hidden="true"
                    className="mt-1 text-base sm:text-2xl font-light text-[#ADB5BD]"
                  >
                    A woman that doesn’t want to follow rules. She’s
                    self-reliant, an independent thinker, and confident. She
                    follows her own path and doesn’t do things just because it’s
                    the “norm”, she feels zero pressure to fit in, instead
                    choosing to dance to the beat of her own drum. That is
                    reflected in her style as well, she doesn’t follow trends,
                    but rather, she wears what makes her feel comfortable in her
                    own skin. She prefers to stand out for her own unique style
                    and doesn’t try to impress people with the latest designer
                    pieces. The Sigma woman prefers to invest in luxury items
                    that she truly loves and knows that she’ll enjoy for years
                    to come.
                  </p>
                </div>
              </div>

              <div className="sm:row-span-1 flex flex-col md:flex-row items-center align-center">
                <Image
                  src={Image_Url.about_banner_two}
                  alt="she is ..."
                  className="rounded-lg h-[534px]"
                  width={416}
                  height={534}
                />
                <div className="flex items-start justify-start flex-col mt-10 md:mt-0 sm:pl-5 lg:pl-11">
                  <p className="mt-1 text-3xl sm:text-6xl font-light text-[#FFF]">
                    Our Mission
                  </p>
                  <p
                    className="text-base sm:text-2xl font-light text-[#ADB5BD] mt-6"
                  >
                    SIGMA WORLD is driven to provide a one-of-a-kind shopping
                    experience giving the consumer the ability to add items from
                    a curated assortment of luxury fashion onto one wishlist
                    that is convenient to share and secure to purchase from.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-[#1E1E1E] rounded-lg py-10 px-5 sm:px-10 sm:py-20">
            <div className="flex items-center justify-between h-full flex-col">
              <p className="mt-1 text-3xl sm:text-6xl font-light text-[#FFF]">
                Our WORLD Vision
              </p>
              <p
                aria-hidden="true"
                className="mt-1 text-base sm:text-2xl font-light text-[#FFF] py-10 md:py-0"
              >
                Where luxury shopping and technology meet to provide an
                unrivaled customer experience, payment method, and security.
              </p>
              <div className="grid grid-cols-2 gap-x-16 md:gap-x-8 gap-y-16">
                <Image
                  src={Image_Url.about_logo_retro}
                  alt="she is ..."
                  className="rounded-lg"
                  width={96}
                  height={90}
                />
                <Image
                  src={Image_Url.about_logo_retro}
                  alt="she is ..."
                  className="rounded-lg"
                  width={96}
                  height={90}
                />
                <Image
                  src={Image_Url.about_logo_retro}
                  alt="she is ..."
                  className="rounded-lg"
                  width={96}
                  height={90}
                />
                <Image
                  src={Image_Url.about_logo_retro}
                  alt="she is ..."
                  className="rounded-lg"
                  width={96}
                  height={90}
                />
                <Image
                  src={Image_Url.about_logo_retro}
                  alt="she is ..."
                  className="rounded-lg"
                  width={96}
                  height={90}
                />
                <Image
                  src={Image_Url.about_logo_retro}
                  alt="she is ..."
                  className="rounded-lg"
                  width={96}
                  height={90}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
