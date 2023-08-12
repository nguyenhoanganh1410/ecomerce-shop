import { accountSetting, data_about_the_team } from "@/utils/data";
import { Image_Url } from "@/utils/imageUrl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TheTeamComponent() {
  return (
    <div className="mt-10 sm:mt-[165px] mb-10 sm:mb-48">
      <p className="mt-1 pb-5 sm:pb-10 text-3xl sm:text-6xl font-light text-[#FFF] text-center">
        The Team
      </p>
      <div className="mt-6 grid grid-cols-2 gap-y-6 md:grid-cols-3 xl:grid-cols-6 lg:grid-rows-1 lg:gap-20">
        {data_about_the_team.map((item) => {
          return (
            <div
              className="rounded-lg flex flex-col justify-between items-center"
              key={item.id}
            >
              <div className="relative w-40 h-40 mr-1">
                <Image
                  className="h-full w-full object-cover object-center rounded-full"
                  src={item.image}
                  alt=""
                  width={160}
                  height={160}
                />
              </div>

              <p className="text-[20px] font-semibold text-[#FFF] my-4">
                {item.name}
              </p>
              <p className="text-[14px] font-normal text-[#FFF]">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
