import { data, dataFooter } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer
      className="bg-white dark:bg-gray-900"
      style={{ backgroundColor: "#242424" }}
    >
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-5">
          <div className="col-span-2 lg:mr-24">
            <h2 className="mb-6 text-white font-bold text-[15px]">
              Be in touch
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a
                  href="#"
                  className=" hover:underline text-white font-normal text-[14px]"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                  itaque temporibus.
                </a>
              </li>
            </ul>
            <div className="relative flex w-full flex-wrap items-stretch mb-3 border-b-1 border-indigo-500">
              <input
                type="search"
                //id="email-search"
                //placeholder="Your Email Address"
                className="text-[15px] pl-0 py-3 bg-transparent focus:ring-0 border-[#FFFFFF] border-l-0 border-t-0 border-r-0 text-white font-normal w-full"
              />
              <div className="absolute bottom-1 right-1 cursor-pointer">
                <Image src="/send-icon.png" width={24} height={24} alt="" />
              </div>
            </div>
          </div>
          {dataFooter.map((item, index1) => {
            return (
              <div key={index1}>
                <h2 className="font-bold mb-6 text-white text-[15px]">
                  {item.title}
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  {item.list.map((data, index2) => {
                    return (
                      <li className="mb-[7.4px]" key={index2}>
                        <Link
                          href={data.url}
                          className="hover:underline text-white font-normal text-[13px]"
                        >
                          {data.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="px-4 py-6 md:flex md:items-center md:justify-between">
          <span className="text-white font-light text-[13px]">
            © 2023 <a href="#">Your company</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
            {data.map((item, index) => {
              return (
                <a
                  href="#"
                  className="text-white font-light text-[13px]"
                  key={index}
                >
                  <span className="text-white font-light text-[13px]">
                    {item.text}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
