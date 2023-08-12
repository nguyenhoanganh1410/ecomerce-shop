"use client";
import Image from "next/image";
import ModelAvatar from "./model-avatar";
import { Suspense, useState } from "react";
import { Iuser } from "@/utils/type";

interface IProps {
  data: Iuser;
}
export default function AvatarGroup({ data }: IProps) {
  const [showModelAvatar, setShowModelAvatar] = useState<boolean>(false);
  const [showModelBg, setShowModelBg] = useState<boolean>(false);
  const [stateDeleteBg, setStateDeleteBg] = useState<boolean>(false);
  const [stateDeleteAvatar, setStateDeleteAvatar] = useState<boolean>(false);
  const [dataState, setDataState] = useState<Iuser>(data);

  return (
    <div className="mx-auto border-b-2 border-[#DDDDDD] mt-10 md:mt-20">
      <div className="mt-6 mb-10 flex justify-between items-start flex-wrap">
        <div className="group lg:col-span-1 relative">
          <h2 className="text-2xl font-medium tracking-tight text-[#242424] mb-10">
            Profile Photo
          </h2>
          <div
            className="group relative"
            onClick={() => setShowModelAvatar(true)}
          >
            {dataState?.avatarUrl && !stateDeleteAvatar ? (
              <>
                <div className="w-[40px] h-[40px] absolute right-4 top-0 overflow-hidden rounded-full group-hover:opacity-75 cursor-pointer">
                  <Image
                    width={40}
                    height={40}
                    alt=""
                    src="/upload.png"
                    className="w-[40px] h-[40px] object-cover"
                  />
                </div>
                <div className="w-[180px] h-[180px] overflow-hidden rounded-full group-hover:opacity-75 cursor-pointer">
                  <Image
                    alt=""
                    src={dataState.avatarUrl}
                    className="w-[180px] h-[180px] object-cover"
                    width={180}
                    height={180}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="w-[180px] h-[180px] overflow-hidden rounded-full group-hover:opacity-75 cursor-pointer">
                  <Image
                    alt=""
                    width={180}
                    height={180}
                    src="/avatar-pick-removebg-preview.png"
                    className="w-[180px] h-[180px] object-cover"
                  />
                </div>
                <div className="w-[40px] h-[40px] absolute right-4 top-0 overflow-hidden rounded-full group-hover:opacity-75 cursor-pointer">
                  <Image
                    alt=""
                    width={40}
                    height={40}
                    src="/upload.png"
                    className="w-[40px] h-[40px] object-cover"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="group pt-14 sm:pt-0 lg:col-span-2 relative">
          <h2 className="text-2xl font-medium tracking-tight text-[#242424] mb-10">
            Background Photo
          </h2>
          <div className="group relative" onClick={() => setShowModelBg(true)}>
            <div className="w-[335px] sm:w-[380px] flex justify-center items-center bg-[#EDEDED] relative rounded-lg h-[180px] overflow-hidden group-hover:opacity-75 cursor-pointer">
              {dataState?.backgroundImageUrl && !stateDeleteBg ? (
                <>
                  <Image
                    fill
                    alt=""
                    src={dataState.backgroundImageUrl}
                    className="w-full h-full object-cover"
                  />
                  <div className="w-[40px] h-[40px] absolute right-2 top-2 overflow-hidden rounded-full group-hover:opacity-75 cursor-pointer">
                    <Image
                      width={40}
                      height={40}
                      alt=""
                      src="/upload.png"
                      className="w-[40px] h-[40px] object-cover"
                    />
                  </div>
                </>
              ) : (
                <>
                  <img
                    src="/mountant.png"
                    className="w-[123px] h-[52px] object-cover"
                  />
                  <div className="w-[40px] h-[40px] absolute right-2 top-2 overflow-hidden rounded-full group-hover:opacity-75 cursor-pointer">
                    <Image
                      width={40}
                      height={40}
                      alt=""
                      src="/upload.png"
                      className="w-[40px] h-[40px] object-cover"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="group lg:col-span-2 relative">
          <h2 className="text-2xl font-medium tracking-tight text-[#242424] mb-16"></h2>
          <p className="pl-4 mt-14 font-normal text-[16px] text-[#242424] border-l-2 border-[#DDDDDD]">
            Lorem Ipsum Lorem image JPG or <br /> PNG. 1MB Max size
          </p>
        </div>
      </div>
      {showModelAvatar ? (
        <Suspense>
          <ModelAvatar
            handleChange={setShowModelAvatar}
            dataProps={dataState}
            setData={setDataState}
            handleChangeState={setStateDeleteAvatar}
          />
        </Suspense>
      ) : null}
      {showModelBg ? (
        <Suspense>
          <ModelAvatar
            handleChange={setShowModelBg}
            isBgModel
            dataProps={dataState}
            setData={setDataState}
            handleChangeState={setStateDeleteBg}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
