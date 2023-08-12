import Image from "next/image";
import IncentivesComponent from "@/components/home/incentives";
import TwoImageBlockCategories from "@/components/home/two-image-block-categories";
import FiveImageNestedBlockCategories from "@/components/home/five-image-nested-block-categories";
import ProductListComponent from "@/components/home/product-list";
import FollowerComponent from "@/components/home/follower-component";
import LogoComponent from "@/components/home/logo-component";
import ArrivalsProductsComponent from "@/components/home/arrivals-products";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <IncentivesComponent />

      <TwoImageBlockCategories />

      <Suspense>
        {/* @ts-expect-error Server Component */}
        <ArrivalsProductsComponent />
      </Suspense>
      <FiveImageNestedBlockCategories />
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <ProductListComponent />
      </Suspense>

      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-24 lg:px-20">
        <div className="sm:flex sm:items-baseline sm:justify-center">
          <h2 className="text-center text-[26px] font-bold tracking-tight text-[#202223] font-[Helvetica-Neue]">
            Curated Shops
          </h2>
        </div>
        <div className="md:max-h-[480px] mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-6">
          <div className="group aspect-h-1 aspect-w-1 md:max-h-[480px] overflow-hidden sm:relative sm:row-span-2">
            <Image
              src="https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg"
              alt=""
              fill
              className="md:max-h-[480px] rounded"
            />
            <div className="md:max-h-[480px] flex items-center align-center p-6 sm:absolute sm:inset-0">
              <div className="flex items-center justify-center flex-col">
                <p
                  aria-hidden="true"
                  className="mt-1 text-xs font-[Helvetica-Neue] font-bold text-center text-[#242424]"
                >
                  Fall 2022
                </p>
                <h3 className="font-normal">
                  <a
                    href="#"
                    className="sm:text-[22px] text-[#242424] lg:text-[40px] font-[Helvetica-Neue] text-center"
                  >
                    <span className="absolute inset-0 font-[Helvetica-Neue]"></span>
                    Perfumes
                  </a>
                </h3>
                <p
                  aria-hidden="true"
                  className="mt-1 text-[12px] lg:text-[14px] font-medium sm:p-0 md:w-3/5  text-center text-[#242424] font-[Helvetica-Neue]"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Imperdiet amet sed nibh pellentesque amet.
                </p>
              </div>
            </div>
          </div>
          <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
            <Image src="/rect-3.png" alt="" fill />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <p
                  aria-hidden="true"
                  className="mt-1 text-xs text-[#242424] font-bold font-[Helvetica-Neue]"
                >
                  Fall 2022
                </p>
                <h3 className="font-normal">
                  <a
                    href="#"
                    className="sm:text-[22px] lg:text-[40px] text-[#242424] font-[Helvetica-Neue]"
                  >
                    <span className="absolute inset-0 font-[Helvetica-Neue]"></span>
                    Perfumes
                  </a>
                </h3>
                <p
                  aria-hidden="true"
                  className="mt-1 text-[12px] lg:text-[14px] font-medium sm:p-0 md:w-3/5 text-[#242424] font-[Helvetica-Neue]"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Imperdiet amet sed nibh pellentesque amet.
                </p>
              </div>
            </div>
          </div>
          <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
            <Image src="/rect-4.png" alt="" fill />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <p
                  aria-hidden="true"
                  className="mt-1 text-xs text-[#242424] font-bold  font-[Helvetica-Neue]"
                >
                  Fall 2022
                </p>
                <h3 className="font-normal text-white">
                  <a
                    href="#"
                    className="sm:text-[22px] lg:text-[40px] text-[#242424] font-[Helvetica-Neue]"
                  >
                    <span className="absolute inset-0 font-[Helvetica-Neue]"></span>
                    Perfumes
                  </a>
                </h3>
                <p
                  aria-hidden="true"
                  className="mt-1 text-[12px] lg:text-[14px] text-[#242424] font-medium  md:w-3/5 font-[Helvetica-Neue]"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Imperdiet amet sed nibh pellentesque amet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LogoComponent />

      <FollowerComponent />
    </>
  );
}
