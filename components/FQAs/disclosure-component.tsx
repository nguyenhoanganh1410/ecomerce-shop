"use client";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

interface IContent {
  id: string;
  title: string;
  content: string;
}
interface Iprops {
  data: IContent;
  hasLine?: boolean;
}
export default function DisclosureComponent({ data, hasLine }: Iprops) {
  return (
    <div className="w-full">
      <div className="mx-auto w-full rounded-2xl ">
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-[#F8F8F8] py-2 text-left text-[20px] font-semibold text-[#000 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                <span>{data.title}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-10 w-10 md:h-5 md:w-5 text-black`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2 text-base text-[#4A4A4A] font-normal">
                {data.content}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        {hasLine ? (
          <div className="h-[1px] w-full bg-[#212529] opacity-25 mb-4 mt-6 md:mb-6 md:mt-6"></div>
        ) : null}
      </div>
    </div>
  );
}
