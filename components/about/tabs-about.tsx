"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ILink {
  id: number;
  href: string;
  name: string;
  image?: string;
}
interface IProps {
  slug: string;
  data: ILink[];
  colorText?: string;
  url?: string;
  justifyCenter?: boolean;
}

export default function TabsAboutComponent({ slug, data, colorText, url, justifyCenter }: IProps) {
  const currentPath = usePathname();
  const slugPath = currentPath.split('/').slice(1)[1];

  return (
    <React.Fragment>
      <ul
        className={`${justifyCenter ? "justify-center" : "justify-between"} mb-5 list-none flex-row flex-wrap border-[#DDDDDD] pl-0 flex`}
        role="tablist"
        data-te-nav-ref
      >
        {data &&
          data.map((item) => {
            return (
              <li
                role="presentation"
                className={`${slugPath === item.href ? "border-b border-[#FF6F61]" : ""} text-center px-4 sm:px-8`}
                key={item.id}
              >
                <Link
                  href={`/${url}/${item.href}`}
                  className={`${colorText || "text-white "} hover:opacity-70 text-base font-semibold capitalize flex border-x-0 pr-0 pl-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-left leading-tight hover:isolate hover:border-transparentfocus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400`}
                >
                  {item.image ? (
                    <div className="relative w-4 h-4 mr-[14px]">
                      <Image
                        src={item.image}
                        width={16}
                        height={16}
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  ) : null}
                  {item.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </React.Fragment>
  );
}
