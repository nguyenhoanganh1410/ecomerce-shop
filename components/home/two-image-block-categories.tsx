import { golobalUrl } from "@/utils/globalUrl";
import Image from "next/image";
import Link from "next/link";

export default function TwoImageBlockCategories() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 sm:pb-24 lg:px-20">
      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:gap-6">
        <div className="relative group aspect-h-4 aspect-w-3 overflow-hidden sm:aspect-[3/4]">
          <Image src="/categories-women.png" fill alt="Categories Women" />
          <div
            aria-hidden="true"
            className="bg-gradient-to-b from-transparent to-black opacity-50 rounded"
          />
          <div className="absolute flex w-full flex-col items-center justify-end p-8 sm:p-12 rounded">
            <span className="text-xs font-bold text-white text-opacity-75 text-center ">
              Label
            </span>
            <p className="font-medium text-white sm:text-[36px] lg:text-[80px] ">
              Women
            </p>
            <span className="lg:w-4/6 mb-6 text-sm font-medium text-opacity-75 text-white text-center ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet
              amet sed nibh pellentesque amet.
            </span>
            <Link
              href={golobalUrl.category_women}
              className="border lg:mt-6 flex flex-shrink-0 items-center justify-center rounded-md border-white bg-white bg-opacity-0 px-4 py-3 text-base font-medium text-white hover:bg-opacity-10 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-[134px] "
            >
              View more
            </Link>
          </div>
        </div>

        <div className="group aspect-h-4 aspect-w-3 overflow-hidden sm:aspect-[3/4]">
          <Image src="/categories-men.png" fill alt="Categories Men" />
          <div
            aria-hidden="true"
            className="bg-gradient-to-b from-transparent to-black opacity-50 rounded sm:absolute sm:inset-0"
          />
          <div className="absolute flex w-full flex-col items-center justify-end p-8 sm:p-12 rounded">
            <span className="text-xs font-medium text-opacity-75 text-white text-center ">
              Label
            </span>
            <p className="font-medium text-white sm:text-[36px] lg:text-[80px] ">
              Men
            </p>
            <span className="lg:w-4/6 mb-6 text-sm font-medium text-white text-opacity-75 text-center ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet
              amet sed nibh pellentesque amet.
            </span>
            <Link
              href={golobalUrl.category_men}
              className="border-[1px] lg:mt-6 flex flex-shrink-0 items-center justify-center rounded-md border-white bg-white bg-opacity-0 px-4 py-3 text-base font-medium text-white hover:bg-opacity-10 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-[134px] "
            >
              View more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
