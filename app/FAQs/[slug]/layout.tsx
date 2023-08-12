import FollowerComponent from "@/components/home/follower-component";
import React, { Suspense } from "react";
import Image from "next/image";
import { Image_Url } from "@/utils/imageUrl";
import TabsAboutComponent from "@/components/about/tabs-about";
import { aboutData } from "@/utils/data";

export const metadata = {
  title: "FAQs Page",
  description: "FAQs Page",
};

export default function Faqslayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-[#F8F8F8] pb-8 md:pb-16 pt:8 md:pt-20">
        <main className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-6 lg:px-[74px]">
          <div className="w-full lg:mb-20 flex-col lg:flex-row flex justify-between items-center">
            <div className="relative w-[191px] h-[80px] cursor-pointer hover:opacity-55">
              <Image
                src={Image_Url.FAQs_logo}
                width={191}
                height={80}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <p className="text-[#000] font-normal text-base max-w-[580px] mt-4 lg:mt-0">
              Everything you need to know about charities and methodology. Cant
              find the answer you are looking for? Please{" "}
              <a href="#">contact us </a> and we chat with you.
            </p>
          </div>
          <div className="mt-10 mb-10 hidden lg:flex">
            <Suspense>
              <TabsAboutComponent
                data={aboutData}
                slug=""
                colorText="text-[#000]"
                url="FAQs"
              />
            </Suspense>
          </div>
          {children}
        </main>
      </div>

      <FollowerComponent />
    </>
  );
}
