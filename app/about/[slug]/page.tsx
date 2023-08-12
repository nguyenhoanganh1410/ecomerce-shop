import FollowerComponent from "@/components/home/follower-component";
import React, { Suspense } from "react";
import Image from "next/image";
import TabsAboutComponent from "@/components/about/tabs-about";
import { aboutData, data_about_page_banner } from "@/utils/data";
import BannerImageComponent from "@/components/about/banner-image";
import GridContentComponent from "@/components/about/grid-content";
import { Image_Url } from "@/utils/imageUrl";
import TeamWorkComponent from "@/components/about/team-work";
import TheTeamComponent from "@/components/about/the-team";
import LogoListComponent from "@/components/about/logo-list";

export const metadata = {
  title: "About Page",
  description: "About Page",
};
export interface IPropsParams {
  params: { slug: string };
}

export default function AboutPage({ params }: IPropsParams) {
  return (
    <>
      <div className="bg-[#242424] pb-8 md:pb-16">
        <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[74px]">
          <div className="w-full flex justify-center items-center pt-20 pb-10">
            <div className="relative w-[463px] h-[80px] cursor-pointer hover:opacity-55">
              <Image
                src={Image_Url.about_banner_logo}
                width={463}
                height={80}
                alt=""
                className="h-full w-full object-contain md:object-cover"
              />
            </div>
          </div>
          <div className="h-[1px] w-full bg-slate-600"></div>
          <div className="mt-10 mb-10">
            <Suspense>
              <TabsAboutComponent
                data={aboutData}
                slug={params.slug}
                url="about"
                justifyCenter={true}
              />
            </Suspense>
          </div>
          <div className="mt-10">
            <Suspense>
              <BannerImageComponent
                image_url={Image_Url.about_banner_url}
                textBottomPosition={true}
              />
            </Suspense>
          </div>
          <Suspense>
            <GridContentComponent />
          </Suspense>
          <div className="mt-10">
            <Suspense>
              <BannerImageComponent
                hasBgOver
                content={data_about_page_banner}
                image_url={Image_Url.about_banner_two}
              />
            </Suspense>
          </div>

          <TeamWorkComponent />

          <TheTeamComponent />
          <LogoListComponent />
          <div className="flex flex-col items-center justify-center mt-16 mb-10 md:mt-60 md:mb-20 sm:mx-10">
            <h3 className="text-center text-[#FFF] text-3xl sm:text-[40px] font-light mb-6">
              Lorem ipsum dolor sit amet consectetur. Facilisi egestas dolor sit
              amet lorem ipsum.
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-[#FFF] text-base sm:text-[20px] font-normal mt-10 md:mr-6">
                One morning, when Gregor Samsa woke from troubled dreams, he
                found himself transformed in his bed into a horrible vermin. He
                lay on his armour-like back, and if he lifted his head a little
                he could see his brown belly, slightly domed and divided by
                arches into stiff sections
              </p>
              <p className="text-[#FFF] text-base sm:text-[20px] font-normal mt-10">
                One morning, when Gregor Samsa woke from troubled dreams, he
                found himself transformed in his bed into a horrible vermin. He
                lay on his armour-like back, and if he lifted his head a little
                he could see his brown belly, slightly domed and divided by
                arches into stiff sections
              </p>
            </div>
          </div>
        </main>
      </div>

      <FollowerComponent />
    </>
  );
}
