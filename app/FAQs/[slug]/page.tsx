import React, { Suspense } from "react";
import TabsAboutComponent from "@/components/about/tabs-about";
import { aboutData, FAQs_data } from "@/utils/data";
import DisclosureComponent from "@/components/FQAs/disclosure-component";
import TabsMobile from "@/components/account/tabs-mobile";

export interface IPropsParams {
  params: { slug: string };
}

export default function FAQs({ params }: IPropsParams) {
  return (
    <React.Fragment>
      <div className="lg:hidden flex mt-7 mb-7 lg:mb-0 w-full sm:w-fit lg:mt-0">
        <Suspense>
          <TabsMobile slug={params.slug} url="FAQs" data={aboutData}/>
        </Suspense>
      </div>
      <div>
        {FAQs_data.data.map((data, idx) => {
          return (
            <DisclosureComponent
              key={Math.random()}
              data={data}
              hasLine={FAQs_data.data.length - 1 === idx ? false : true}
            />
          );
        })}
      </div>
      <div className="flex flex-col items-center justify-center mt-16 mb-10 md:mt-60 md:mb-20">
        <h3 className="text-center color-[#000] text-3xl sm:text-[40px] font-light mb-6">
          Lorem ipsum dolor sit amet consectetur. Facilisi egestas dolor sit
          amet lorem ipsum.
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-[#000] text-base sm:text-[20px] font-normal mt-10 md:mr-6">
            One morning, when Gregor Samsa woke from troubled dreams, he found
            himself transformed in his bed into a horrible vermin. He lay on his
            armour-like back, and if he lifted his head a little he could see
            his brown belly, slightly domed and divided by arches into stiff
            sections
          </p>
          <p className="text-[#000] text-base sm:text-[20px] font-normal mt-10">
            One morning, when Gregor Samsa woke from troubled dreams, he found
            himself transformed in his bed into a horrible vermin. He lay on his
            armour-like back, and if he lifted his head a little he could see
            his brown belly, slightly domed and divided by arches into stiff
            sections
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
