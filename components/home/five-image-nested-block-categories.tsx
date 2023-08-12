import { golobalUrl } from "@/utils/globalUrl";
import Image from "next/image";
import Link from "next/link";

export default function FiveImageNestedBlockCategories() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-16 sm:px-6 sm:pt-24 lg:px-20">
      <div className="grid gird-cols-1 gap-y-6 sm:grid-cols-1 md:grid-cols-2 sm:gap-x-6 lg:gap-6">
        <div className="h-full">
          <div className="grid grid-rows sm:grid-rows-5 gap-6">
            <div className="row-span-3">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:gap-6 h-full">
                <Link href={golobalUrl.category_men} className="relative aspect-h-1 aspect-w-1">
                  <Image
                    src="/rect-1.png"
                    fill
                    alt=""
                    className="object-cover rounded"
                  />
                  <div className="flex items-end p-6">
                    <div>
                      <p
                        aria-hidden="true"
                        className="mt-1 text-white text-xs "
                      >
                        Fall 2022
                      </p>
                      <h3 className="font-normal text-white ">
                        <span className="sm:text-[22px] lg:text-[40px] ">
                          <span className="absolute inset-0 "></span>
                          Clothing
                        </span>
                      </h3>
                      <p
                        aria-hidden="true"
                        className="mt-1 text-[12px] lg:text-[14px] font-medium text-white "
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Imperdiet amet sed nibh pellentesque amet.
                      </p>
                    </div>
                  </div>
                </Link>
                <Link href={golobalUrl.category_women} className="relative aspect-h-1 aspect-w-1">
                  <Image
                    src="/rect-2.png"
                    className="object-cover rounded"
                    fill
                    alt=""
                  />
                  <div className="flex items-end p-6">
                    <div>
                      <p
                        aria-hidden="true"
                        className="mt-1 text-white text-xs "
                      >
                        Fall 2022
                      </p>
                      <h3 className="font-normal text-white">
                        <span className="sm:text-[22px] lg:text-[40px] ">
                          <span className="absolute inset-0 "></span>
                          Dresses
                        </span>
                      </h3>
                      <p
                        aria-hidden="true"
                        className="mt-1 text-[12px] lg:text-[14px] font-medium text-white "
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Imperdiet amet sed nibh pellentesque amet.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <Link href={golobalUrl.category_accessories} className="row-span-2">
              <div className="group aspect-w-2 aspect-h-1 overflow-hidden sm:aspect-[2/1] h-[300px]  md:h-full ">
                <Image
                  className="object-cover rounded"
                  src="/rect-3.png"
                  fill
                  alt=""
                />
                <div className="flex items-end p-6 w-4/6">
                  <div>
                    <p aria-hidden="true" className="mt-1 text-white text-xs ">
                      Fall 2022
                    </p>
                    <h3 className="font-normal text-white">
                      <span className="sm:text-[22px] lg:text-[40px] ">
                        <span className="absolute inset-0 "></span>
                        Accessories
                      </span>
                    </h3>
                    <p
                      aria-hidden="true"
                      className="mt-1 text-[12px] lg:text-[14px] font-medium text-white "
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Imperdiet amet sed nibh pellentesque amet.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <div className="grid sm:grid-rows-5 gap-6 sm:h-full">
            <Link href={golobalUrl.category_bags} className="group h-[300px] md:h-full sm:relative aspect-w-1 aspect-h-1 sm:p-0 overflow-hidden row-span-2">
              <Image
                className="object-cover rounded"
                src="/rect-4.png"
                fill
                alt=""
              />
              <div className="flex items-end p-6 w-4/6">
                <div>
                  <p aria-hidden="true" className="mt-1 text-white text-xs ">
                    Fall 2022
                  </p>
                  <h3 className="font-normal text-white">
                    <span className="sm:text-[22px] lg:text-[40px] ">
                      <span className="absolute inset-0 "></span>
                      Bags
                    </span>
                  </h3>
                  <p
                    aria-hidden="true"
                    className="mt-1 text-[12px] lg:text-[14px] font-medium text-white "
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Imperdiet amet sed nibh pellentesque amet.
                  </p>
                </div>
              </div>
            </Link>

            <Link href={golobalUrl.category_shoes} className="aspect-w-1 md:h-full aspect-h-1 group sm:relative sm:p-0  relative overflow-hidden row-span-3 ">
              <Image
                className="object-cover rounded"
                src="/rect-5.png"
                fill
                alt=""
              />
              <div className="flex items-end p-6">
                <div>
                  <p aria-hidden="true" className="mt-1 text-white text-xs ">
                    Fall 2022
                  </p>
                  <h3 className="font-normal text-white">
                    <span className="sm:text-[22px] lg:text-[40px] ">
                      <span className="absolute inset-0 "></span>
                      Shoes
                    </span>
                  </h3>
                  <p
                    aria-hidden="true"
                    className="mt-1 text-[12px] lg:text-[14px] font-medium text-white sm:p-0 md:w-2/5 "
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Imperdiet amet sed nibh pellentesque amet.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
