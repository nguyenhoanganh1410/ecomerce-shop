import Image from "next/image";
import "../../app/globals.css";
import React from "react";

interface IProps {
  content?: string;
  classString?: string;
  textBottomPosition?: boolean;
  image_url: string;
  hasBgOver?: boolean;
}
export default function BannerImageComponent({
  content,
  classString,
  textBottomPosition,
  image_url,
  hasBgOver
}: IProps) {
  return (
    <React.Fragment>
      <div className="relative group h-[200px] sm:h-[600px] overflow-hidden ">
        <Image
          src={image_url}
          fill
          className="object-contain sm:object-cover"
          alt="Categories Women"
        />
        {hasBgOver ? (
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50 rounded"
          />
        ) : null}
        {textBottomPosition ? (
          <div className="absolute right-5 md:right-10 bottom-6 md:bottom-10 md:max-w-md">
            <p className="libre-caslon-text w-min md:w-[350px] text-right text-[#242424] uppercase text-[20px] sm:text-6xl lg:text-[80px] leading-[24px] md:leading-[72px]">
              {content || "Made for the SIGMA woman."}
            </p>
          </div>
        ) : null}
        <div className="absolute top-0 left-0 w-full h-full p-6 md:p-10 flex flex-col items-center justify-end">
          <p className="text-white text-base md:text-2xl font-light max-w-[1062px]">
            {content}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
