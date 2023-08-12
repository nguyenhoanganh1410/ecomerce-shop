import Breadcrumbs from "@/components/breadcrumbs";
import FollowerComponent from "@/components/home/follower-component";
import Link from "next/link";
import React from "react";
import Image from "next/image";
export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-[#F8F8F8] pb-8 md:pb-16">
        <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[74px]">
          <Breadcrumbs data={["bag"]} subLink={["shop"]} />
          <h1 className="text-3xl font-semibold tracking-tight text-[#212529] sm:text-[40px] mb-3 md:mb-11">
            Shopping Bag
          </h1>
          <Link
            href="category/shop?type=shop&limit=12&page=1"
            className="text-xs font-semibold tracking-tight text-[#00A3FF] flex"
          >
            <div className="relative w-4 h-4 mr-[6px]">
              <Image
                src="/Vector-1.png"
                fill
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            Continue Shopping
          </Link>
          {children}
        </main>
      </div>

      <FollowerComponent />
    </>
  );
}
