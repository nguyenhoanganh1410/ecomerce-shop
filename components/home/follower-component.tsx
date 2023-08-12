'use client'
import { dataHightLight, followers } from "@/utils/data";
import Image from "next/image";
import useNavbarHook from "../../hooks/useNavbarHook";

export default function FollowerComponent() {
  const {
    pathname
  } = useNavbarHook()
  return (
    <div className="overflow-hidden">
      {
        pathname ?
        <>
          <div className="mb-4 full-width">
            <h2 className="text-[26px] font-bold text-center ">
              Follow Us On Instagram
            </h2>
            <div className="text-[16px] font-medium text-[#9F7D83] flex justify-center items-center cursor-pointer hover:opacity-60 ">
              @sigmaworld.shop{" "}
              <div className="relative w-4 h-4 ml-2">
                <Image
                  src="/Vector.png"
                  fill
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-5">
            {followers.map((product, index) => (
              <div className="overflow-hidden relative aspect-h-1 aspect-w-1" key={index}>
                <Image
                  src={product.imageSrc}
                  fill
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </> : null
      }

      <div className="-mx-px px-4 border-l bg-[#9F7D83] h-[173px] border-gray-200 ">
        <div className="mx-auto  h-[173px] max-w-[1440px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {
            dataHightLight.map(item => {
              return (
                <div className="w-full flex justify-center items-center" key={item.id}>
                  <div className="relative w-[32px] h-[32px] mr-4">
                    <Image
                      src={item.imageSrc}
                      width={32}
                      height={32}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-[13px] font-bold text-white mb-1">
                      {item.title}
                    </p>
                    <p className="text-[10px] md:text-[13px] font-light text-white">
                      {item.name}
                    </p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
