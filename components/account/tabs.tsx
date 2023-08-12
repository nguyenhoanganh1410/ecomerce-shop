import { accountSetting } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface IProps {
  slug: string;
}

export default function TabsComponent({ slug }: IProps) {
  return (
    <React.Fragment>
      <ul
        className="mb-5 list-none flex-row flex-wrap border-b-2 border-[#DDDDDD] pl-0 hidden md:flex"
        role="tablist"
        data-te-nav-ref
      >
        {accountSetting.map((item) => {
          return (
            <li
              role="presentation"
              className="text-center mr-12"
              key={item.id}
            >
              <Link
                href={`account/${item.href}`}
                className={`${slug === item.href ? 'text-[#242424]' : 'text-[#767676]'} my-2 flex border-x-0 pr-0 pl-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-left text-sm font-bold uppercase leading-tight hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400`}
              >
                <div className="relative w-4 h-4 mr-[14px]">
                  <Image
                    src={item.image}
                    width={16}
                    height={16}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
}