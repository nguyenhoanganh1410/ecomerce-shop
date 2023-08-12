import { IPolicyContent } from "@/utils/type";
import Image from "next/image";
import React from "react";

interface IProps {
  block: IPolicyContent;
  hasLine?: boolean;
}
export default function BlockPolicyComponent({ block, hasLine }: IProps) {
  return (
    <>
      <h4 className="text-xl font-bold tracking-tight text-[#212529] sm:text-[30px] mb-4 md:mb-8 ">
        {block.title}
      </h4>
      {block.sub_title ? (
        <h4 className="text-[27px] font-bold tracking-tight text-[#212529] sm:text-[26px] mb-4 md:mb-8 ">
          {block.sub_title}
        </h4>
      ) : null}

      {block.text ? (
        <p className="text-base font-normal text-[#868E96] mb-4 md:mb-8">
          {block.text}
        </p>
      ) : null}
      {block.dataTextBlock &&
        block.dataTextBlock.map((item) => {
          return (
            <p
              className="text-base font-normal text-[#868E96] mb-4 md:mb-8"
              key={item.id}
            >
              {item.content}
            </p>
          );
        })}
      {block.data &&
        block.data.map((item) => {
          return (
            <div className="flex items-center" key={item.id}>
              <div className="relative w-[30px] h-[30px] cursor-pointer hover:opacity-55">
                <Image
                  src="/arrow-right-gold.png"
                  width={30}
                  height={30}
                  alt=""
                  className="object-cover"
                />
              </div>
              <p className="text-base font-normal text-[#868E96] w-fit">
                {item.title ? (
                  <a href="#" className="text-[#868E96] mr-1 font-bold">
                    Security Cookies.
                  </a>
                ) : null}
                {item.content}
              </p>
            </div>
          );
        })}
      {hasLine ? (
        <div className="h-[1px] w-full bg-[#212529] opacity-25 mb-4 md:mb-8  mt-4 md:mt-8"></div>
      ) : null}
    </>
  );
}
